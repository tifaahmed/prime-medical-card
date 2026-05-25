<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@prime-medical-card.test'],
            [
                'name' => 'Super Admin',
                'username' => 'admin',
                'password' => Hash::make('PrimeCard@#195858'),
                'email_verified_at' => now(),
            ],
        );
    }
}
