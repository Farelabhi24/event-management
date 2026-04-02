<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // database/seeders/TagSeeder.php
    public function run(): void
    {
        DB::table('tags')->insert([
            ['name' => 'Musik', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Seminar', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Olahraga', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Seni', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Teknologi', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Isi pivot event_tag (Many-to-Many)
        DB::table('event_tag')->insert([
            ['event_id' => 1, 'tag_id' => 4], // Festival Seni → Seni
            ['event_id' => 1, 'tag_id' => 1], // Festival Seni → Musik
            ['event_id' => 2, 'tag_id' => 5], // Seminar → Teknologi
            ['event_id' => 2, 'tag_id' => 2], // Seminar → Seminar
            ['event_id' => 3, 'tag_id' => 1], // Konser → Musik
            ['event_id' => 5, 'tag_id' => 1], // Jazz → Musik
        ]);
    }
}
