<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Event;
use Illuminate\Http\Request;

// app/Http/Controllers/TagController.php
class TagController extends Controller
{
    public function index()
    {
        return response()->json(Tag::with('events')->get());
    }

    public function store(Request $request)
    {
        $tag = Tag::create($request->all());
        return response()->json($tag, 201);
    }

    // Attach tag ke event (Many-to-Many)
    public function attachToEvent($eventId, $tagId)
    {
        $event = Event::find($eventId);
        if (!$event) return response()->json(['message' => 'Event not found'], 404);

        $event->tags()->syncWithoutDetaching([$tagId]);
        return response()->json(['message' => 'Tag berhasil ditambahkan ke event', 'event' => $event->load('tags')]);
    }
}
