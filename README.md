# Nelmar Penera Portfolio

A Laravel 13, Inertia, and React portfolio with a database-backed projects manager and contact form.

## Requirements

- PHP 8.3 or newer with SQLite enabled
- Composer
- Node.js 20.19 or newer and npm

## Run locally (Windows PowerShell)

From the project folder, install dependencies and prepare the SQLite database:

```powershell
composer install
php artisan key:generate
if (-not (Test-Path database\database.sqlite)) { New-Item -ItemType File database\database.sqlite }
php artisan migrate
php artisan db:seed --class=ProjectSeeder
php artisan storage:link
npm install
```

In separate terminals, start the Laravel server and Vite:

```powershell
php artisan serve
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) for the portfolio. Register at `/register` to access the project manager at `/projects`.

## Personalize

- Update your details, links, skills, and services in `resources/js/data/profile.js`.
- Replace `public/images/profile.png` with your own photo.
- Project CRUD pages require an authenticated account.
