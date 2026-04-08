<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Para la tarea: un "rol" simple por cabecera
        // En Postman enviaremos: X-ROLE: admin
        $role = $request->header('X-ROLE');

        if ($role !== 'admin') {
            return response()->json([
                'ok' => false,
                'mensaje' => 'Acceso denegado: solo admin puede modificar.'
            ], 403);
        }

        return $next($request);
    }
}
