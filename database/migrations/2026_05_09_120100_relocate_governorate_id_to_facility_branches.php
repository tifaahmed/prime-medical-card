<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('facility_branches', function (Blueprint $table) {
            $table->foreignId('governorate_id')
                ->nullable()
                ->after('facility_id')
                ->constrained('governorates')
                ->nullOnDelete();
            $table->foreignId('city_id')
                ->nullable()
                ->after('governorate_id')
                ->constrained('cities')
                ->nullOnDelete();

            $table->index('governorate_id');
            $table->index('city_id');
        });

        Schema::table('facilities', function (Blueprint $table) {
            $table->dropForeign(['governorate_id']);
            $table->dropIndex(['governorate_id']);
            $table->dropColumn('governorate_id');
        });
    }

    public function down(): void
    {
        Schema::table('facilities', function (Blueprint $table) {
            $table->foreignId('governorate_id')
                ->nullable()
                ->after('facility_type_id')
                ->constrained('governorates')
                ->cascadeOnDelete();
            $table->index('governorate_id');
        });

        Schema::table('facility_branches', function (Blueprint $table) {
            $table->dropForeign(['city_id']);
            $table->dropIndex(['city_id']);
            $table->dropColumn('city_id');

            $table->dropForeign(['governorate_id']);
            $table->dropIndex(['governorate_id']);
            $table->dropColumn('governorate_id');
        });
    }
};
