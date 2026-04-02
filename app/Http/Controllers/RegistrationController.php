<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

// app/Http/Controllers/RegistrationController.php
class RegistrationController extends Controller
{
    public function index()
    {
        return response()->json(Registration::with('event', 'participant')->get());
    }

    public function store(Request $request)
    {
        $registration = Registration::create($request->all());
        return response()->json($registration, 201);
    }

    public function show($id)
    {
        $reg = Registration::with('event', 'participant')->find($id);
        if (!$reg) return response()->json(['message' => 'Not found'], 404);
        return response()->json($reg);
    }
}
