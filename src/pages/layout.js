/**
 * HTML Layout Template
 * Provides common layout structure for all pages
 * Modern glassmorphism design with bento grid layouts
 */

export function createLayout(title, content, additionalScripts = '', metaDescription = 'B2B Product Exhibition - High-quality industrial products and solutions', useTitleSuffix = true) {
  const pageTitle = useTitleSuffix ? `${title} - B2B Product Exhibition` : title;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metaDescription}">
  <title>${pageTitle}</title>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%230369A1'/><stop offset='100%' style='stop-color:%230ea5e9'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23g)'/><text x='50' y='65' font-size='55' text-anchor='middle' fill='white' font-family='Arial'>B2B</text></svg>">

  <!-- Preconnect for fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    /* Memphis Design Styles - 80s Geometric Playful */

    :root {
      /* Memphis Design Color Palette */
      --primary: #FF71CE;
      --primary-dark: #FF1493;
      --secondary: #FFCE5C;
      --accent: #86CCCA;
      --purple: #6A7BB4;
      --success: #10b981;

      /* Backgrounds */
      --background: #FFF9F0;
      --surface: #FFFFFF;
      --text-primary: #1A1A2E;
      --text-secondary: #4A4A6A;
      --text-muted: #8B8B9A;
      --border: #FF71CE;
      --border-light: #FFE5F0;

      /* Spacing */
      --spacing-xs: 0.5rem;
      --spacing-sm: 1rem;
      --spacing-md: 1.5rem;
      --spacing-lg: 2rem;
      --spacing-xl: 3rem;
      --spacing-2xl: 4rem;

      /* Border Radius - Sharp for Memphis */
      --radius-sm: 0;
      --radius-md: 0;
      --radius-lg: 0;
      --radius-xl: 0;
      --radius-2xl: 0;

      /* Transitions */
      --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      --transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
      --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

      /* Memphis Shadows - Hard Edges */
      --shadow-sm: 4px 4px 0 var(--border);
      --shadow-md: 6px 6px 0 var(--primary);
      --shadow-lg: 8px 8px 0 var(--purple);
      --shadow-hover: 10px 10px 0 var(--secondary);
    }

    /* Dark mode support - Neon Memphis */
    @media (prefers-color-scheme: dark) {
      :root {
        --background: #0F0F1A;
        --surface: #1A1A2E;
        --text-primary: #F0F0F5;
        --text-secondary: #D0D0E0;
        --text-muted: #8B8B9A;
        --border: #FF71CE;
        --border-light: #2D2D4A;
      }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.7;
      color: var(--text-primary);
      background: var(--background);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 16px;
    }

    /* Memphis Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Righteous', cursive;
      font-weight: 400;
      letter-spacing: 0.02em;
    }

    .hero-title {
      font-family: 'Righteous', cursive;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Improved text rendering */
    p, span, div {
      text-rendering: optimizeLegibility;
    }

    /* Navigation - Memphis Style with Hard Shadows */
    .navbar {
      background: var(--surface);
      border-bottom: 3px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: var(--shadow-sm);
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'Righteous', cursive;
      font-size: 1.75rem;
      font-weight: 400;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-shadow: 3px 3px 0 var(--secondary);
    }

    .nav-menu {
      display: flex;
      list-style: none;
      gap: 2rem;
      align-items: center;
    }

    .nav-link {
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.9375rem;
      transition: all var(--transition-normal);
      position: relative;
      padding: 0.5rem 1rem;
      border: 2px solid transparent;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--primary);
      background: var(--border-light);
      border-color: var(--border);
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-sm);
    }

    .nav-link:focus-visible {
      outline: 3px solid var(--secondary);
      outline-offset: 2px;
    }

    /* Mobile Menu Toggle */
    .menu-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: var(--text-dark);
      margin: 3px 0;
      transition: 0.3s;
    }

    /* Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Memphis Card - Hard Shadows */
    .glass-card {
      background: var(--surface);
      border: 3px solid var(--border);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }

    .glass-card:hover {
      transform: translate(-4px, -4px);
      box-shadow: var(--shadow-hover);
      border-color: var(--primary);
    }

    /* Buttons - Memphis Style with Hard Shadows */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      border: 3px solid transparent;
      font-size: 0.9375rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all var(--transition-normal);
      white-space: nowrap;
      position: relative;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .btn:focus-visible {
      outline: 3px solid var(--secondary);
      outline-offset: 3px;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
    }

    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 var(--purple);
    }

    .btn-primary:active {
      transform: translate(-1px, -1px);
      box-shadow: var(--shadow-sm);
    }

    .btn-secondary {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
      box-shadow: var(--shadow-md);
    }

    .btn-secondary:hover {
      background: #6bb9b7;
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 var(--primary);
    }

    .btn-glass {
      background: var(--secondary);
      color: var(--text-primary);
      border-color: var(--secondary);
      box-shadow: var(--shadow-md);
    }

    .btn-glass:hover {
      background: #ffd93a;
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 var(--accent);
    }

    .btn-large {
      padding: 1.125rem 2.5rem;
      font-size: 1rem;
      letter-spacing: 0.05em;
    }

    /* Card focus states */
    .card:focus-visible,
    .glass-card:focus-visible,
    .product-card:focus-visible {
      outline: 3px solid var(--secondary);
      outline-offset: 2px;
    }

    /* Cards - Memphis Style */
    .card {
      background: var(--surface);
      border: 3px solid var(--border);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      transition: all var(--transition-normal);
    }

    .card:hover {
      transform: translate(-4px, -4px);
      box-shadow: var(--shadow-hover);
    }

    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .card-description {
      color: var(--text-secondary);
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    /* Grid Layout */
    .grid {
      display: grid;
      gap: 2rem;
    }

    .grid-2 {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      max-width: 100%;
    }

    .grid-3 {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      max-width: 100%;
    }

    /* ========== MODERN HOME PAGE STYLES ========== */

    /* Hero Section - Compact Memphis Style */
    .hero-section {
      position: relative;
      min-height: 55vh;
      display: flex;
      align-items: center;
      padding: 4rem 0 3rem;
      overflow: hidden;
      background: linear-gradient(135deg, var(--primary) 0%, var(--purple) 50%, var(--accent) 100%);
    }

    /* Memphis Geometric Shapes */
    .hero-section::before {
      content: '';
      position: absolute;
      top: 10%;
      right: 10%;
      width: 100px;
      height: 100px;
      background: var(--secondary);
      transform: rotate(45deg);
      box-shadow: var(--shadow-lg);
      opacity: 0.8;
      animation: float 6s ease-in-out infinite;
    }

    .hero-section::after {
      content: '';
      position: absolute;
      bottom: 20%;
      left: 8%;
      width: 0;
      height: 0;
      border-left: 60px solid transparent;
      border-right: 60px solid transparent;
      border-bottom: 100px solid var(--secondary);
      transform: rotate(-15deg);
      box-shadow: var(--shadow-md);
      animation: float 8s ease-in-out infinite reverse;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(45deg); }
      50% { transform: translateY(-20px) rotate(50deg); }
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 35px,
          rgba(255, 255, 255, 0.05) 35px,
          rgba(255, 255, 255, 0.05) 70px
        );
      z-index: 0;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      color: white;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.25rem;
      background: var(--secondary);
      border: 3px solid white;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: var(--shadow-md);
      transform: rotate(-2deg);
    }

    .hero-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 400;
      line-height: 1.2;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
      text-shadow: 4px 4px 0 var(--secondary);
      color: white;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 1.8vw, 1.125rem);
      color: rgba(255, 255, 255, 0.95);
      max-width: 650px;
      margin: 0 auto 2rem;
      line-height: 1.6;
      font-weight: 500;
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
    }

    .hero-cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }

    /* Stats Grid - Memphis Style */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .stat-card {
      padding: 1.5rem;
      text-align: center;
      background: white;
      border: 3px solid var(--border);
      box-shadow: var(--shadow-md);
      color: var(--text-primary);
      transition: all var(--transition-normal);
    }

    .stat-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: var(--shadow-hover);
      border-color: var(--secondary);
    }

    .stat-number {
      font-family: 'Righteous', cursive;
      font-size: 2.5rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
      color: var(--primary);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Section Styles */
    .section-intro,
    .section-features,
    .section-products,
    .section-cta-bottom {
      padding: 6rem 0;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-tag {
      display: inline-block;
      padding: 0.5rem 1.25rem;
      background: var(--secondary);
      border: 3px solid var(--border);
      color: var(--text-primary);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      box-shadow: var(--shadow-sm);
      transform: rotate(-1deg);
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      font-weight: 400;
      color: var(--text-primary);
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .section-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
      font-weight: 500;
    }

    /* Intro Section */
    .intro-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .intro-text {
      max-width: 600px;
    }

    .intro-description {
      font-size: 1.0625rem;
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 2rem;
      max-width: 65ch;
    }

    .intro-highlights {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .check-icon {
      flex-shrink: 0;
      color: var(--success);
    }

    .intro-visual {
      display: flex;
      justify-content: center;
    }

    .visual-card {
      padding: 2.5rem;
      max-width: 350px;
    }

    .visual-icon {
      color: var(--primary);
      margin-bottom: 1.5rem;
    }

    .visual-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .visual-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    /* Bento Grid */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-auto-rows: minmax(200px, auto);
      gap: 1.5rem;
    }

    .bento-card {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .bento-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(3, 105, 161, 0.05) 0%, transparent 100%);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }

    .bento-card:hover::before {
      opacity: 1;
    }

    .bento-large {
      grid-column: span 8;
      grid-row: span 2;
    }

    .bento-medium {
      grid-column: span 6;
    }

    .bento-small {
      grid-column: span 6;
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--primary);
      border: 3px solid var(--border);
      color: white;
      margin-bottom: 0.5rem;
      box-shadow: var(--shadow-sm);
    }

    .feature-title {
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .feature-description {
      color: var(--text-secondary);
      line-height: 1.6;
      font-weight: 500;
    }

    .feature-meta {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 3px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .feature-stat {
      font-family: 'Righteous', cursive;
      font-size: 2rem;
      font-weight: 400;
      color: var(--primary);
    }

    .feature-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Products Grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    /* Enhanced Products Grid - Featured Section */
    .products-grid-enhanced {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 2.5rem;
      margin-bottom: 2rem;
    }

    .section-products-featured {
      padding: 5rem 0;
      background: linear-gradient(180deg, var(--background) 0%, #f1f5f9 100%);
      position: relative;
    }

    .section-products-featured::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(circle at 10% 20%, rgba(3, 105, 161, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .product-card {
      overflow: hidden;
      transition: all var(--transition-normal);
      cursor: pointer;
      background: var(--surface);
      border: 3px solid var(--border);
      box-shadow: var(--shadow-md);
    }

    .product-card:hover {
      transform: translate(-6px, -6px);
      box-shadow: 10px 10px 0 var(--secondary);
      border-color: var(--primary);
    }

    .product-image-wrapper {
      position: relative;
      overflow: hidden;
      aspect-ratio: 16 / 10;
      background: var(--border-light);
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }

    .product-card:hover .product-image {
      transform: scale(1.05);
    }

    .product-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      background: var(--secondary);
      border-top: 3px solid var(--border);
      transform: translateY(100%);
      transition: transform var(--transition-normal);
      display: flex;
      justify-content: center;
      opacity: 0;
    }

    .product-card:hover .product-overlay {
      transform: translateY(0);
      opacity: 1;
    }

    .product-content {
      padding: 1.5rem;
      background: var(--surface);
    }

    .product-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .product-description {
      color: var(--text-secondary);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .section-cta {
      text-align: center;
      padding-top: 2rem;
    }

    /* CTA Section - Memphis Style */
    .cta-card {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 3rem;
      align-items: center;
      padding: 3rem;
      background: linear-gradient(135deg, var(--primary) 0%, var(--purple) 100%);
      border: 3px solid var(--border);
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
    }

    /* Memphis decorative shapes */
    .cta-card::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 150px;
      height: 150px;
      background: var(--secondary);
      transform: rotate(45deg);
      opacity: 0.5;
    }

    .cta-title {
      font-size: 2.5rem;
      font-weight: 400;
      color: white;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-shadow: 4px 4px 0 var(--secondary);
    }

    .cta-description {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 2rem;
      line-height: 1.6;
      font-weight: 500;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .cta-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0.3;
    }

    /* Utility Classes */
    .no-products,
    .error-message {
      text-align: center;
      color: var(--text-secondary);
      padding: 3rem;
      grid-column: 1 / -1;
    }

    /* Loading Spinner */
    .spinner {
      border: 3px solid var(--border-light);
      border-top: 3px solid var(--primary);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 2rem auto;
      grid-column: 1 / -1;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* ========== RESPONSIVE DESIGN ========== */

    @media (max-width: 1024px) {
      .bento-large {
        grid-column: span 12;
      }

      .bento-medium {
        grid-column: span 6;
      }

      .bento-small {
        grid-column: span 6;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 4rem 0 2rem;
        min-height: auto;
      }

      .hero-title {
        font-size: 2rem;
        letter-spacing: -0.02em;
      }

      .hero-subtitle {
        font-size: 1rem;
        line-height: 1.6;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .stat-number {
        font-size: 2rem;
      }

      .intro-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .visual-card {
        max-width: 100%;
      }

      .bento-grid {
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
      }

      .bento-large,
      .bento-medium,
      .bento-small {
        grid-column: span 1;
        grid-row: span 1;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }

      .cta-card {
        grid-template-columns: 1fr;
        padding: 2rem;
        text-align: center;
      }

      .cta-visual {
        display: none;
      }

      .cta-actions {
        justify-content: center;
        flex-direction: column;
      }

      .cta-actions .btn {
        width: 100%;
      }

      .section-intro,
      .section-features,
      .section-products,
      .section-cta-bottom {
        padding: 3rem 0;
      }

      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: var(--surface);
        width: 100%;
        text-align: center;
        transition: var(--transition-slow);
        box-shadow: 0 10px 27px rgba(0,0,0,0.1);
        padding: 2rem 0;
        border-top: 1px solid var(--border);
        z-index: 999;
      }

      .nav-menu.active {
        left: 0;
      }

      .menu-toggle {
        display: flex;
      }

      /* Improved touch targets for mobile */
      .btn,
      .nav-link,
      .card,
      .product-card {
        -webkit-tap-highlight-color: transparent;
      }

      /* Better mobile tap spacing */
      .nav-link {
        padding: 0.75rem 1rem;
      }

      /* Optimize images for mobile */
      .product-image,
      .card-image {
        image-rendering: -webkit-optimize-contrast;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0 1rem;
      }

      .hero-cta-group {
        flex-direction: column;
      }

      .hero-cta-group .btn {
        width: 100%;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .bento-card {
        padding: 1.5rem;
      }

      .feature-title {
        font-size: 1.25rem;
      }
    }

    /* Accessibility: Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Page Loading Animation */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Animate elements on page load */
    .hero-badge {
      animation: fadeInUp 0.8s ease-out;
    }

    .hero-title {
      animation: fadeInUp 0.8s ease-out 0.1s both;
    }

    .hero-subtitle {
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .hero-cta-group {
      animation: fadeInUp 0.8s ease-out 0.3s both;
    }

    .stat-card {
      animation: scaleIn 0.6s ease-out 0.4s both;
    }

    .stat-card:nth-child(1) { animation-delay: 0.4s; }
    .stat-card:nth-child(2) { animation-delay: 0.5s; }
    .stat-card:nth-child(3) { animation-delay: 0.6s; }
    .stat-card:nth-child(4) { animation-delay: 0.7s; }

    /* Section animations */
    .section-tag {
      animation: fadeInUp 0.6s ease-out;
    }

    .section-title {
      animation: fadeInUp 0.6s ease-out 0.1s both;
    }

    /* Smooth scroll behavior improvements */
    html {
      scroll-behavior: smooth;
    }

    /* Selection styling */
    ::selection {
      background: var(--primary);
      color: white;
    }

    ::-moz-selection {
      background: var(--primary);
      color: white;
    }

    /* Improved scrollbar for webkit browsers */
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: var(--background);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--text-muted);
    }

    /* Form Styles */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.375rem;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    /* Footer */
    .footer {
      background: var(--text-dark);
      color: white;
      padding: 3rem 2rem 1rem;
      margin-top: 4rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section h3 {
      margin-bottom: 1rem;
      color: var(--accent-color);
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-section a:hover {
      color: white;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      margin-top: 2rem;
      border-top: 1px solid #374151;
      color: #9ca3af;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0,0,0,0.1);
        padding: 2rem 0;
      }

      .nav-menu.active {
        left: 0;
      }

      .menu-toggle {
        display: flex;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .grid-2,
      .grid-3 {
        grid-template-columns: 1fr;
      }
    }

    /* Loading Spinner */
    .spinner {
      border: 3px solid #f3f4f6;
      border-top: 3px solid var(--primary-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 2rem auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  ${createNavbar()}

  <main>
    ${content}
  </main>

  ${createFooter()}

  <script>
    /**
     * Main JavaScript file for B2B Website
     * Handles common functionality across all pages
     */

    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navMenu = document.querySelector('.nav-menu');

      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
          if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
          }
        });
      }

      // Set active nav link based on current page
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        }
      });
    });

    // API helper functions
    const API = {
      baseURL: '/api',

      async get(endpoint) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },

      async post(endpoint, data) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },

      async put(endpoint, data) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },

      async delete(endpoint) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },
    };

    // Form validation helper
    function validateEmail(email) {
      const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    // Show notification
    function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = \`notification notification-\${type}\`;
      notification.textContent = message;
      notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: \${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
      \`;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    \`;
    document.head.appendChild(style);

    // Load and apply website settings
    async function loadWebsiteSettings() {
      try {
        const response = await API.get('/settings');
        if (response.success) {
          const settings = response.data;

          // Update logo/site name
          const logo = document.querySelector('.logo');
          if (logo && settings.site_name) {
            logo.textContent = settings.site_name;
          }

          // Update footer About Us section
          const aboutSection = document.querySelector('.footer-section p');
          if (aboutSection && settings.site_description) {
            aboutSection.textContent = settings.site_description;
          }

          // Update footer Contact Info
          const contactItems = document.querySelectorAll('.footer-section:nth-child(3) ul li');
          if (contactItems.length >= 3) {
            if (settings.email) contactItems[0].textContent = \`Email: \${settings.email}\`;
            if (settings.phone) contactItems[1].textContent = \`Phone: \${settings.phone}\`;
            if (settings.address) contactItems[2].textContent = \`Address: \${settings.address}\`;
          }

          // Update social media links
          const socialLinks = document.querySelectorAll('.footer-section:nth-child(4) ul li a');
          if (socialLinks.length >= 3) {
            if (settings.linkedin) {
              socialLinks[0].href = settings.linkedin;
              if (settings.linkedin === '#') socialLinks[0].parentElement.style.display = 'none';
            }
            if (settings.facebook) {
              socialLinks[1].href = settings.facebook;
              if (settings.facebook === '#') socialLinks[1].parentElement.style.display = 'none';
            }
            if (settings.twitter) {
              socialLinks[2].href = settings.twitter;
              if (settings.twitter === '#') socialLinks[2].parentElement.style.display = 'none';
            }
          }
        }
      } catch (error) {
        console.error('Error loading website settings:', error);
      }
    }

    // Load settings on page load
    loadWebsiteSettings();

    // Export for use in other scripts
    window.API = API;
    window.validateEmail = validateEmail;
    window.showNotification = showNotification;
  </script>
  ${additionalScripts}
</body>
</html>`;
}

function createNavbar() {
  return `
  <nav class="navbar">
    <div class="nav-container">
      <a href="/" class="logo">GlobalMart</a>
      <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-menu">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/products" class="nav-link">Products</a></li>
        <li><a href="/about" class="nav-link">About</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>
    </div>
  </nav>`;
}

function createFooter() {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
        <p>Leading provider of high-quality industrial products and solutions worldwide.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact Info</h3>
        <ul>
          <li>Email: info@example.com</li>
          <li>Phone: +1 234 567 8900</li>
          <li>Address: 123 Business St, City, Country</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="#" target="_blank">LinkedIn</a></li>
          <li><a href="#" target="_blank">Facebook</a></li>
          <li><a href="#" target="_blank">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} B2B Product Exhibition. All rights reserved. | <a href="/admin" style="color: var(--accent-color); text-decoration: none; margin-left: 1rem;">Admin Login</a></p>
    </div>
  </footer>`;
}
