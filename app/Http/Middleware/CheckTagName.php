<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTagName
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    // app/Http/Middleware/CheckTagName.php
    public function handle(Request $request, Closure $next): Response
    {
        $name = $request->input('name');
        if (empty($name)) {
            return response()->json(['message' => 'Nama tag tidak boleh kosong'], 422);
        }
        if (is_numeric($name)) {
            return response()->json(['message' => 'Nama tag tidak boleh berupa angka saja'], 422);
        }
        return $next($request);
    }
}
