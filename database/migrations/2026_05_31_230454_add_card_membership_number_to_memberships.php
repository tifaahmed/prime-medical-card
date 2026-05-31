<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            $table->string('card_membership_number', 255)->nullable()->after('card_full_name');
        });
    }

    public function down(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            $table->dropColumn('card_membership_number');
        });
    }
};
