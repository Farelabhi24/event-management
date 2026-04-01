<?php

use App\Http\Controllers\OrganizerController;
use App\Http\Middleware\CheckGroupHeader;

Route::middleware([CheckGroupHeader::class])->group(function () {
    Route::get('/organizers', [OrganizerController::class, 'index']);
    Route::post('/organizers', [OrganizerController::class, 'store']);
    Route::get('/organizers/{id}', [OrganizerController::class, 'show']);
});