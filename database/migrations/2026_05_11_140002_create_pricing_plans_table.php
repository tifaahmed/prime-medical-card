<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description', 500)->nullable();
            $table->string('price', 50);
            $table->string('period', 255)->nullable();
            $table->json('features')->nullable();
            $table->string('badge', 100)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('cta_label', 100)->default('اشترك الآن');
            $table->string('cta_variant', 20)->default('primary');
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('position')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
