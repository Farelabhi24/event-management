<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

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
        $registration = Registration::with('event', 'participant')->find($id);
        if (!$registration) return response()->json(['message' => 'Not found'], 404);
        return response()->json($registration);
    }

    public function update(Request $request, $id)
    {
        $registration = Registration::find($id);
        if (!$registration) return response()->json(['message' => 'Not found'], 404);
        $registration->update($request->all());
        return response()->json($registration);
    }

    public function destroy($id)
    {
        $registration = Registration::find($id);
        if (!$registration) return response()->json(['message' => 'Not found'], 404);
        $registration->delete();
        return response()->json(['message' => 'Registration berhasil dihapus']);
    }
}