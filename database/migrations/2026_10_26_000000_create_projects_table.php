<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();         // project name; unique so two cards never share a title
            $table->string('category', 50);                  // badge on the card, e.g. "UI Design"
            $table->string('gradient', 20)->default('green'); // card colour used when there is no image
            $table->text('description');                     // what the project is about
            $table->string('tech_stack');                    // comma-separated tags, e.g. "UI Design, Figma, Web"
            $table->string('project_url')->nullable();       // live link
            $table->string('repository_url')->nullable();    // GitHub link
            $table->string('image')->nullable();             // path on the public disk
            $table->date('date_completed');                  // when it was finished
            $table->unsignedSmallInteger('display_order')->default(1); // order on the public page
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
