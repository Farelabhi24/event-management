<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckEventQuota
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $quota = $request->input('quota');
        if (!is_numeric($quota) || $quota <= 0) {
            return response()->json(['message' => 'Quota event harus berupa angka dan lebih dari 0'], 422);
        }
        return $next($request);
    }
}
