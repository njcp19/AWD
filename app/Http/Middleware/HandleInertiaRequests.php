<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /** The root template that is loaded on the first page visit. */
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /** Props available on every page via usePage().props */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // one-time success message set with ->with('success', '...')
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ];
    }
}
