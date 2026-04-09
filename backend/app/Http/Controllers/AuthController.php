<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function registro(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'usuario' => 'required|string|max:255|unique:users,usuario',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'tipo' => 'nullable|in:admin,normal,arbitro,capitan',
        ], [
            'nombre.required' => 'El nombre es obligatorio.',
            'usuario.required' => 'El usuario es obligatorio.',
            'usuario.unique' => 'Ese usuario ya existe.',
            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email no es valido.',
            'email.unique' => 'Ese email ya esta registrado.',
            'password.required' => 'La contrasena es obligatoria.',
            'password.min' => 'La contrasena debe tener al menos 6 caracteres.',
            'tipo.in' => 'El tipo de usuario no es valido.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'mensaje' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $user = User::create([
            'name' => $data['nombre'],
            'usuario' => $data['usuario'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'tipo' => $data['tipo'] ?? 'normal',
        ]);

        return response()->json([
            'ok' => true,
            'mensaje' => 'Usuario registrado correctamente.',
            'tipo' => $user->tipo,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario' => 'required|string',
            'password' => 'required|string',
        ], [
            'usuario.required' => 'El usuario es obligatorio.',
            'password.required' => 'La contrasena es obligatoria.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'mensaje' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $user = User::where('usuario', $data['usuario'])
            ->orWhere('email', $data['usuario'])
            ->orWhere('name', $data['usuario'])
            ->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'ok' => false,
                'mensaje' => 'Usuario o contraseña incorrectos.',
            ], 401);
        }

        return response()->json([
            'ok' => true,
            'mensaje' => 'Login correcto.',
            'tipo' => $user->tipo ?? 'normal',
            'token' => $user->createToken('api-token')->plainTextToken,
        ]);
    }
}
