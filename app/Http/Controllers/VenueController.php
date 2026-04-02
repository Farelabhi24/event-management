<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index()
    {
        return response()->json(Venue::all());
    }

    public function store(Request $request)
    {
        $venue = Venue::create($request->all());
        return response()->json($venue, 201);
    }

    public function show($id)
    {
        $venue = Venue::with('events')->find($id);
        if (!$venue) return response()->json(['message' => 'Not found'], 404);
        return response()->json($venue);
    }
}
