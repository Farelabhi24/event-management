<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organizer;

class OrganizerProfile extends Model
{
    protected $fillable = ['organizer_id', 'phone', 'address', 'bio', 'website'];

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }
}
