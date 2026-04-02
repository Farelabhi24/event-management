<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Event;

class Venue extends Model
{
    protected $fillable = ['name', 'city', 'address', 'capacity', 'status'];

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
