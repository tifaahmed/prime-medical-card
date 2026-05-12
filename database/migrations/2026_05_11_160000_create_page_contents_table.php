<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page', 50);
            $table->string('section', 80);
            $table->string('key', 80);
            $table->text('value')->nullable();
            $table->boolean('is_rich')->default(false);
            $table->timestamps();

            $table->unique(['page', 'section', 'key']);
            $table->index('page');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
