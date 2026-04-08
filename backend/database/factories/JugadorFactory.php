<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Jugador;
use App\Models\Club;

class JugadorFactory extends Factory
{
    protected $model = Jugador::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name(),
            'edad' => $this->faker->numberBetween(10, 45),
            'posicion' => $this->faker->randomElement(['Portero', 'Defensa', 'Centrocampista', 'Delantero']),
            'dorsal' => $this->faker->numberBetween(1, 99),
            'club_id' => Club::factory(),
        ];
    }
}