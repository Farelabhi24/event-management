<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    // database/seeders/DatabaseSeeder.php
    public function run(): void
    {
        $this->call([
            OrganizerSeeder::class,
            OrganizerProfileSeeder::class,
            VenueSeeder::class,
            EventSeeder::class,
            ParticipantSeeder::class,
            TagSeeder::class,       // include RegistrationSeeder di dalam TagSeeder, atau panggil terpisah
            RegistrationSeeder::class,
        ]);
    }
}
