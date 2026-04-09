<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    public function index()
    {
        return Partido::with(['liga', 'clubLocal', 'clubVisitante'])
            ->orderBy('fecha')
            ->get()
            ->map(fn (Partido $partido) => $this->transformarPartido($partido));
    }

    public function show(Partido $partido)
    {
        return $this->transformarPartido($partido->load(['liga', 'clubLocal', 'clubVisitante']));
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'liga_id' => 'required|integer|exists:ligas,id',
            'club_local_id' => 'required|integer|exists:clubs,id|different:club_visitante_id',
            'club_visitante_id' => 'required|integer|exists:clubs,id|different:club_local_id',
            'fecha' => 'required|date',
            'resultado' => 'nullable|string|max:20',
        ]);

        $partido = Partido::create($datos)->load(['liga', 'clubLocal', 'clubVisitante']);

        return response()->json($this->transformarPartido($partido), 201);
    }

    public function update(Request $request, Partido $partido)
    {
        $datos = $request->validate([
            'liga_id' => 'sometimes|required|integer|exists:ligas,id',
            'club_local_id' => 'sometimes|required|integer|exists:clubs,id|different:club_visitante_id',
            'club_visitante_id' => 'sometimes|required|integer|exists:clubs,id|different:club_local_id',
            'fecha' => 'sometimes|required|date',
            'resultado' => 'nullable|string|max:20',
        ]);

        $partido->update($datos);

        return $this->transformarPartido($partido->load(['liga', 'clubLocal', 'clubVisitante']));
    }

    public function destroy(Partido $partido)
    {
        $partido->delete();
        return response()->json(['ok' => true]);
    }

    private function transformarPartido(Partido $partido): array
    {
        [$golesLocal, $golesVisitante] = $this->parsearResultado($partido->resultado);

        return [
            'id' => $partido->id,
            'deporte' => optional($partido->liga)->nombre ?? 'Liga',
            'equipoLocal' => optional($partido->clubLocal)->nombre ?? 'Club local',
            'equipoVisitante' => optional($partido->clubVisitante)->nombre ?? 'Club visitante',
            'fecha' => $partido->fecha,
            'ubicacion' => '',
            'arbitro' => '',
            'resultado' => [
                'golesLocal' => $golesLocal,
                'golesVisitante' => $golesVisitante,
            ],
            'estado' => now()->lessThan($partido->fecha) ? 'pendiente' : 'jugado',
        ];
    }

    private function parsearResultado(?string $resultado): array
    {
        if (!$resultado || !str_contains($resultado, '-')) {
            return [0, 0];
        }

        $partes = array_map('trim', explode('-', $resultado, 2));

        return [
            isset($partes[0]) ? (int) $partes[0] : 0,
            isset($partes[1]) ? (int) $partes[1] : 0,
        ];
    }
}
