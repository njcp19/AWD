<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /** List all project records. */
    public function index(): Response
    {
        $projects = Project::orderBy('display_order')
            ->orderByDesc('date_completed')
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create', [
            'categories' => Project::CATEGORIES,
            'gradients' => Project::GRADIENTS,
            // pre-fill display order with the next free number
            'nextOrder' => ((int) Project::max('display_order')) + 1,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules(), $this->messages());

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'categories' => Project::CATEGORIES,
            'gradients' => Project::GRADIENTS,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate($this->rules($project), $this->messages());

        if ($request->hasFile('image')) {
            // replace the old file so the disk does not fill up with orphans
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            // no new upload -> keep the existing image path untouched
            unset($validated['image']);
        }

        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }

    /**
     * Validation rules shared by store() and update().
     * On update, unique() ignores the record being edited so saving
     * without changing the title does not fail.
     */
    private function rules(?Project $project = null): array
    {
        return [
            'title' => [
                'required', 'string', 'min:3', 'max:100',
                Rule::unique('projects', 'title')->ignore($project?->id),
            ],
            'category' => ['required', Rule::in(Project::CATEGORIES)],
            'gradient' => ['required', Rule::in(Project::GRADIENTS)],
            'description' => ['required', 'string', 'min:20', 'max:1000'],
            'tech_stack' => ['required', 'string', 'max:150'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
            'display_order' => ['required', 'integer', 'between:1,999'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Every project needs a title.',
            'title.unique' => 'A project with this title already exists. Please choose a different title.',
            'category.required' => 'Please choose a category.',
            'category.in' => 'Please pick one of the categories from the list.',
            'description.min' => 'Describe the project in at least 20 characters.',
            'tech_stack.required' => 'List at least one technology (comma-separated).',
            'project_url.url' => 'The project URL must be a valid link, e.g. https://example.com.',
            'repository_url.url' => 'The repository URL must be a valid link, e.g. https://github.com/you/repo.',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'Only JPG, PNG or WEBP images are allowed.',
            'image.max' => 'The image is too large. Maximum size is 2 MB.',
            'date_completed.before_or_equal' => 'The completion date cannot be in the future.',
            'display_order.between' => 'Display order must be a number from 1 to 999.',
        ];
    }
}
