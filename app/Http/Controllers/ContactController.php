<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /** Saves a message from the public contact form. */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:80'],
            'email' => ['required', 'email', 'max:120'],
            'subject' => ['required', 'string', 'max:120'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ], [
            'name.required' => 'Please tell me your name.',
            'email.email' => 'That does not look like a valid email address.',
            'message.min' => 'Your message is a bit short - please write at least 10 characters.',
        ]);

        Message::create($validated);

        return back()->with('success', 'Thank you! Your message was sent.');
    }
}
