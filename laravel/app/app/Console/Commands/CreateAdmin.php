<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin {email} {--password= : Password for the admin user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create an admin user with a random strong password';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->option('password');

        if (!$password) {
            // Generate a random password of 16 characters
            $password = $this->generateRandomPassword();
            $this->info("Generated password: $password");
        }

        // Ensure the password is strong (validate the password)
        if (!$this->isValidPassword($password)) {
            $this->error("The generated password does not meet the security requirements.");
            return;
        }

        // Create or update the admin user
        $admin = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Admin User',
                'password' => Hash::make($password),
                'role' => 'admin',
            ]
        );

        $this->info('Admin user created successfully!');
    }

    /**
     * Generate a random strong password
     *
     * @return string
     */
    private function generateRandomPassword(): string
    {
        return Str::random(8) . rand(1000, 9999) . '@#' . Str::random(4); // A mix of random characters, numbers, and special characters
    }

    /**
     * Check if the password meets security criteria
     *
     * @param string $password
     * @return bool
     */
    private function isValidPassword(string $password): bool
    {
        $lengthValid = strlen($password) >= 12;
        $hasNumbers = preg_match('/\d/', $password);
        $hasSpecialChars = preg_match('/[^\w]/', $password);

        return $lengthValid && $hasNumbers && $hasSpecialChars;
    }
}
