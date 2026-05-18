<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;

class OrganizerController extends Controller
{
    public function index()
    {
        return response()->json(Organizer::with('user', 'profile')->get());
    }

    public function store(Request $request)
    {
        $organizer = Organizer::create($request->all());
        return response()->json($organizer, 201);
    }

    public function show($id)
    {
        $organizer = Organizer::with('user', 'profile')->find($id);
        if (!$organizer) return response()->json(['message' => 'Not found'], 404);
        return response()->json($organizer);
    }

    public function update(Request $request, $id)
    {
        $organizer = Organizer::find($id);
        if (!$organizer) return response()->json(['message' => 'Not found'], 404);
        $organizer->update($request->all());
        return response()->json($organizer);
    }

    public function destroy($id)
    {
        $organizer = Organizer::find($id);
        if (!$organizer) return response()->json(['message' => 'Not found'], 404);
        $organizer->delete();
        return response()->json(['message' => 'Organizer berhasil dihapus']);
    }
}