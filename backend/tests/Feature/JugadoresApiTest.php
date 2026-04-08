<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Club;
use App\Models\Jugador;

class JugadoresApiTest extends TestCase
{
    use RefreshDatabase;

/** @test */
public function index_devuelve_200()
{
    $club = Club::factory()->create();
    Jugador::factory()->count(3)->create(['club_id' => $club->id]);

    $response = $this->getJson('/api/jugadores');

    $response->assertStatus(200)
             ->assertJsonCount(3)
             ->assertJsonStructure([
                 '*' => ['id','nombre','edad','posicion','dorsal','club_id','created_at','updated_at']
             ]);
}


/** @test */
public function show_inexistente_devuelve_404()
{
    $response = $this->getJson('/api/jugadores/999999');
    $response->assertStatus(404);
}




/** @test */
public function store_requiere_admin_y_crea_jugador_correctamente()
{
    $club = Club::factory()->create();

    $payload = [
        'nombre' => 'Jugador Test',
        'edad' => 20,
        'posicion' => 'Delantero',
        'dorsal' => 9,
        'club_id' => $club->id,
    ];

    $response = $this->withHeader('X-ROLE', 'admin')
                     ->postJson('/api/jugadores', $payload);

    $response->assertStatus(201);

    $this->assertDatabaseHas('jugadors', [
        'nombre' => 'Jugador Test',
        'club_id' => $club->id,
    ]);
}





/** @test */
public function store_sin_admin_devuelve_403()
{
    $club = Club::factory()->create();

    $payload = [
        'nombre' => 'Jugador NoAdmin',
        'edad' => 20,
        'posicion' => 'Delantero',
        'dorsal' => 9,
        'club_id' => $club->id,
    ];

    $response = $this->postJson('/api/jugadores', $payload);

    $response->assertStatus(403)
             ->assertJson([
                 'ok' => false
             ]);
}


/** @test */
public function store_con_datos_invalidos_devuelve_422()
{
    $club = Club::factory()->create();

    $payload = [
        'edad' => 999,
        'posicion' => 'Delantero',
        'dorsal' => 9,
        'club_id' => $club->id,
    ];

    $response = $this->withHeader('X-ROLE', 'admin')
                     ->postJson('/api/jugadores', $payload);

    $response->assertStatus(422);
}

}