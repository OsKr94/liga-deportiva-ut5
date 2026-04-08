<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\Request;

class JugadorController extends Controller
{
    public function index()
    {
        return Jugador::all();
    }

    public function show(Jugador $jugador)
    {
        return $jugador;
    }

    public function store(Request $request)
{
    $datos = $request->validate([
        'nombre'   => 'required|string|max:100',
        'edad'     => 'required|integer|min:0|max:120',
        'posicion' => 'required|string|max:50',
        'dorsal'   => 'required|integer|min:0|max:999',
        'club_id' => 'required|exists:clubs,id',

    ]);

    return Jugador::create($datos);
}

public function update(Request $request, Jugador $jugador)
{
    $datos = $request->validate([
        'nombre'   => 'sometimes|required|string|max:100',
        'edad'     => 'sometimes|required|integer|min:0|max:120',
        'posicion' => 'sometimes|required|string|max:50',
        'dorsal'   => 'sometimes|required|integer|min:0|max:999',
        'club_id' => 'required|exists:clubs,id',

    ]);

    $jugador->update($datos);
    return $jugador;
}


    public function destroy(Jugador $jugador)
    {
        $jugador->delete();
        return response()->json(['ok' => true]);
    }
}
