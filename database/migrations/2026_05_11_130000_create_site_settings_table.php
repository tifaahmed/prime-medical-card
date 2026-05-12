<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();

            $table->string('contact_phone', 50)->nullable();
            $table->string('contact_phone_display', 100)->nullable();
            $table->string('contact_whatsapp', 50)->nullable();
            $table->string('contact_email', 255)->nullable();
            $table->string('contact_address', 500)->nullable();
            $table->string('business_hours', 255)->nullable();
            $table->string('support_hours_note', 255)->nullable();

            $table->string('hotline_number', 50)->nullable();
            $table->string('hotline_caption', 255)->nullable();

            $table->string('map_latitude', 50)->nullable();
            $table->string('map_longitude', 50)->nullable();

            $table->string('facebook_url', 500)->nullable();
            $table->string('instagram_url', 500)->nullable();
            $table->string('twitter_url', 500)->nullable();
            $table->string('youtube_url', 500)->nullable();

            $table->boolean('announce_enabled')->default(true);
            $table->string('announce_lead', 255)->nullable();
            $table->string('announce_body', 500)->nullable();
            $table->string('announce_tail', 255)->nullable();

            $table->string('stat1_value', 50)->nullable();
            $table->string('stat1_label', 150)->nullable();
            $table->string('stat2_value', 50)->nullable();
            $table->string('stat2_label', 150)->nullable();
            $table->string('stat3_value', 50)->nullable();
            $table->string('stat3_label', 150)->nullable();

            $table->text('footer_description')->nullable();
            $table->string('copyright_text', 255)->nullable();
            $table->string('made_in_text', 100)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
