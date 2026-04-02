<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organizer;
use App\Models\Venue;
use App\Models\Tag;
use App\Models\Registration;

// app/Models/Event.php
class Event extends Model
{
    protected $fillable = ['organizer_id', 'venue_id', 'name', 'description', 'event_date', 'quota', 'status'];

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'event_tag');
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
