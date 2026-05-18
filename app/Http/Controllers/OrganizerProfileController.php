<?php

namespace App\Http\Controllers;

use App\Models\OrganizerProfile;
use Illuminate\Http\Request;

class OrganizerProfileController extends Controller
{
    public function index()
    {
        return response()->json(OrganizerProfile::with('organizer')->get());
    }

    public function store(Request $request)
    {
        $profile = OrganizerProfile::create($request->all());
        return response()->json($profile, 201);
    }

    public function show($id)
    {
        $profile = OrganizerProfile::with('organizer')->find($id);
        if (!$profile) return response()->json(['message' => 'Not found'], 404);
        return response()->json($profile);
    }

    public function update(Request $request, $id)
    {
        $profile = OrganizerProfile::find($id);
        if (!$profile) return response()->json(['message' => 'Not found'], 404);
        $profile->update($request->all());
        return response()->json($profile);
    }

    public function destroy($id)
    {
        $profile = OrganizerProfile::find($id);
        if (!$profile) return response()->json(['message' => 'Not found'], 404);
        $profile->delete();
        return response()->json(['message' => 'Organizer profile berhasil dihapus']);
    }
}