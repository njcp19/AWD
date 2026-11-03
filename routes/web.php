<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public portfolio
Route::get('/', PortfolioController::class)->name('portfolio');
Route::get('/work/{project}', [PortfolioController::class, 'show'])->name('work.show');

// Public contact form (max 5 messages per minute per visitor)
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');

// Management pages (login required). Route::resource creates 7 routes;
// show is excluded because the public page already displays the records.
Route::middleware('auth')->group(function () {
    Route::resource('projects', ProjectController::class)->except(['show']);
});

// Breeze defaults
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
