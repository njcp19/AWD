<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /** Public portfolio page. The Projects section is read from the database. */
    public function __invoke(): Response
    {
        return Inertia::render('Portfolio', [
            'projects' => Project::orderBy('display_order')
                ->orderByDesc('date_completed')
                ->get(),
        ]);
    }

    public function show(Project $project): Response
    {
        return Inertia::render('ProjectDetail', [
            'project' => $project,
            'related' => Project::where('id', '!=', $project->id)
                ->orderBy('display_order')
                ->take(3)
                ->get(),
        ]);
    }
}
