<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use Illuminate\Http\Request;

class LigaController extends Controller
{
    public function index()
    {
        return Liga::all();
    }

    public function show(Liga $liga)
    {
        return $liga;
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'nombre'    => 'required|string|max:100',
            'temporada' => 'required|string|max:20',
        ]);

        return Liga::create($datos);
    }

    public function update(Request $request, Liga $liga)
    {
        $datos = $request->validate([
            'nombre'    => 'sometimes|required|string|max:100',
            'temporada' => 'sometimes|required|string|max:20',
        ]);

        $liga->update($datos);
        return $liga;
    }

    public function destroy(Liga $liga)
    {
        $liga->delete();
        return response()->json(['ok' => true]);
    }
}
