<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('partidos', function (Blueprint $table) {
        $table->id();

        $table->foreignId('liga_id')->constrained('ligas')->onDelete('cascade');

        $table->foreignId('club_local_id')->constrained('clubs')->onDelete('cascade');
        $table->foreignId('club_visitante_id')->constrained('clubs')->onDelete('cascade');

        $table->dateTime('fecha');
        $table->string('resultado')->nullable(); // "2-1" o null

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partidos');
    }
}
