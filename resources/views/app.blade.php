<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0b2e2c">
        <meta name="format-detection" content="telephone=no">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta property="og:site_name" content="{{ config('app.name', 'Prime Medical Card') }}">
        <meta property="og:locale" content="ar_EG">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ rtrim(config('app.url', url('/')), '/') }}/images/logos/logo-with-text.png">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ rtrim(config('app.url', url('/')), '/') }}/images/logos/logo-with-text.png">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/images/logos/favicons/favicon.ico" sizes="any">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logos/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logos/favicons/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logos/favicons/apple-touch-icon.png">
        <link rel="manifest" href="/images/logos/favicons/site.webmanifest">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
