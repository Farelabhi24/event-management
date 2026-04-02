<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // database/seeders/ParticipantSeeder.php
    public function run(): void
    {
        DB::table('participants')->insert([
            ['name' => 'Budi Santoso', 'email' => 'budi@mail.com', 'phone' => '08111111111', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Siti Rahayu', 'email' => 'siti@mail.com', 'phone' => '08222222222', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Ahmad Fauzi', 'email' => 'ahmad@mail.com', 'phone' => '08333333333', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Dewi Lestari', 'email' => 'dewi@mail.com', 'phone' => '08444444444', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Rizky Pratama', 'email' => 'rizky@mail.com', 'phone' => '08555555555', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
