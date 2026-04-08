<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJugadorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
{
    Schema::create('jugadors', function (Blueprint $table) {
        $table->id();
        $table->string('nombre');
        $table->unsignedInteger('edad');
        $table->string('posicion');
        $table->integer('dorsal');
        $table->foreignId('club_id')->constrained('clubs')->onDelete('cascade');
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
        Schema::dropIfExists('jugadors');
    }
}
