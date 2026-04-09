<?php

namespace Database\Seeders;

use App\Models\Club;
use App\Models\Liga;
use Illuminate\Database\Seeder;

class DemoPartidosSeeder extends Seeder
{
    public function run()
    {
        Liga::updateOrCreate(
            ['nombre' => 'Liga IES Maestre'],
            [
                'deporte' => 'Futbol',
                'temporada' => '2025-2026',
            ]
        );

        Club::updateOrCreate(
            ['nombre' => 'Club UT3'],
            [
                'ciudad' => 'Ciudad Real',
                'categoria' => 'Senior',
            ]
        );

        Club::updateOrCreate(
            ['nombre' => 'Club UT5'],
            [
                'ciudad' => 'Ciudad Real',
                'categoria' => 'Senior',
            ]
        );
    }
}