<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/events",
     *     tags={"Events"},
     *     summary="Get semua event",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Daftar event")
     * )
     */
    public function index()
    {
        return response()->json(Event::with('organizer', 'venue', 'tags')->get());
    }

    /**
     * @OA\Post(
     *     path="/api/events",
     *     tags={"Events"},
     *     summary="Tambah event baru",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","event_date","quota","status","organizer_id","venue_id"},
     *             @OA\Property(property="name", type="string", example="Festival Seni 2026"),
     *             @OA\Property(property="description", type="string", example="Deskripsi event"),
     *             @OA\Property(property="event_date", type="string", format="datetime", example="2026-06-01T09:00:00"),
     *             @OA\Property(property="quota", type="integer", example=500),
     *             @OA\Property(property="status", type="string", enum={"open","closed","cancelled"}, example="open"),
     *             @OA\Property(property="organizer_id", type="integer", example=1),
     *             @OA\Property(property="venue_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Event berhasil dibuat"),
     *     @OA\Response(response=403, description="Forbidden")
     * )
     */
    public function store(Request $request)
    {
        $event = Event::create($request->all());
        return response()->json($event, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/events/{id}",
     *     tags={"Events"},
     *     summary="Get detail event",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Detail event"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show($id)
    {
        $event = Event::with('organizer', 'venue', 'tags', 'registrations')->find($id);
        if (!$event) return response()->json(['message' => 'Not found'], 404);
        return response()->json($event);
    }

    /**
     * @OA\Put(
     *     path="/api/events/{id}",
     *     tags={"Events"},
     *     summary="Update event",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="event_date", type="string"),
     *             @OA\Property(property="quota", type="integer"),
     *             @OA\Property(property="status", type="string"),
     *             @OA\Property(property="organizer_id", type="integer"),
     *             @OA\Property(property="venue_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Event berhasil diupdate"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) return response()->json(['message' => 'Not found'], 404);
        $event->update($request->all());
        return response()->json($event);
    }

    /**
     * @OA\Delete(
     *     path="/api/events/{id}",
     *     tags={"Events"},
     *     summary="Hapus event",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Event berhasil dihapus"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) return response()->json(['message' => 'Not found'], 404);
        $event->delete();
        return response()->json(['message' => 'Event berhasil dihapus']);
    }
}