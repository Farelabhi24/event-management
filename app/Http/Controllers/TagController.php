<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return response()->json(Tag::all());
    }

    public function store(Request $request)
    {
        $tag = Tag::create($request->all());
        return response()->json($tag, 201);
    }

    public function show($id)
    {
        $tag = Tag::find($id);
        if (!$tag) return response()->json(['message' => 'Not found'], 404);
        return response()->json($tag);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::find($id);
        if (!$tag) return response()->json(['message' => 'Not found'], 404);
        $tag->update($request->all());
        return response()->json($tag);
    }

    public function destroy($id)
    {
        $tag = Tag::find($id);
        if (!$tag) return response()->json(['message' => 'Not found'], 404);
        $tag->delete();
        return response()->json(['message' => 'Tag berhasil dihapus']);
    }
}