<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    // LISTAR CLUBS
    public function index()
    {
        return Club::all();
    }

    // MOSTRAR UN CLUB
    public function show(Club $club)
    {
        return $club;
    }

    // CREAR CLUB
    public function store(Request $request)
    {
        $datos = $request->validate([
            'nombre' => 'required|string|max:100',
            'ciudad' => 'required|string|max:100',
            'categoria' => 'required|string|max:50',
        ]);

        return Club::create($datos);
    }

    // ACTUALIZAR CLUB
    public function update(Request $request, Club $club)
    {
        $datos = $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'ciudad' => 'sometimes|required|string|max:100',
            'categoria' => 'sometimes|required|string|max:50',
        ]);

        $club->update($datos);
        return $club;
    }

    // BORRAR CLUB
    public function destroy(Club $club)
    {
        $club->delete();
        return response()->json(['ok' => true]);
    }
}
