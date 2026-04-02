<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

// app/Http/Controllers/EventController.php
class EventController extends Controller
{
    public function index()
    {
        return response()->json(Event::with('organizer', 'venue')->get());
    }

    public function store(Request $request)
    {
        $event = Event::create($request->all());
        return response()->json($event, 201);
    }

    public function show($id)
    {
        $event = Event::with('organizer', 'venue', 'tags', 'registrations')->find($id);
        if (!$event) return response()->json(['message' => 'Not found'], 404);
        return response()->json($event);
    }
}
