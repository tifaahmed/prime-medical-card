<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_stats', function (Blueprint $table) {
            $table->id();
            $table->string('value', 50);
            $table->string('label', 255);
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('position')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_stats');
    }
};
