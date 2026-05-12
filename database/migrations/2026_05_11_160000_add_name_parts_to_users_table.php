<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable()->after('name');
            $table->string('second_name')->nullable()->after('first_name');
            $table->string('third_name')->nullable()->after('second_name');
            $table->string('fourth_name')->nullable()->after('third_name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['first_name', 'second_name', 'third_name', 'fourth_name']);
        });
    }
};
