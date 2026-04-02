<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckVenueCapacity
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $capacity = $request->input('capacity');
        if (!is_numeric($capacity) || $capacity <= 0) {
            return response()->json(['message' => 'Kapasitas harus berupa angka dan lebih dari 0'], 422);
        }
        return $next($request);
    }
}
