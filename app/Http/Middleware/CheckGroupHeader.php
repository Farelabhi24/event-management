<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckGroupHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->hasHeader('X-Kelompok')) {
            return response()->json(['message' => 'Header X-Kelompok wajib disertakan'], 403);
        }
        return $next($request);
    }
}
