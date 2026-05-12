<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_values', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description', 1000)->nullable();
            $table->string('icon_key', 50);
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('position')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_values');
    }
};
