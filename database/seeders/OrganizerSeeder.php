<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('organizers')->insert([
            ['name' => 'Yayasan Kreatif Nusantara', 'email' => 'kreatif@mail.com', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'PT Event Jaya', 'email' => 'eventjaya@mail.com', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Komunitas Seni Bandung', 'email' => 'senibdg@mail.com', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Organisasi Pemuda Indonesia', 'email' => 'opi@mail.com', 'status' => 'inactive', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Studio Musik Harmoni', 'email' => 'harmoni@mail.com', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
