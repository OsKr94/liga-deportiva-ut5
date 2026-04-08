<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    public function index()
    {
        return Partido::all();
    }

    public function show(Partido $partido)
    {
        return $partido;
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'liga_id'      => 'required|integer',
            'local_id'     => 'required|integer',
            'visitante_id' => 'required|integer',
            'fecha'        => 'required|date',
            'resultado'    => 'nullable|string|max:20',
        ]);

        return Partido::create($datos);
    }

    public function update(Request $request, Partido $partido)
    {
        $datos = $request->validate([
            'liga_id'      => 'sometimes|required|integer',
            'local_id'     => 'sometimes|required|integer',
            'visitante_id' => 'sometimes|required|integer',
            'fecha'        => 'sometimes|required|date',
            'resultado'    => 'nullable|string|max:20',
        ]);

        $partido->update($datos);
        return $partido;
    }

    public function destroy(Partido $partido)
    {
        $partido->delete();
        return response()->json(['ok' => true]);
    }
}
