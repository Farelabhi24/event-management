<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Registration;

// app/Models/Participant.php
class Participant extends Model
{
    protected $fillable = ['name', 'email', 'phone'];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
