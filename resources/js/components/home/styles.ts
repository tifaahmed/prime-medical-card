export const homeStyles = `
  .pm-home {
    --teal-900: #0b2e2c;
    --teal-800: #12403d;
    --teal-700: #1a544f;
    --teal-600: #236b64;
    --teal-500: #2e867e;
    --teal-300: #7fb3ad;
    --teal-100: #d7e8e5;
    --amber-600: #d68228;
    --amber-500: #e8a84a;
    --amber-400: #f4c373;
    --amber-100: #fbead2;
    --cream: #f7f2ea;
    --cream-dark: #efe7d9;
    --ink: #0a1a19;
    --ink-soft: #3d4948;
    --white: #ffffff;
    --line: rgba(11, 46, 44, 0.12);

    --font-display: 'Reem Kufi', 'Tajawal', system-ui, sans-serif;
    --font-body: 'Tajawal', system-ui, sans-serif;
    --font-serif: 'Amiri', 'Tajawal', serif;

    --radius-sm: 10px;
    --radius-md: 18px;
    --radius-lg: 28px;
    --radius-xl: 40px;

    --ease: cubic-bezier(0.65, 0, 0.35, 1);
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);

    font-family: var(--font-body);
    background: var(--cream);
    color: var(--ink);
    line-height: 1.6;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    position: relative;
    min-height: 100vh;
  }

  .pm-home * { box-sizing: border-box; }
  .pm-home h1, .pm-home h2, .pm-home h3, .pm-home h4 {
    font-family: var(--font-display);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .pm-home p, .pm-home ul, .pm-home ol, .pm-home blockquote, .pm-home figure {
    margin: 0;
    padding: 0;
  }
  .pm-home a { text-decoration: none; color: inherit; }
  .pm-home ul { list-style: none; }

  .pm-home::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.35;
    z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
  }

  .pm-home .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 2;
  }

  .pm-home .announce {
    background: var(--teal-900);
    color: var(--cream);
    text-align: center;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.02em;
    position: relative;
    z-index: 10;
  }
  .pm-home .announce strong { color: var(--amber-400); font-weight: 700; }
  .pm-home .announce .dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--teal-500);
    margin: 0 12px;
    vertical-align: middle;
  }

  .pm-home nav.topnav {
    padding: 10px 0;
    position: sticky;
    top: 0;
    background: rgba(247, 242, 234, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 50;
    border-bottom: 1px solid var(--line);
  }
  .pm-home .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
  .pm-home .logo {
    display: inline-flex;
    align-items: center;
    line-height: 0;
  }
  .pm-home .logo-image {
    height: 40px;
    width: auto;
    max-width: 180px;
    display: block;
    object-fit: contain;
  }
  @media (max-width: 560px) {
    .pm-home .logo-image { height: 32px; max-width: 140px; }
  }

  .pm-home .nav-menu { display: flex; gap: 32px; }
  .pm-home .nav-menu a {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);
    transition: color 0.3s var(--ease);
    position: relative;
  }
  .pm-home .nav-menu a:hover { color: var(--teal-800); }
  .pm-home .nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 0;
    width: 0;
    height: 2px;
    background: var(--amber-500);
    transition: width 0.3s var(--ease);
  }
  .pm-home .nav-menu a:hover::after { width: 100%; }

  .pm-home .nav-actions { display: flex; gap: 12px; align-items: center; }
  .pm-home .nav-cta { display: flex; gap: 12px; align-items: center; }

  .pm-home .nav-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 100px;
    border: 1.5px solid var(--amber-500);
    background: linear-gradient(135deg, var(--amber-400), var(--amber-500));
    color: var(--teal-900);
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.35s var(--ease);
    box-shadow: 0 4px 12px -6px rgba(214, 130, 40, 0.55);
  }
  .pm-home .nav-card-btn svg {
    width: 15px;
    height: 15px;
  }
  .pm-home .nav-cta .btn { padding: 8px 18px; font-size: 13px; }
  .pm-home .nav-cta .btn svg { width: 15px; height: 15px; }
  .pm-home .nav-card-btn:hover {
    background: linear-gradient(135deg, var(--amber-500), var(--amber-600));
    color: var(--cream);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px -8px rgba(214, 130, 40, 0.75);
  }
  .pm-home .nav-card-btn-label { line-height: 1; }

  .pm-home .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.35s var(--ease);
    text-decoration: none;
    white-space: nowrap;
  }
  .pm-home .btn-primary { background: var(--teal-800); color: var(--cream); }
  .pm-home .btn-primary:hover {
    background: var(--teal-900);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -10px rgba(11, 46, 44, 0.4);
  }
  .pm-home .btn-amber { background: var(--amber-500); color: var(--teal-900); }
  .pm-home .btn-amber:hover {
    background: var(--amber-400);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -10px rgba(216, 130, 40, 0.5);
  }
  .pm-home .btn-ghost {
    background: transparent;
    color: var(--teal-900);
    border: 1.5px solid var(--teal-900);
  }
  .pm-home .btn-ghost:hover { background: var(--teal-900); color: var(--cream); }
  .pm-home .btn svg { width: 18px; height: 18px; }

  .pm-home .hero {
    padding: 60px 0 100px;
    position: relative;
    overflow: hidden;
    background-image: url('/images/homepage/1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .pm-home .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 0% 0%, rgba(46, 134, 126, 0.25), transparent 45%),
      linear-gradient(180deg, rgba(247, 242, 234, 0.88) 0%, rgba(247, 242, 234, 0.82) 60%, rgba(247, 242, 234, 0.92) 100%);
    z-index: 0;
    pointer-events: none;
  }
  .pm-home .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .pm-home .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(46, 134, 126, 0.1);
    color: var(--teal-800);
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 28px;
    border: 1px solid rgba(46, 134, 126, 0.2);
  }
  .pm-home .hero-eyebrow .pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--amber-500);
    box-shadow: 0 0 0 0 var(--amber-500);
    animation: pm-pulse 2s infinite;
  }
  @keyframes pm-pulse {
    0% { box-shadow: 0 0 0 0 rgba(232, 168, 74, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(232, 168, 74, 0); }
    100% { box-shadow: 0 0 0 0 rgba(232, 168, 74, 0); }
  }

  .pm-home .hero h1 {
    font-size: clamp(42px, 5.5vw, 76px);
    font-weight: 700;
    color: var(--teal-900);
    line-height: 1.1;
    margin-bottom: 28px;
  }
  .pm-home .hero h1 .accent {
    color: var(--amber-600);
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    position: relative;
  }
  .pm-home .hero h1 .accent::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 12px;
    background: var(--amber-400);
    z-index: -1;
    opacity: 0.5;
    transform: skewX(-10deg);
  }

  .pm-home .hero p {
    font-size: 19px;
    color: var(--ink-soft);
    margin-bottom: 36px;
    max-width: 520px;
    line-height: 1.7;
  }

  .pm-home .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
  .pm-home .hero-stats { display: flex; gap: 40px; padding-top: 32px; border-top: 1px solid var(--line); }
  .pm-home .hero-stats div strong {
    display: block;
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 700;
    color: var(--teal-900);
    line-height: 1;
    margin-bottom: 6px;
  }
  .pm-home .hero-stats div span { font-size: 13px; color: var(--ink-soft); font-weight: 500; }

  .pm-home .hero-visual { position: relative; height: 560px; display: flex; align-items: center; justify-content: center; }
  .pm-home .card-stack { position: relative; width: 100%; max-width: 440px; aspect-ratio: 1.6; }
  .pm-home .medical-card {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    padding: 28px;
    color: var(--cream);
    box-shadow: 0 40px 80px -30px rgba(11, 46, 44, 0.45);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .pm-home .card-1 {
    background: linear-gradient(135deg, var(--teal-800) 0%, var(--teal-900) 100%);
    transform: rotate(-6deg) translateX(-30px) translateY(20px);
    z-index: 1;
    opacity: 0.92;
  }
  .pm-home .card-2 {
    background: linear-gradient(135deg, var(--amber-500) 0%, var(--amber-600) 100%);
    color: var(--teal-900);
    transform: rotate(4deg) translateX(20px) translateY(-10px);
    z-index: 2;
    animation: pm-float 6s ease-in-out infinite;
  }
  @keyframes pm-float {
    0%, 100% { transform: rotate(4deg) translateX(20px) translateY(-10px); }
    50% { transform: rotate(4deg) translateX(20px) translateY(-25px); }
  }
  .pm-home .medical-card::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -20%;
    width: 80%;
    height: 140%;
    background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 60%);
    border-radius: 50%;
    pointer-events: none;
  }
  .pm-home .card-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .pm-home .card-brand { font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
  .pm-home .card-brand small {
    display: block;
    font-size: 10px;
    font-weight: 500;
    opacity: 0.75;
    letter-spacing: 0.2em;
    margin-top: 3px;
  }
  .pm-home .card-chip {
    width: 44px;
    height: 34px;
    border-radius: 6px;
    background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.15));
    border: 1px solid rgba(255,255,255,0.25);
    position: relative;
  }
  .pm-home .card-chip::after {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 3px;
    background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
  }
  .pm-home .card-number {
    font-family: 'Tajawal', monospace;
    font-size: 20px;
    letter-spacing: 0.08em;
    font-weight: 500;
    direction: ltr;
    text-align: left;
  }
  .pm-home .card-footer { display: flex; justify-content: space-between; align-items: flex-end; }
  .pm-home .card-footer small {
    font-size: 9px;
    letter-spacing: 0.2em;
    opacity: 0.7;
    display: block;
    margin-bottom: 4px;
  }
  .pm-home .card-footer strong { font-size: 15px; font-weight: 600; }
  .pm-home .card-logo-mini {
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.15);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pm-home .floater {
    position: absolute;
    background: var(--cream);
    padding: 14px 18px;
    border-radius: 16px;
    box-shadow: 0 20px 40px -15px rgba(11, 46, 44, 0.25);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    z-index: 3;
    border: 1px solid var(--line);
  }
  .pm-home .floater-1 { top: 8%; right: -10%; animation: pm-float-badge 4s ease-in-out infinite; }
  .pm-home .floater-2 { bottom: 10%; left: -5%; animation: pm-float-badge 5s ease-in-out infinite 1s; }
  @keyframes pm-float-badge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .pm-home .floater-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pm-home .floater-1 .floater-icon { background: var(--amber-100); color: var(--amber-600); }
  .pm-home .floater-2 .floater-icon { background: var(--teal-100); color: var(--teal-700); }
  .pm-home .floater-icon svg { width: 20px; height: 20px; }
  .pm-home .floater strong { display: block; font-size: 14px; font-weight: 700; color: var(--teal-900); line-height: 1.2; }
  .pm-home .floater span { font-size: 12px; color: var(--ink-soft); }

  .pm-home .marquee-section {
    padding: 40px 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: rgba(239, 231, 217, 0.4);
  }
  .pm-home .marquee-label {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: var(--ink-soft);
    margin-bottom: 24px;
    text-transform: uppercase;
  }
  .pm-home .marquee {
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  }
  .pm-home .marquee-track { display: flex; gap: 60px; animation: pm-marquee 30s linear infinite; width: fit-content; }
  @keyframes pm-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(50%); }
  }
  .pm-home .partner {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    color: var(--teal-800);
    opacity: 0.6;
    white-space: nowrap;
    transition: opacity 0.3s var(--ease);
  }
  .pm-home .partner:hover { opacity: 1; }

  .pm-home section { padding: 120px 0; position: relative; }
  .pm-home .section-header { max-width: 720px; margin: 0 auto 80px; text-align: center; }
  .pm-home .section-eyebrow {
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--amber-600);
    margin-bottom: 16px;
    text-transform: uppercase;
  }
  .pm-home .section-header h2 { font-size: clamp(32px, 4vw, 52px); color: var(--teal-900); margin-bottom: 20px; line-height: 1.2; }
  .pm-home .section-header h2 em { font-family: var(--font-serif); font-style: italic; color: var(--amber-600); font-weight: 400; }
  .pm-home .section-header p { font-size: 17px; color: var(--ink-soft); line-height: 1.7; }

  .pm-home .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; counter-reset: pm-step-counter; }
  .pm-home .steps::before {
    content: '';
    position: absolute;
    top: 50px;
    right: 16.67%;
    left: 16.67%;
    height: 2px;
    background: repeating-linear-gradient(90deg, var(--teal-300) 0, var(--teal-300) 6px, transparent 6px, transparent 14px);
    z-index: 0;
  }
  .pm-home .step { position: relative; z-index: 2; text-align: center; }
  .pm-home .step-num {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--cream);
    border: 2px solid var(--teal-800);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 28px;
    position: relative;
    transition: all 0.4s var(--ease);
  }
  .pm-home .step:nth-child(2) .step-num { background: var(--teal-800); color: var(--amber-400); }
  .pm-home .step:nth-child(3) .step-num { background: var(--amber-500); border-color: var(--amber-500); }
  .pm-home .step-num svg { width: 38px; height: 38px; color: var(--teal-800); }
  .pm-home .step:nth-child(2) .step-num svg { color: var(--amber-400); }
  .pm-home .step:nth-child(3) .step-num svg { color: var(--teal-900); }
  .pm-home .step-num::after {
    content: counter(pm-step-counter);
    counter-increment: pm-step-counter;
    position: absolute;
    top: -8px;
    left: -8px;
    width: 32px;
    height: 32px;
    background: var(--amber-500);
    color: var(--teal-900);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14px;
  }
  .pm-home .step h3 { font-size: 22px; color: var(--teal-900); margin-bottom: 12px; }
  .pm-home .step p { color: var(--ink-soft); font-size: 15px; max-width: 260px; margin: 0 auto; }
  .pm-home .step:hover .step-num { transform: translateY(-6px); }

  .pm-home .services-section { background: var(--teal-900); color: var(--cream); }
  .pm-home .services-section .section-header h2 { color: var(--cream); }
  .pm-home .services-section .section-header h2 em { color: var(--amber-400); }
  .pm-home .services-section .section-header p { color: rgba(247, 242, 234, 0.7); }
  .pm-home .services-section .section-eyebrow { color: var(--amber-400); }
  .pm-home .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .pm-home .service {
    padding: 32px 28px;
    border-radius: 22px;
    background: rgba(247, 242, 234, 0.04);
    border: 1px solid rgba(247, 242, 234, 0.1);
    transition: all 0.4s var(--ease);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .pm-home .service::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--amber-500), var(--amber-600));
    opacity: 0;
    transition: opacity 0.4s var(--ease);
    z-index: 0;
  }
  .pm-home .service:hover { transform: translateY(-8px); border-color: transparent; }
  .pm-home .service:hover::before { opacity: 1; }
  .pm-home .service:hover * { color: var(--teal-900) !important; }
  .pm-home .service:hover .service-icon { background: var(--teal-900); color: var(--amber-400) !important; }
  .pm-home .service > * { position: relative; z-index: 1; }
  .pm-home .service-icon {
    width: 56px;
    height: 56px;
    background: rgba(232, 168, 74, 0.15);
    color: var(--amber-400);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    transition: all 0.4s var(--ease);
  }
  .pm-home .service-icon svg { width: 28px; height: 28px; }
  .pm-home .service h3 { font-size: 19px; color: var(--cream); margin-bottom: 10px; }
  .pm-home .service p { font-size: 14px; color: rgba(247, 242, 234, 0.7); line-height: 1.6; }
  .pm-home .service-discount {
    display: inline-block;
    margin-top: 14px;
    padding: 4px 12px;
    background: var(--amber-500);
    color: var(--teal-900);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
  }

  .pm-home .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
  .pm-home .pricing-grid.is-dragging,
  .pm-home .services-grid.is-dragging,
  .pm-home .testimonials-grid.is-dragging { cursor: grabbing; scroll-snap-type: none; user-select: none; }
  .pm-home .pricing-grid.is-dragging .plan,
  .pm-home .services-grid.is-dragging .service,
  .pm-home .testimonials-grid.is-dragging .testimonial { pointer-events: none; }
  .pm-home .plan {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 40px 32px;
    position: relative;
    transition: all 0.4s var(--ease);
  }
  .pm-home .plan:hover { transform: translateY(-6px); box-shadow: 0 30px 60px -30px rgba(11, 46, 44, 0.25); }
  .pm-home .plan-featured { background: var(--teal-900); color: var(--cream); border-color: var(--teal-900); transform: scale(1.03); }
  .pm-home .plan-featured:hover { transform: scale(1.03) translateY(-6px); }
  .pm-home .plan-featured .plan-name,
  .pm-home .plan-featured .plan-price,
  .pm-home .plan-featured .plan-currency { color: var(--cream); }
  .pm-home .plan-featured .plan-desc { color: rgba(247, 242, 234, 0.7); }
  .pm-home .plan-featured .plan-features li { color: rgba(247, 242, 234, 0.9); border-color: rgba(247, 242, 234, 0.15); }
  .pm-home .plan-featured .plan-features svg { color: var(--amber-400); }
  .pm-home .plan-badge {
    position: absolute;
    top: -14px;
    right: 32px;
    background: var(--amber-500);
    color: var(--teal-900);
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
  .pm-home .plan-name { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--teal-800); margin-bottom: 8px; }
  .pm-home .plan-desc { font-size: 14px; color: var(--ink-soft); margin-bottom: 28px; min-height: 42px; }
  .pm-home .plan-pricing { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
  .pm-home .plan-price { font-family: var(--font-display); font-size: 52px; font-weight: 700; color: var(--teal-900); line-height: 1; }
  .pm-home .plan-currency { font-size: 18px; color: var(--ink-soft); font-weight: 500; }
  .pm-home .plan-period { font-size: 14px; color: var(--ink-soft); margin-bottom: 32px; }
  .pm-home .plan-features { margin-bottom: 32px; }
  .pm-home .plan-features li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
    font-size: 14.5px;
    color: var(--ink);
  }
  .pm-home .plan-features li:last-child { border-bottom: none; }
  .pm-home .plan-features svg { width: 18px; height: 18px; color: var(--teal-600); flex-shrink: 0; margin-top: 2px; }
  .pm-home .plan .btn { width: 100%; justify-content: center; }

  .pm-home .testimonials-section { background: var(--cream-dark); }
  .pm-home .testimonials-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 24px; }
  .pm-home .testimonial {
    background: var(--cream);
    padding: 36px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--line);
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .pm-home .testimonial-big { background: var(--teal-800); color: var(--cream); border-color: var(--teal-800); }
  .pm-home .testimonial-big blockquote { color: var(--cream) !important; }
  .pm-home .testimonial-big .t-name { color: var(--cream) !important; }
  .pm-home .testimonial-big .t-role { color: rgba(247, 242, 234, 0.6) !important; }
  .pm-home .quote-mark {
    font-family: var(--font-serif);
    font-size: 80px;
    line-height: 0.5;
    color: var(--amber-500);
    margin-bottom: 20px;
    display: block;
  }
  .pm-home .testimonial blockquote {
    font-size: 17px;
    line-height: 1.7;
    color: var(--ink);
    margin-bottom: 24px;
    font-weight: 400;
    flex: 1;
  }
  .pm-home .testimonial-big blockquote { font-size: 20px; font-family: var(--font-serif); font-style: italic; line-height: 1.6; }
  .pm-home .t-author { display: flex; align-items: center; gap: 14px; padding-top: 20px; border-top: 1px solid var(--line); }
  .pm-home .testimonial-big .t-author { border-color: rgba(247, 242, 234, 0.15); }
  .pm-home .t-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--amber-500);
    color: var(--teal-900);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }
  .pm-home .testimonial-big .t-avatar { background: var(--amber-400); }
  .pm-home .t-name { font-weight: 700; color: var(--teal-900); font-size: 15px; }
  .pm-home .t-role { font-size: 13px; color: var(--ink-soft); }

  .pm-home .faq-wrap { max-width: 820px; margin: 0 auto; }
  .pm-home .faq-item { border-bottom: 1px solid var(--line); overflow: hidden; }
  .pm-home .faq-item summary {
    padding: 28px 0;
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 500;
    color: var(--teal-900);
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    transition: color 0.3s var(--ease);
  }
  .pm-home .faq-item summary::-webkit-details-marker { display: none; }
  .pm-home .faq-item summary::after {
    content: '+';
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--cream-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 400;
    color: var(--teal-800);
    transition: all 0.4s var(--ease);
    flex-shrink: 0;
  }
  .pm-home .faq-item[open] summary { color: var(--amber-600); }
  .pm-home .faq-item[open] summary::after { transform: rotate(45deg); background: var(--amber-500); color: var(--teal-900); }
  .pm-home .faq-item .faq-body { padding: 0 0 28px; color: var(--ink-soft); font-size: 15.5px; line-height: 1.75; max-width: 680px; }

  .pm-home .cta-banner { padding: 80px 0; }
  .pm-home .cta-inner {
    background: var(--teal-900);
    border-radius: var(--radius-xl);
    padding: 80px 60px;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
    align-items: center;
  }
  .pm-home .cta-inner::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(232, 168, 74, 0.25), transparent 70%);
    border-radius: 50%;
  }
  .pm-home .cta-inner h2 { font-size: clamp(32px, 4vw, 52px); color: var(--cream); line-height: 1.15; margin-bottom: 20px; position: relative; }
  .pm-home .cta-inner h2 em { font-family: var(--font-serif); font-style: italic; color: var(--amber-400); font-weight: 400; }
  .pm-home .cta-inner p { font-size: 17px; color: rgba(247, 242, 234, 0.8); margin-bottom: 32px; position: relative; }
  .pm-home .cta-actions { display: flex; gap: 14px; flex-wrap: wrap; position: relative; }
  .pm-home .cta-phone { position: relative; text-align: center; }
  .pm-home .cta-phone-num { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--amber-400); direction: ltr; letter-spacing: 0.02em; }
  .pm-home .cta-phone-label { font-size: 14px; color: rgba(247, 242, 234, 0.7); margin-top: 6px; }

  .pm-home footer.site-footer { background: var(--teal-900); color: rgba(247, 242, 234, 0.7); padding: 80px 0 30px; position: relative; }
  .pm-home footer.site-footer::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    background: rgba(247, 242, 234, 0.1);
  }
  .pm-home .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 60px; margin-bottom: 60px; }
  .pm-home .footer-brand p { margin: 20px 0; font-size: 14.5px; line-height: 1.75; max-width: 340px; }
  .pm-home .footer-brand .logo { color: var(--cream); }
  .pm-home .footer-brand .logo-mark { background: var(--amber-500); }
  .pm-home .footer-brand .logo-mark svg { color: var(--teal-900); }
  .pm-home .footer-social { display: flex; gap: 12px; margin-top: 24px; }
  .pm-home .footer-social a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(247, 242, 234, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s var(--ease);
  }
  .pm-home .footer-social a:hover { background: var(--amber-500); color: var(--teal-900); transform: translateY(-3px); }
  .pm-home .footer-social svg { width: 18px; height: 18px; }
  .pm-home .footer-col h4 { color: var(--cream); font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; font-weight: 600; }
  .pm-home .footer-col ul { display: flex; flex-direction: column; gap: 14px; }
  .pm-home .footer-col a { font-size: 14.5px; transition: color 0.3s var(--ease); }
  .pm-home .footer-col a:hover { color: var(--amber-400); }
  .pm-home .footer-bottom { padding-top: 30px; border-top: 1px solid rgba(247, 242, 234, 0.08); display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; font-size: 13px; }

  .pm-home .mobile-bottom-nav {
    display: none;
    position: fixed;
    bottom: calc(10px + env(safe-area-inset-bottom, 0px));
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 24px);
    max-width: 380px;
    background: rgba(247, 242, 234, 0.78);
    backdrop-filter: saturate(180%) blur(18px);
    -webkit-backdrop-filter: saturate(180%) blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 16px;
    padding: 3px;
    z-index: 40;
    box-shadow: 0 10px 28px -12px rgba(11, 46, 44, 0.26), 0 2px 6px rgba(11, 46, 44, 0.05);
  }
  .pm-home .mobile-nav-inner { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; position: relative; }
  .pm-home .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    padding: 4px 2px;
    border-radius: 12px;
    transition: background 0.35s var(--ease-out), transform 0.25s var(--ease);
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }
  .pm-home .mobile-nav-icon {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-soft);
    transform: translateY(-1px);
    transition: color 0.35s var(--ease-out), transform 0.35s var(--ease-out);
  }
  .pm-home .mobile-nav-icon svg { width: 18px; height: 18px; stroke-width: 2; }
  .pm-home .mobile-nav-item span {
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--ink-soft);
    transition: color 0.35s var(--ease-out);
  }
  .pm-home .mobile-nav-item.active {
    background: linear-gradient(180deg, var(--teal-800), var(--teal-900));
    box-shadow: 0 6px 14px -8px rgba(11, 46, 44, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  .pm-home .mobile-nav-item.active .mobile-nav-icon { color: var(--amber-400); transform: translateY(-1px); }
  .pm-home .mobile-nav-item.active span { color: var(--cream); }
  .pm-home .mobile-nav-item:active { transform: scale(0.94); }

  @media (max-width: 968px) {
    .pm-home .nav-menu { display: none; }
    .pm-home .hero-grid { grid-template-columns: 1fr; gap: 80px; }
    .pm-home .hero-visual { height: 440px; }
    .pm-home .hero-stats { gap: 24px; flex-wrap: wrap; }
    .pm-home .steps { grid-template-columns: 1fr; gap: 48px; }
    .pm-home .steps::before { display: none; }
    .pm-home .services-grid { grid-template-columns: repeat(2, 1fr); }
    .pm-home .pricing-grid { grid-template-columns: 1fr; }
    .pm-home .plan-featured { transform: none; }
    .pm-home .plan-featured:hover { transform: translateY(-6px); }
    .pm-home .testimonials-grid { grid-template-columns: 1fr; }
    .pm-home .cta-inner { grid-template-columns: 1fr; text-align: center; padding: 50px 30px; }
    .pm-home .cta-actions { justify-content: center; }
    .pm-home .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    .pm-home section { padding: 80px 0; }
    .pm-home .container { padding: 0 20px; }
  }

  @media (max-width: 560px) {
    .pm-home .services-grid {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(2, auto);
      grid-auto-columns: minmax(62%, 1fr);
      grid-template-columns: none;
      gap: 10px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 8px 14px 12px;
      margin: 0 -14px;
      scroll-padding-inline: 14px;
      cursor: grab;
    }
    .pm-home .services-grid::-webkit-scrollbar { display: none; }
    .pm-home .services-grid .service { scroll-snap-align: start; }
    .pm-home .service { padding: 18px 14px; border-radius: 16px; }
    .pm-home .service-icon { width: 40px; height: 40px; border-radius: 10px; margin-bottom: 12px; }
    .pm-home .service-icon svg { width: 20px; height: 20px; }
    .pm-home .service h3 { font-size: 15px; margin-bottom: 6px; }
    .pm-home .service p { font-size: 12px; line-height: 1.5; }
    .pm-home .service-discount { margin-top: 10px; font-size: 11px; padding: 3px 10px; }
    .pm-home .footer-grid { grid-template-columns: 1fr; gap: 24px; }
    .pm-home .hero h1 { font-size: 38px; margin-bottom: 16px; }
    .pm-home .hero p { margin-bottom: 20px; }
    .pm-home .floater-1 { right: -5%; }
    .pm-home .floater-2 { left: 0; }
    .pm-home .mobile-bottom-nav { display: block; }
    .pm-home .nav-cta { display: none; }
    .pm-home nav.topnav { padding: 8px 0; }
    .pm-home .nav-inner { gap: 12px; }
    .pm-home .logo-image { height: 36px; max-width: 140px; }
    .pm-home .nav-card-btn { padding: 7px 10px; font-size: 13px; gap: 6px; }
    .pm-home .nav-card-btn svg { width: 16px; height: 16px; }
    .pm-home .nav-card-btn-label { display: none; }
    .pm-home { padding-bottom: 76px; }

    .pm-home .container { padding: 0 14px; }
    .pm-home section { padding: 36px 0; }
    .pm-home .section-header { margin: 0 auto 28px; }
    .pm-home .section-header h2 { margin-bottom: 10px; }
    .pm-home .section-header p { font-size: 15px; }
    .pm-home .section-eyebrow { margin-bottom: 10px; font-size: 12px; }
    .pm-home .hero { padding: 28px 0 40px; }
    .pm-home .hero-grid { gap: 32px; }
    .pm-home .hero-eyebrow { margin-bottom: 16px; padding: 6px 14px; font-size: 12px; }
    .pm-home .hero-visual { height: 320px; }
    .pm-home .hero-stats { gap: 14px; }
    .pm-home .steps { gap: 20px; }
    .pm-home .pricing-grid {
      display: flex;
      grid-template-columns: none;
      gap: 14px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 8px 14px 16px;
      margin: 0 -14px;
      scroll-padding-inline: 14px;
      cursor: grab;
    }
    .pm-home .pricing-grid::-webkit-scrollbar { display: none; }
    .pm-home .pricing-grid .plan {
      flex: 0 0 85%;
      min-width: 85%;
      scroll-snap-align: center;
      padding: 28px 22px;
    }
    .pm-home .pricing-grid .plan-featured { transform: none; }
    .pm-home .pricing-grid .plan-featured:hover { transform: translateY(-6px); }
    .pm-home .testimonials-grid {
      display: flex;
      grid-template-columns: none;
      gap: 12px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 8px 14px 12px;
      margin: 0 -14px;
      scroll-padding-inline: 14px;
      cursor: grab;
    }
    .pm-home .testimonials-grid::-webkit-scrollbar { display: none; }
    .pm-home .testimonials-grid .testimonial {
      flex: 0 0 calc(50% - 6px);
      min-width: calc(50% - 6px);
      scroll-snap-align: start;
      padding: 20px 16px;
    }
    .pm-home .testimonials-grid .testimonial blockquote,
    .pm-home .testimonials-grid .testimonial-big blockquote {
      font-size: 13px;
      font-style: normal;
      font-family: var(--font-body);
    }
    .pm-home .testimonials-grid .quote-mark { font-size: 48px; }
    .pm-home .testimonials-grid .t-avatar { width: 36px; height: 36px; font-size: 13px; }
    .pm-home .testimonials-grid .t-name { font-size: 13px; }
    .pm-home .testimonials-grid .t-role { font-size: 11px; }
    .pm-home .testimonials-grid .t-author { gap: 10px; padding-top: 12px; }
    .pm-home .cta-banner { padding: 36px 0; }
    .pm-home .cta-inner { padding: 28px 18px; gap: 20px; }
    .pm-home footer.site-footer { padding: 36px 0 20px; }
    .pm-home .footer-bottom { padding-top: 18px; gap: 10px; }

    .pm-home .faq-item summary {
      padding: 12px 0;
      font-size: 14px;
      gap: 10px;
      line-height: 1.4;
    }
    .pm-home .faq-item summary::after {
      width: 24px;
      height: 24px;
      font-size: 16px;
    }
    .pm-home .faq-item .faq-body {
      padding: 0 0 12px;
      font-size: 13px;
      line-height: 1.6;
    }

    .pm-home .hero,
    .pm-home section,
    .pm-home .cta-banner {
      min-height: 100svh;
      display: flex;
      align-items: center;
    }
    .pm-home .hero > .container,
    .pm-home section > .container,
    .pm-home .cta-banner > .container { width: 100%; }
  }

  .pm-home .card-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(11, 46, 44, 0.62);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    animation: pm-fade-in 0.25s var(--ease-out);
  }
  .pm-home .card-modal {
    position: relative;
    width: 100%;
    max-width: 460px;
    background: var(--cream);
    border-radius: var(--radius-lg);
    padding: 40px 32px 32px;
    box-shadow:
      0 30px 80px -20px rgba(11, 46, 44, 0.55),
      0 0 0 1px rgba(214, 130, 40, 0.18);
    text-align: center;
    animation: pm-pop-in 0.3s var(--ease-out);
    overflow: hidden;
  }
  .pm-home .card-modal::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(120% 80% at 100% 0%, rgba(244, 195, 115, 0.35), transparent 60%),
      radial-gradient(120% 80% at 0% 100%, rgba(45, 134, 126, 0.18), transparent 55%);
    z-index: 0;
  }
  .pm-home .card-modal > * { position: relative; z-index: 1; }
  .pm-home .card-modal-close {
    position: absolute;
    top: 14px;
    left: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: rgba(11, 46, 44, 0.08);
    color: var(--teal-900);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s var(--ease);
    z-index: 2;
  }
  .pm-home .card-modal-close svg { width: 16px; height: 16px; }
  .pm-home .card-modal-close:hover { background: rgba(11, 46, 44, 0.15); }
  .pm-home .card-modal-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 20px;
    background: linear-gradient(135deg, var(--amber-400), var(--amber-600));
    color: var(--teal-900);
    margin-bottom: 18px;
    box-shadow: 0 12px 28px -12px rgba(214, 130, 40, 0.7);
  }
  .pm-home .card-modal-icon svg { width: 30px; height: 30px; }
  .pm-home .card-modal-title {
    font-family: var(--font-display);
    font-size: 26px;
    color: var(--teal-900);
    margin-bottom: 8px;
  }
  .pm-home .card-modal-subtitle {
    color: var(--ink-soft);
    font-size: 14px;
    margin-bottom: 24px;
    line-height: 1.6;
  }
  .pm-home .card-modal-form {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pm-home .card-modal-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--teal-800);
  }
  .pm-home .card-modal-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .pm-home .card-modal-input {
    width: 100%;
    padding: 14px 48px 14px 16px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--line);
    background: var(--white);
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--ink);
    transition: all 0.25s var(--ease);
    text-align: left;
  }
  .pm-home .card-modal-input::placeholder {
    color: rgba(61, 73, 72, 0.4);
    letter-spacing: 0.08em;
  }
  .pm-home .card-modal-input:focus {
    outline: none;
    border-color: var(--amber-500);
    box-shadow: 0 0 0 4px rgba(232, 168, 74, 0.18);
  }
  .pm-home .card-modal-input-icon {
    position: absolute;
    right: 16px;
    width: 22px;
    height: 22px;
    color: var(--amber-600);
    pointer-events: none;
  }
  .pm-home .card-modal-error {
    margin-top: 4px;
    color: #c84040;
    font-size: 13px;
    font-weight: 500;
  }
  .pm-home .card-modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: flex-end;
  }
  .pm-home .card-modal-cancel {
    background: transparent;
    color: var(--ink-soft);
    border: 1.5px solid var(--line);
  }
  .pm-home .card-modal-cancel:hover {
    background: rgba(11, 46, 44, 0.05);
    color: var(--teal-900);
  }
  .pm-home .card-modal-submit { min-width: 140px; justify-content: center; }
  .pm-home .card-modal-submit svg { width: 16px; height: 16px; }

  @keyframes pm-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pm-pop-in {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 480px) {
    .pm-home .card-modal { padding: 36px 22px 24px; border-radius: var(--radius-md); }
    .pm-home .card-modal-title { font-size: 22px; }
    .pm-home .card-modal-icon { width: 56px; height: 56px; border-radius: 16px; margin-bottom: 14px; }
    .pm-home .card-modal-icon svg { width: 26px; height: 26px; }
    .pm-home .card-modal-actions { flex-direction: column-reverse; gap: 8px; }
    .pm-home .card-modal-cancel,
    .pm-home .card-modal-submit { width: 100%; justify-content: center; }
  }
`;
