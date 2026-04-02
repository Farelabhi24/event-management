<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('events')->insert([
            ['organizer_id' => 1, 'venue_id' => 1, 'name' => 'Festival Seni Nusantara 2026', 'description' => 'Festival seni budaya tahunan.', 'event_date' => '2026-05-10 09:00:00', 'quota' => 500, 'status' => 'open', 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 2, 'venue_id' => 2, 'name' => 'Seminar Teknologi Masa Depan', 'description' => 'Diskusi tren teknologi AI.', 'event_date' => '2026-06-15 08:00:00', 'quota' => 300, 'status' => 'open', 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 3, 'venue_id' => 3, 'name' => 'Konser Musik Indie', 'description' => 'Penampilan band indie lokal.', 'event_date' => '2026-07-01 19:00:00', 'quota' => 1000, 'status' => 'open', 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 4, 'venue_id' => 5, 'name' => 'Workshop Kepemimpinan', 'description' => 'Pelatihan kepemimpinan pemuda.', 'event_date' => '2026-04-20 08:00:00', 'quota' => 100, 'status' => 'closed', 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 5, 'venue_id' => 2, 'name' => 'Jazz Night Bandung', 'description' => 'Malam jazz akustik.', 'event_date' => '2026-08-05 20:00:00', 'quota' => 200, 'status' => 'open', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
