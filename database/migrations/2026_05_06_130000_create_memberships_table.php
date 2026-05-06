<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('membership_number')->unique();
            $table->string('slug')->unique();
            $table->dateTime('registration_date')->useCurrent();
            $table->dateTime('expiration_date');
            $table->boolean('is_active')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->json('job_title')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('is_active');
            $table->index('is_visible');
            $table->index('deleted_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};
