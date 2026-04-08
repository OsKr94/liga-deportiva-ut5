<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClubController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\PartidoController;

// RUTAS PÚBLICAS (GET)
Route::apiResource('clubs', ClubController::class)->only(['index','show']);
Route::apiResource('jugadores', JugadorController::class)
    ->only(['index','show'])
    ->parameters(['jugadores' => 'jugador']);
Route::apiResource('ligas', LigaController::class)->only(['index','show']);
Route::apiResource('partidos', PartidoController::class)->only(['index','show']);

// RUTAS PROTEGIDAS (POST/PUT/DELETE) solo admin
Route::middleware('admin')->group(function () {
    Route::apiResource('clubs', ClubController::class)->only(['store','update','destroy']);
 Route::apiResource('jugadores', JugadorController::class)
    ->only(['store','update','destroy'])
    ->parameters(['jugadores' => 'jugador']);
    Route::apiResource('ligas', LigaController::class)->only(['store','update','destroy']);
    Route::apiResource('partidos', PartidoController::class)->only(['store','update','destroy']);
});
