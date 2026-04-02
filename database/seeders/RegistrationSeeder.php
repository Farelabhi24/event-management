<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // database/seeders/RegistrationSeeder.php
    public function run(): void
    {
        DB::table('registrations')->insert([
            ['event_id' => 1, 'participant_id' => 1, 'registered_at' => now(), 'status' => 'confirmed', 'created_at' => now(), 'updated_at' => now()],
            ['event_id' => 1, 'participant_id' => 2, 'registered_at' => now(), 'status' => 'confirmed', 'created_at' => now(), 'updated_at' => now()],
            ['event_id' => 2, 'participant_id' => 3, 'registered_at' => now(), 'status' => 'confirmed', 'created_at' => now(), 'updated_at' => now()],
            ['event_id' => 3, 'participant_id' => 4, 'registered_at' => now(), 'status' => 'cancelled', 'created_at' => now(), 'updated_at' => now()],
            ['event_id' => 5, 'participant_id' => 5, 'registered_at' => now(), 'status' => 'confirmed', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
