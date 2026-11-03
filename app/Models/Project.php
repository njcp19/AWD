<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    // Single source of truth for the category list (used by validation AND sent to the React form).
    public const CATEGORIES = ['UI Design', '3D Design', 'Illustration', 'Web Development', 'Branding', 'Other'];
    public const GRADIENTS = ['green', 'purple', 'amber', 'blue', 'rose'];

    // Only these columns can be mass-assigned via Project::create() / ->update().
    protected $fillable = [
        'title',
        'category',
        'gradient',
        'description',
        'tech_stack',
        'project_url',
        'repository_url',
        'image',
        'date_completed',
        'display_order',
    ];

    // Extra computed values that are sent to React with every record.
    protected $appends = ['image_url', 'tech_list'];

    protected function casts(): array
    {
        return [
            'date_completed' => 'date:Y-m-d',
            'display_order' => 'integer',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? Storage::disk('public')->url($this->image) : null;
    }

    public function getTechListAttribute(): array
    {
        return array_values(array_filter(array_map('trim', explode(',', (string) $this->tech_stack))));
    }
}
