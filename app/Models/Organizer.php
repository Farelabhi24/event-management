<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OrganizerProfile;
use App\Models\Event;

class Organizer extends Model
{
    protected $fillable = ['name', 'email', 'status'];

    public function profile()
    {
        return $this->hasOne(OrganizerProfile::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
