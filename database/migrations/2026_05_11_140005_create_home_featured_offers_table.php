<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_featured_offers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('partner');
            $table->string('description', 1000)->nullable();
            $table->string('discount', 50)->nullable();
            $table->string('expires_text', 100)->nullable();
            $table->string('tag', 100)->nullable();
            $table->string('accent_color', 20)->nullable();
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('position')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_featured_offers');
    }
};
