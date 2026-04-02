<?php

use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\OrganizerController;
use App\Http\Controllers\OrganizerProfileController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\RegistrationController;

// Middlewares
use App\Http\Middleware\CheckGroupHeader;
use App\Http\Middleware\CheckProfileNotDuplicate;
use App\Http\Middleware\CheckVenueCapacity;
use App\Http\Middleware\CheckEventQuota;
use App\Http\Middleware\CheckTagName;
use App\Http\Middleware\CheckEventOpen;

// Anggota 1: Organizer
Route::middleware([CheckGroupHeader::class])->group(function () {
    Route::get('/organizers', [OrganizerController::class, 'index']);
    Route::post('/organizers', [OrganizerController::class, 'store']);
    Route::get('/organizers/{id}', [OrganizerController::class, 'show']);
});

// Anggota 2: OrganizerProfile
Route::get('/organizer-profiles', [OrganizerProfileController::class, 'index']);
Route::post('/organizer-profiles', [OrganizerProfileController::class, 'store'])
    ->middleware(CheckProfileNotDuplicate::class);
Route::get('/organizer-profiles/{id}', [OrganizerProfileController::class, 'show']);

// Anggota 3: Venue
Route::get('/venues', [VenueController::class, 'index']);
Route::post('/venues', [VenueController::class, 'store'])
    ->middleware(CheckVenueCapacity::class);
Route::get('/venues/{id}', [VenueController::class, 'show']);

// Anggota 4: Event
Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store'])
    ->middleware(CheckEventQuota::class);
Route::get('/events/{id}', [EventController::class, 'show']);

// Anggota 5: Tag & Registration
Route::get('/tags', [TagController::class, 'index']);
Route::post('/tags', [TagController::class, 'store'])
    ->middleware(CheckTagName::class);
Route::put('/events/{eventId}/tag/{tagId}', [TagController::class, 'attachToEvent']);

Route::get('/registrations', [RegistrationController::class, 'index']);
Route::post('/registrations', [RegistrationController::class, 'store'])
    ->middleware(CheckEventOpen::class);
Route::get('/registrations/{id}', [RegistrationController::class, 'show']);