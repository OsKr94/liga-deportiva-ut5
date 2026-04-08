<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Jugador;

class JugadorModelTest extends TestCase
{
    /** @test */
    public function jugador_define_fillable_correctamente()
    {
        $jugador = new Jugador();

        $this->assertContains('nombre', $jugador->getFillable());
        $this->assertContains('edad', $jugador->getFillable());
        $this->assertContains('posicion', $jugador->getFillable());
        $this->assertContains('dorsal', $jugador->getFillable());
        $this->assertContains('club_id', $jugador->getFillable());
    }
}