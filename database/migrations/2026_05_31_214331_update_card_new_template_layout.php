<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('card_templates')
            ->where('name', 'البطاقة الجديدة')
            ->update(['layout' => json_encode([
                'first_name' => ['top' => 40.012747552925106, 'left' => 53.13677811550152, 'fontSize' => 2.3],
                'full_name' => ['top' => 40.051100424942014, 'left' => 69.06981670811457, 'fontSize' => 2.3],
                'work_place' => ['top' => 49.35219819400237, 'left' => 54.312700561849496, 'fontSize' => 2.5],
                'company' => ['top' => 59.71250436295459, 'left' => 53.744680851063826, 'fontSize' => 2.5],
                'date' => ['top' => 68.74444191516807, 'left' => 54.161094224924014, 'fontSize' => 2.5],
                'photo' => ['top' => 20.735347142616483, 'left' => 2.796757852077002, 'width' => 27, 'height' => 48, 'rounded' => true],
                'qr' => ['top' => 81.48176276571527, 'left' => 88.85279174725984, 'width' => 8.72, 'height' => 14.58],
            ])]);
    }

    public function down(): void
    {
        DB::table('card_templates')
            ->where('name', 'البطاقة الجديدة')
            ->update(['layout' => json_encode([
                'first_name' => ['top' => 40.012747552925106, 'left' => 53.13677811550152, 'fontSize' => 2.3],
                'full_name' => ['top' => 40.051100424942014, 'left' => 69.06981670811457, 'fontSize' => 2.3],
                'work_place' => ['top' => 50.41281053190683, 'left' => 54.16118541033435, 'fontSize' => 2.5],
                'company' => ['top' => 60.24281053190682, 'left' => 53.744680851063826, 'fontSize' => 2.5],
                'date' => ['top' => 68.74444191516807, 'left' => 54.161094224924014, 'fontSize' => 2.5],
                'photo' => ['top' => 27.09902117004325, 'left' => 11.130091185410336, 'width' => 18.4, 'height' => 36.5, 'rounded' => true],
                'qr' => ['top' => 78.02431595720464, 'left' => 85.66130238555772, 'width' => 13.22, 'height' => 19.58],
            ])]);
    }
};
