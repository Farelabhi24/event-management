<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganizerProfile extends Model
{
    protected $fillable = [
        'organizer_id',
        'address',
        'description',
        'website',
    ];

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }
}