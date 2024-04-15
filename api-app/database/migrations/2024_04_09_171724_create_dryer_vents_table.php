<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dryer_vents', function (Blueprint $table) {
            $table->id();
            $table->enum('dryer_vent_exit_point',[
                '0-10 Feet Off the Ground',
                '10+ Feet Off the Ground',
                'Rooftop'
            ]);
            $table->unsignedInteger('price');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->softDeletes();
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
        Schema::dropIfExists('dryer_vents');
    }
};
