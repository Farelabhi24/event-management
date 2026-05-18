<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function index()
    {
        return response()->json(Participant::all());
    }

    public function store(Request $request)
    {
        $participant = Participant::create($request->all());
        return response()->json($participant, 201);
    }

    public function show($id)
    {
        $participant = Participant::find($id);
        if (!$participant) return response()->json(['message' => 'Not found'], 404);
        return response()->json($participant);
    }

    public function update(Request $request, $id)
    {
        $participant = Participant::find($id);
        if (!$participant) return response()->json(['message' => 'Not found'], 404);
        $participant->update($request->all());
        return response()->json($participant);
    }

    public function destroy($id)
    {
        $participant = Participant::find($id);
        if (!$participant) return response()->json(['message' => 'Not found'], 404);
        $participant->delete();
        return response()->json(['message' => 'Participant berhasil dihapus']);
    }
}