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

        <link rel="icon" href="/images/logos/logo-without-text-new.webp" type="image/webp">
        <link rel="apple-touch-icon" href="/images/logos/logo-without-text-new.webp">
        <link rel="manifest" href="/images/logos/favicons/site.webmanifest">

        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        @php
            $fontsHref = 'https://fonts.bunny.net/css?family=reem-kufi:600,700|tajawal:400,500,700&display=optional';
        @endphp
        <link rel="preload" as="style" href="{{ $fontsHref }}">
        <link rel="stylesheet" href="{{ $fontsHref }}" media="print" onload="this.media='all'">
        <noscript><link rel="stylesheet" href="{{ $fontsHref }}"></noscript>
        <style>
            @font-face{font-family:'Tajawal';font-style:normal;font-weight:400;font-display:optional;src:url(https://fonts.bunny.net/tajawal/files/tajawal-arabic-400-normal.woff2) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC,U+102E0-102FB,U+10E60-10E7E,U+10EC2-10EC4,U+10EFC-10EFF,U+1EE00-1EE03,U+1EE05-1EE1F,U+1EE21-1EE22,U+1EE24,U+1EE27,U+1EE29-1EE32,U+1EE34-1EE37,U+1EE39,U+1EE3B,U+1EE42,U+1EE47,U+1EE49,U+1EE4B,U+1EE4D-1EE4F,U+1EE51-1EE52,U+1EE54,U+1EE57,U+1EE59,U+1EE5B,U+1EE5D,U+1EE5F,U+1EE61-1EE62,U+1EE64,U+1EE67-1EE6A,U+1EE6C-1EE72,U+1EE74-1EE77,U+1EE79-1EE7C,U+1EE7E,U+1EE80-1EE89,U+1EE8B-1EE9B,U+1EEA1-1EEA3,U+1EEA5-1EEA9,U+1EEAB-1EEBB,U+1EEF0-1EEF1}
            @font-face{font-family:'Tajawal';font-style:normal;font-weight:700;font-display:optional;src:url(https://fonts.bunny.net/tajawal/files/tajawal-arabic-700-normal.woff2) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC,U+102E0-102FB,U+10E60-10E7E,U+10EC2-10EC4,U+10EFC-10EFF,U+1EE00-1EE03,U+1EE05-1EE1F,U+1EE21-1EE22,U+1EE24,U+1EE27,U+1EE29-1EE32,U+1EE34-1EE37,U+1EE39,U+1EE3B,U+1EE42,U+1EE47,U+1EE49,U+1EE4B,U+1EE4D-1EE4F,U+1EE51-1EE52,U+1EE54,U+1EE57,U+1EE59,U+1EE5B,U+1EE5D,U+1EE5F,U+1EE61-1EE62,U+1EE64,U+1EE67-1EE6A,U+1EE6C-1EE72,U+1EE74-1EE77,U+1EE79-1EE7C,U+1EE7E,U+1EE80-1EE89,U+1EE8B-1EE9B,U+1EEA1-1EEA3,U+1EEA5-1EEA9,U+1EEAB-1EEBB,U+1EEF0-1EEF1}
            @font-face{font-family:'Reem Kufi';font-style:normal;font-weight:600;font-display:optional;src:url(https://fonts.bunny.net/reem-kufi/files/reem-kufi-arabic-600-normal.woff2) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC,U+102E0-102FB,U+10E60-10E7E,U+10EC2-10EC4,U+10EFC-10EFF,U+1EE00-1EE03,U+1EE05-1EE1F,U+1EE21-1EE22,U+1EE24,U+1EE27,U+1EE29-1EE32,U+1EE34-1EE37,U+1EE39,U+1EE3B,U+1EE42,U+1EE47,U+1EE49,U+1EE4B,U+1EE4D-1EE4F,U+1EE51-1EE52,U+1EE54,U+1EE57,U+1EE59,U+1EE5B,U+1EE5D,U+1EE5F,U+1EE61-1EE62,U+1EE64,U+1EE67-1EE6A,U+1EE6C-1EE72,U+1EE74-1EE77,U+1EE79-1EE7C,U+1EE7E,U+1EE80-1EE89,U+1EE8B-1EE9B,U+1EEA1-1EEA3,U+1EEA5-1EEA9,U+1EEAB-1EEBB,U+1EEF0-1EEF1}
            @font-face{font-family:'Reem Kufi';font-style:normal;font-weight:700;font-display:optional;src:url(https://fonts.bunny.net/reem-kufi/files/reem-kufi-arabic-700-normal.woff2) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC,U+102E0-102FB,U+10E60-10E7E,U+10EC2-10EC4,U+10EFC-10EFF,U+1EE00-1EE03,U+1EE05-1EE1F,U+1EE21-1EE22,U+1EE24,U+1EE27,U+1EE29-1EE32,U+1EE34-1EE37,U+1EE39,U+1EE3B,U+1EE42,U+1EE47,U+1EE49,U+1EE4B,U+1EE4D-1EE4F,U+1EE51-1EE52,U+1EE54,U+1EE57,U+1EE59,U+1EE5B,U+1EE5D,U+1EE5F,U+1EE61-1EE62,U+1EE64,U+1EE67-1EE6A,U+1EE6C-1EE72,U+1EE74-1EE77,U+1EE79-1EE7C,U+1EE7E,U+1EE80-1EE89,U+1EE8B-1EE9B,U+1EEA1-1EEA3,U+1EEA5-1EEA9,U+1EEAB-1EEBB,U+1EEF0-1EEF1}
        </style>

        {{-- Critical above-the-fold CSS for hero + navigation --}}
        <style>
            .pm-home{--teal-900:#0b2e2c;--teal-800:#12403d;--teal-700:#1a544f;--teal-600:#236b64;--teal-500:#2e867e;--teal-300:#7fb3ad;--teal-100:#d7e8e5;--amber-600:#d68228;--amber-500:#e8a84a;--amber-400:#f4c373;--cream:#f7f2ea;--cream-dark:#efe7d9;--ink:#0a1a19;--ink-soft:#3d4948;--white:#ffffff;--line:rgba(11,46,44,.12);--font-display:'Reem Kufi','Tajawal',system-ui,sans-serif;--font-body:'Tajawal',system-ui,sans-serif;--font-serif:'Tajawal',serif;--radius-sm:10px;--radius-md:18px;--radius-lg:28px;--radius-xl:40px;--ease:cubic-bezier(.65,0,.35,1);--ease-out:cubic-bezier(.22,1,.36,1);font-family:var(--font-body);background:var(--cream);color:var(--ink);line-height:1.6;overflow-x:clip;-webkit-font-smoothing:antialiased;position:relative;min-height:100vh}.pm-home *{box-sizing:border-box}.pm-home h1,.pm-home h2,.pm-home h3,.pm-home h4{font-family:var(--font-display);font-weight:600;line-height:1.25;letter-spacing:-.01em;margin:0}.pm-home a{text-decoration:none;color:inherit}.pm-home .container{max-width:1280px;margin:0 auto;padding:0 32px;position:relative;z-index:2}.pm-home nav.topnav{padding:10px 0;position:sticky;top:0;background:rgba(247,242,234,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:50;border-bottom:1px solid var(--line);transform:translateY(0);transition:transform .3s ease;will-change:transform}.pm-home .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:40px}.pm-home .logo{display:inline-flex;align-items:center;line-height:0}.pm-home .logo-image{height:40px;width:auto;max-width:180px;display:block;object-fit:contain}.pm-home .nav-menu{display:flex;gap:32px}.pm-home .nav-menu a{font-size:15px;font-weight:500;color:var(--ink-soft);transition:color .3s var(--ease);position:relative}.pm-home .nav-actions{display:flex;gap:12px;align-items:center}.pm-home .nav-cta{display:flex;gap:12px;align-items:center}.pm-home .nav-card-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:100px;border:1.5px solid var(--amber-500);background:linear-gradient(135deg,var(--amber-400),var(--amber-500));color:var(--teal-900);font-family:var(--font-body);font-size:13px;font-weight:700;cursor:pointer;transition:all .35s var(--ease);box-shadow:0 4px 12px -6px rgba(214,130,40,.55)}.pm-home .nav-card-btn svg{width:15px;height:15px}.pm-home .nav-card-btn-label{line-height:1}.pm-home .btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:100px;font-family:var(--font-body);font-size:15px;font-weight:600;border:none;cursor:pointer;transition:all .35s var(--ease);text-decoration:none;white-space:nowrap}.pm-home .btn-amber{background:var(--amber-500);color:var(--teal-900)}.pm-home .btn-ghost{background:transparent;color:var(--teal-900);border:1.5px solid var(--teal-900)}.pm-home .btn svg{width:18px;height:18px}.pm-home .hero{padding:60px 0 100px;position:relative;overflow:hidden}.pm-home .hero-bg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:0}.pm-home .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 0% 0%,rgba(46,134,126,.25),transparent 45%),linear-gradient(180deg,rgba(247,242,234,.88) 0%,rgba(247,242,234,.82) 60%,rgba(247,242,234,.92) 100%);z-index:1;pointer-events:none}.pm-home .hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:60px;align-items:center;position:relative;z-index:2}.pm-home .hero-eyebrow{display:inline-flex;align-items:center;gap:10px;background:rgba(46,134,126,.1);color:var(--teal-800);padding:8px 18px;border-radius:100px;font-size:13px;font-weight:600;margin-bottom:28px;border:1px solid rgba(46,134,126,.2)}.pm-home .hero-eyebrow .pulse{width:8px;height:8px;border-radius:50%;background:var(--amber-500);position:relative}.pm-home .hero-eyebrow .pulse::before{content:'';position:absolute;inset:-4px;border-radius:50%;background:var(--amber-500);opacity:.7}.pm-home .hero h1{font-size:clamp(42px,5.5vw,76px);font-weight:700;color:var(--teal-900);line-height:1.1;margin-bottom:28px}.pm-home .hero h1 .accent{color:var(--amber-600);font-family:var(--font-serif);font-style:italic;font-weight:400;position:relative;display:inline}.pm-home .hero h1 .accent::after{content:'';position:absolute;bottom:0;right:0;width:100%;height:12px;background:var(--amber-400);z-index:-1;opacity:.5;transform:skewX(-10deg)}.pm-home .hero p{font-size:19px;color:var(--ink-soft);margin-bottom:36px;max-width:520px;line-height:1.7}.pm-home .hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px}.pm-home .hero-stats{display:flex;gap:40px;padding-top:32px;border-top:1px solid var(--line);min-height:88px}.pm-home .hero-stats div strong{display:block;font-family:var(--font-display);font-size:32px;font-weight:700;color:var(--teal-900);line-height:1;margin-bottom:6px}.pm-home .hero-stats div span{font-size:13px;color:var(--ink-soft);font-weight:500}.pm-home .hero-visual{position:relative;height:560px;display:flex;align-items:center;justify-content:center}.pm-home .card-stack{position:relative;width:100%;max-width:440px;aspect-ratio:1.6}.pm-home .medical-card{position:absolute;width:100%;height:100%;border-radius:22px;padding:28px;color:var(--cream);box-shadow:0 40px 80px -30px rgba(11,46,44,.45);display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.pm-home .card-1{background:linear-gradient(135deg,var(--teal-800) 0%,var(--teal-900) 100%);transform:rotate(-6deg) translateX(-30px) translateY(20px);z-index:1;opacity:.92}.pm-home .card-2{background:linear-gradient(135deg,var(--amber-500) 0%,var(--amber-600) 100%);color:var(--teal-900);transform:rotate(4deg) translateX(20px) translateY(-10px);z-index:2}.pm-home .floater{position:absolute;background:var(--cream);padding:14px 18px;border-radius:16px;box-shadow:0 20px 40px -15px rgba(11,46,44,.25);display:flex;align-items:center;gap:12px;font-size:13px;z-index:3;border:1px solid var(--line)}.pm-home .floater-1{top:8%;right:-10%}.pm-home .floater-2{bottom:10%;left:-5%}@media(max-width:968px){.pm-home .nav-menu{display:none}.pm-home .hero-grid{grid-template-columns:1fr;gap:80px}.pm-home .hero-visual{height:440px}.pm-home .hero-stats{gap:24px;flex-wrap:wrap}}@media(max-width:560px){.pm-home .hero h1{font-size:38px;margin-bottom:16px}.pm-home .hero p{margin-bottom:20px}.pm-home .floater-1{right:-5%}.pm-home .floater-2{left:0}.pm-home nav.topnav{padding:8px 0}.pm-home .nav-inner{gap:12px}.pm-home .nav-card-btn{padding:7px 10px;font-size:13px}.pm-home .nav-card-btn-label{display:none}.pm-home .container{padding:0 14px}.pm-home .hero{padding:28px 0 40px}.pm-home .hero-grid{gap:32px}.pm-home .hero-eyebrow{margin-bottom:16px;padding:6px 14px;font-size:12px}.pm-home .hero-visual{height:320px}.pm-home .hero-stats{gap:14px}.pm-home .hero{padding-bottom:76px}}@keyframes pm-pulse{0%{transform:scale(1);opacity:.7}70%{transform:scale(2.5);opacity:0}100%{transform:scale(2.5);opacity:0}}@keyframes pm-float{0%,100%{transform:rotate(4deg) translateX(20px) translateY(-10px)}50%{transform:rotate(4deg) translateX(20px) translateY(-25px)}}@keyframes pm-float-badge{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        </style>

        @php
            $manifestPath = public_path('build/manifest.json');
            $isProduction = file_exists($manifestPath);
            $viteInputs = ['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"];

            array_unshift($viteInputs, 'resources/css/app.css');
        @endphp

        @if ($isProduction)
            @php
                $buildUrl = asset('build');
                $manifest = json_decode(file_get_contents($manifestPath), true);
                $allPreloads = [];
                $allScripts = [];
                $seen = [];

                $resolveImports = function ($chunk) use (&$resolveImports, $manifest, &$seen, $buildUrl, &$allPreloads) {
                    foreach ($chunk['imports'] ?? [] as $import) {
                        if (!isset($manifest[$import])) continue;
                        $file = $manifest[$import]['file'];
                        if (str_ends_with($file, '.css')) continue;
                        $importUrl = "{$buildUrl}/{$file}";
                        if (!isset($seen[$importUrl])) {
                            $seen[$importUrl] = true;
                            $resolveImports($manifest[$import]);
                        }
                    }
                };

                foreach ($viteInputs as $entry) {
                    if (!isset($manifest[$entry])) continue;
                    $chunk = $manifest[$entry];
                    $entryUrl = "{$buildUrl}/{$chunk['file']}";

                    if (!str_ends_with($chunk['file'], '.css')) {
                        // Only modulepreload the app shell, not page-specific chunks
                        if ($entry === 'resources/js/app.tsx') {
                            if (!isset($seen[$entryUrl])) {
                                $seen[$entryUrl] = true;
                                $allPreloads[] = '<link rel="modulepreload" as="script" href="' . $entryUrl . '" />';
                            }
                        }
                        $allScripts[] = '<script type="module" src="' . $entryUrl . '"></script>';
                    }

                    $resolveImports($chunk);
                }

                $cssFile = $manifest['resources/css/app.css']['file'] ?? null;
                if ($cssFile) {
                    echo '<link rel="preload" as="style" href="' . $buildUrl . '/' . $cssFile . '" onload="this.rel=\'stylesheet\'" />';
                    echo "\n        ";
                    echo '<noscript><link rel="stylesheet" href="' . $buildUrl . '/' . $cssFile . '" /></noscript>';
                    echo "\n        ";
                }

                // Preload LCP image for the home page
                echo '<link rel="preload" as="image" href="/images/homepage/1.webp" fetchpriority="high" />';
                echo "\n        ";

                echo implode("\n        ", $allPreloads);
                echo "\n        ";
                echo implode("\n        ", $allScripts);
            @endphp
        @else
            @viteReactRefresh
            @vite($viteInputs)
        @endif
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
