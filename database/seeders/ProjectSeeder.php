<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /** Sample records (the three cards from the original portfolio). Edit or delete them in /projects. */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'School Student Portal',
                'category' => 'UI Design',
                'gradient' => 'green',
                'description' => 'A comprehensive student portal interface designed to streamline academic management and communication between students, instructors, and administrators.',
                'tech_stack' => 'UI Design, Figma, Web',
                'date_completed' => '2026-03-10',
                'display_order' => 1,
            ],
            [
                'title' => 'Modern House Design',
                'category' => '3D Design',
                'gradient' => 'purple',
                'description' => 'A detailed 3D architectural visualization of a contemporary house featuring modern aesthetics, functional layout planning, and realistic material rendering.',
                'tech_stack' => '3D Design, SketchUp, Architecture',
                'date_completed' => '2026-05-22',
                'display_order' => 2,
            ],
            [
                'title' => 'Vector Animal Tracing',
                'category' => 'Illustration',
                'gradient' => 'amber',
                'description' => 'Hand-traced vector illustrations of various animals showcasing detailed line work, vibrant colors, and artistic interpretation using professional illustration techniques.',
                'tech_stack' => 'Illustration, Photoshop, Vector Art',
                'date_completed' => '2026-08-15',
                'display_order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title' => $project['title']], $project);
        }
    }
}
