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
        Schema::create('air_ducts', function (Blueprint $table) {
            $table->id();
            $table->enum('num_furnace',array('1','2','3+'));
            $table->integer('furnace_loc_sidebyside');
            $table->integer('furnace_loc_different');
            $table->integer('furnace_loc_na');
            $table->integer('square_footage_min');
            $table->integer('square_footage_max');
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
        Schema::dropIfExists('air_ducts');
    }
};
