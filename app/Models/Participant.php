<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}