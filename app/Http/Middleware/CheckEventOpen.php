<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Event;

class CheckEventOpen
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    // app/Http/Middleware/CheckEventOpen.php
    public function handle(Request $request, Closure $next): Response
    {
        $eventId = $request->input('event_id');
        $event = \App\Models\Event::find($eventId);
        if (!$event || $event->status !== 'open') {
            return response()->json(['message' => 'Registrasi hanya bisa dilakukan untuk event dengan status open'], 403);
        }
        return $next($request);
    }
}
