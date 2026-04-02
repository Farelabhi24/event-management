<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganizerProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('organizer_profiles')->insert([
            ['organizer_id' => 1, 'phone' => '081234567890', 'address' => 'Jl. Sudirman No. 1, Jakarta', 'bio' => 'Yayasan yang fokus pada pengembangan seni dan budaya.', 'website' => 'https://kreatif.id', 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 2, 'phone' => '082345678901', 'address' => 'Jl. Gatot Subroto No. 5, Jakarta', 'bio' => 'Perusahaan event organizer profesional.', 'website' => null, 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 3, 'phone' => '083456789012', 'address' => 'Jl. Braga No. 10, Bandung', 'bio' => 'Komunitas seniman Bandung.', 'website' => 'https://senibdg.com', 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 4, 'phone' => '084567890123', 'address' => 'Jl. Thamrin No. 3, Jakarta', 'bio' => 'Organisasi kepemudaan Indonesia.', 'website' => null, 'created_at' => now(), 'updated_at' => now()],
            ['organizer_id' => 5, 'phone' => '085678901234', 'address' => 'Jl. Melawai No. 8, Jakarta', 'bio' => 'Studio musik dan event musik.', 'website' => 'https://harmoni.id', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
