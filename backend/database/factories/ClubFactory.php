<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Club;

class ClubFactory extends Factory
{
    protected $model = Club::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->company(),
            'ciudad' => $this->faker->city(),
            'categoria' => $this->faker->randomElement(['juvenil', 'senior']),
        ];
    }
}