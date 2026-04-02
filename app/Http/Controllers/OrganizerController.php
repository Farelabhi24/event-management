<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;

class OrganizerController extends Controller
{
    public function index()
    {
        return response()->json(Organizer::all());
    }

    public function store(Request $request)
    {
        $organizer = Organizer::create($request->all());
        return response()->json($organizer, 201);
    }

    public function show($id)
    {
        $organizer = Organizer::with('profile', 'events')->find($id);
        if (!$organizer) return response()->json(['message' => 'Not found'], 404);
        return response()->json($organizer);
    }
}
