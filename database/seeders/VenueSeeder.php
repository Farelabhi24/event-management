<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('venues')->insert([
            ['name' => 'Gedung Serbaguna Senayan', 'city' => 'Jakarta', 'address' => 'Jl. Asia Afrika, Senayan', 'capacity' => 5000, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Aula Sabuga ITB', 'city' => 'Bandung', 'address' => 'Jl. Tamansari No. 73', 'capacity' => 2000, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Balai Kota Surabaya', 'city' => 'Surabaya', 'address' => 'Jl. Walikota Mustajab', 'capacity' => 1500, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Jogja Expo Center', 'city' => 'Yogyakarta', 'address' => 'Ring Road Utara', 'capacity' => 3000, 'status' => 'unavailable', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Trans Studio Bandung', 'city' => 'Bandung', 'address' => 'Jl. Gatot Subroto No. 289', 'capacity' => 4000, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
