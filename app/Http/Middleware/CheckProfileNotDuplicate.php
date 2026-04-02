<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\OrganizerProfile;

class CheckProfileNotDuplicate
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $organizerId = $request->input('organizer_id');
        if (OrganizerProfile::where('organizer_id', $organizerId)->exists()) {
            return response()->json(['message' => 'Organizer ini sudah memiliki profil'], 409);
        }
        return $next($request);
    }
}
