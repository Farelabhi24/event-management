<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\OrganizerController;
use App\Http\Controllers\OrganizerProfileController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ParticipantController;

// Public routes - Auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Protected routes
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('/logout',  [AuthController::class, 'logout']);
        Route::get('/profile',  [AuthController::class, 'getUserProfile']);
    });

    // Events
    Route::get('/events',          [EventController::class, 'index']);
    Route::get('/events/{id}',     [EventController::class, 'show']);
    Route::post('/events',         [EventController::class, 'store'])->middleware('role:admin,organizer');
    Route::put('/events/{id}',     [EventController::class, 'update'])->middleware('role:admin,organizer');
    Route::delete('/events/{id}',  [EventController::class, 'destroy'])->middleware('role:admin');

    // Organizers
    Route::get('/organizers',         [OrganizerController::class, 'index']);
    Route::get('/organizers/{id}',    [OrganizerController::class, 'show']);
    Route::post('/organizers',        [OrganizerController::class, 'store'])->middleware('role:admin');
    Route::put('/organizers/{id}',    [OrganizerController::class, 'update'])->middleware('role:admin');
    Route::delete('/organizers/{id}', [OrganizerController::class, 'destroy'])->middleware('role:admin');

    // Organizer Profiles
    Route::get('/organizer-profiles',         [OrganizerProfileController::class, 'index']);
    Route::get('/organizer-profiles/{id}',    [OrganizerProfileController::class, 'show']);
    Route::post('/organizer-profiles',        [OrganizerProfileController::class, 'store'])->middleware('role:admin,organizer');
    Route::put('/organizer-profiles/{id}',    [OrganizerProfileController::class, 'update'])->middleware('role:admin,organizer');
    Route::delete('/organizer-profiles/{id}', [OrganizerProfileController::class, 'destroy'])->middleware('role:admin');

    // Venues
    Route::get('/venues',         [VenueController::class, 'index']);
    Route::get('/venues/{id}',    [VenueController::class, 'show']);
    Route::post('/venues',        [VenueController::class, 'store'])->middleware('role:admin,organizer');
    Route::put('/venues/{id}',    [VenueController::class, 'update'])->middleware('role:admin,organizer');
    Route::delete('/venues/{id}', [VenueController::class, 'destroy'])->middleware('role:admin');

    // Tags
    Route::get('/tags',         [TagController::class, 'index']);
    Route::get('/tags/{id}',    [TagController::class, 'show']);
    Route::post('/tags',        [TagController::class, 'store'])->middleware('role:admin,organizer');
    Route::put('/tags/{id}',    [TagController::class, 'update'])->middleware('role:admin,organizer');
    Route::delete('/tags/{id}', [TagController::class, 'destroy'])->middleware('role:admin');

    // Participants
    Route::get('/participants',         [ParticipantController::class, 'index']);
    Route::get('/participants/{id}',    [ParticipantController::class, 'show']);
    Route::post('/participants',        [ParticipantController::class, 'store'])->middleware('role:admin,organizer,participant');
    Route::put('/participants/{id}',    [ParticipantController::class, 'update'])->middleware('role:admin');
    Route::delete('/participants/{id}', [ParticipantController::class, 'destroy'])->middleware('role:admin');

    // Registrations
    Route::get('/registrations',         [RegistrationController::class, 'index']);
    Route::get('/registrations/{id}',    [RegistrationController::class, 'show']);
    Route::post('/registrations',        [RegistrationController::class, 'store'])->middleware('role:admin,organizer,participant');
    Route::put('/registrations/{id}',    [RegistrationController::class, 'update'])->middleware('role:admin,organizer');
    Route::delete('/registrations/{id}', [RegistrationController::class, 'destroy'])->middleware('role:admin');

});