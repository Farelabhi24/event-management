<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Event;
use App\Models\Participant;

// app/Models/Registration.php
class Registration extends Model
{
    protected $fillable = ['event_id', 'participant_id', 'registered_at', 'status'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
