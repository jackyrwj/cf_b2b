/**
 * Home Page - Modern B2B Landing Page
 * Features glassmorphism design, bento grid layout, and smooth animations
 */

import { createLayout } from './layout';

export async function homePage(env) {
  // Load settings from KV for SEO
  let settings = {
    site_name: 'B2B Product Exhibition',
    site_description: 'Your trusted partner for high-quality industrial products and innovative solutions worldwide',
    company_intro: 'We are a leading manufacturer and supplier of high-quality industrial products. With over 20 years of experience, we serve clients across the globe with innovative solutions and exceptional customer service. Our commitment to quality and reliability has made us a trusted partner in the industry.'
  };

  try {
    const settingsJson = await env.STATIC_ASSETS.get('website_settings');
    if (settingsJson) {
      const savedSettings = JSON.parse(settingsJson);
      settings = { ...settings, ...savedSettings };
    }
  } catch (error) {
    console.error('Error loading settings for SEO:', error);
  }

  const content = `
    <!-- Hero Section with Gradient Background -->
    <section class="hero-section">
      <div class="hero-background"></div>
      <div class="container hero-content">
        <div class="hero-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span>Trusted by 500+ Companies Worldwide</span>
        </div>
        <h1 class="hero-title">Innovative Industrial Solutions for Modern Business</h1>
        <p id="hero-subtitle" class="hero-subtitle">
          Your trusted partner for high-quality industrial products and innovative solutions worldwide
        </p>
        <div class="hero-cta-group">
          <a href="/products" class="btn btn-primary btn-large">
            Explore Products
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/contact" class="btn btn-glass btn-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contact Us
          </a>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card glass-card">
            <div class="stat-number">20+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Global Clients</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Products</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Countries</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products - Moved Up for Visual Impact -->
    <section class="section-products-featured">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Our Products</span>
          <h2 class="section-title">Featured Solutions</h2>
          <p class="section-description">Discover our most popular industrial products</p>
        </div>

        <div id="featured-products" class="products-grid-enhanced">
          <div class="spinner"></div>
        </div>

        <div class="section-cta">
          <a href="/products" class="btn btn-primary btn-large">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="section-intro">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <span class="section-tag">About Us</span>
            <h2 class="section-title">Your Partner in Industrial Excellence</h2>
            <p id="company-intro" class="intro-description">
              We are a leading manufacturer and supplier of high-quality industrial products.
              With over 20 years of experience, we serve clients across the globe with innovative
              solutions and exceptional customer service. Our commitment to quality and reliability
              has made us a trusted partner in the industry.
            </p>
            <div class="intro-highlights">
              <div class="highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="check-icon">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Certified Quality Products</span>
              </div>
              <div class="highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="check-icon">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Global Supply Chain</span>
              </div>
              <div class="highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="check-icon">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>24/7 Expert Support</span>
              </div>
            </div>
          </div>
          <div class="intro-visual">
            <div class="visual-card glass-card">
              <div class="visual-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 3v18h18"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                </svg>
              </div>
              <div class="visual-text">
                <div class="visual-label">Industry Growth</div>
                <div class="visual-value">+127% YoY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Bento Grid -->
    <section class="section-features">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Why Choose Us</span>
          <h2 class="section-title">Delivering Excellence Across Every Dimension</h2>
        </div>

        <div class="bento-grid">
          <!-- Large Card -->
          <div class="bento-card bento-large glass-card feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 class="feature-title">Premium Quality Assurance</h3>
            <p class="feature-description">
              Every product undergoes rigorous testing and meets international quality standards before reaching you.
            </p>
            <div class="feature-meta">
              <span class="feature-stat">99.8%</span>
              <span class="feature-label">Quality Rate</span>
            </div>
          </div>

          <!-- Medium Card 1 -->
          <div class="bento-card bento-medium glass-card feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
            </div>
            <h3 class="feature-title">Global Reach</h3>
            <p class="feature-description">
              Serving customers in over 50 countries with reliable logistics and local support.
            </p>
          </div>

          <!-- Medium Card 2 -->
          <div class="bento-card bento-medium glass-card feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
              </svg>
            </div>
            <h3 class="feature-title">Expert Service</h3>
            <p class="feature-description">
              Professional team ready to provide customized solutions for your business needs.
            </p>
          </div>

          <!-- Small Card 1 -->
          <div class="bento-card bento-small glass-card feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 class="feature-title">Fast Delivery</h3>
            <p class="feature-description">
              Efficient supply chain ensures on-time delivery worldwide.
            </p>
          </div>

          <!-- Small Card 2 -->
          <div class="bento-card bento-small glass-card feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 class="feature-title">Secure Partnership</h3>
            <p class="feature-description">
              Trusted by industry leaders for over two decades.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-cta-bottom">
      <div class="container">
        <div class="cta-card glass-card">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Transform Your Business?</h2>
            <p class="cta-description">
              Get in touch with our experts to discuss your requirements and discover how we can help.
            </p>
            <div class="cta-actions">
              <a href="/contact" class="btn btn-primary btn-large">
                Get Started Today
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="/products" class="btn btn-secondary">
                Browse Catalog
              </a>
            </div>
          </div>
          <div class="cta-visual">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  `;

  const scripts = `
    <script>
      // Load featured products with modern design
      async function loadFeaturedProducts() {
        try {
          const response = await API.get('/products/featured');
          const products = response.data || [];

          const container = document.getElementById('featured-products');

          if (products.length === 0) {
            container.innerHTML = '<p class="no-products">No featured products available.</p>';
            return;
          }

          container.innerHTML = products.slice(0, 6).map((product, index) => \`
            <div class="product-card glass-card" style="animation: fadeInUp 0.6s ease-out \${index * 0.1}s both;" tabindex="0">
              <div class="product-image-wrapper">
                <img src="\${product.image_url || '/images/placeholder.jpg'}" alt="\${product.name}" class="product-image" loading="lazy">
                <div class="product-overlay">
                  <a href="/products/\${product.id}" class="btn btn-glass" tabindex="-1">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.25rem;">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="product-content">
                <h3 class="product-title">\${product.name}</h3>
                <p class="product-description">\${product.description || 'No description available'}</p>
              </div>
            </div>
          \`).join('');

          // Add keyboard navigation for product cards
          document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) link.click();
              }
            });
          });
        } catch (error) {
          console.error('Error loading featured products:', error);
          document.getElementById('featured-products').innerHTML =
            '<p class="error-message">Unable to load products. Please try again later.</p>';
        }
      }

      // Load and apply home page settings
      async function loadHomeSettings() {
        try {
          const response = await API.get('/settings');
          if (response.success) {
            const settings = response.data;

            // Update hero subtitle
            const heroSubtitle = document.getElementById('hero-subtitle');
            if (heroSubtitle && settings.site_description) {
              heroSubtitle.textContent = settings.site_description;
            }

            // Update company introduction
            const companyIntro = document.getElementById('company-intro');
            if (companyIntro && settings.company_intro) {
              companyIntro.textContent = settings.company_intro;
            }
          }
        } catch (error) {
          console.error('Error loading home settings:', error);
        }
      }

      // Intersection Observer for scroll animations
      function initScrollAnimations() {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-intro, .section-features, .section-cta-bottom, .section-products-featured').forEach(section => {
          section.style.opacity = '0';
          section.style.transform = 'translateY(30px)';
          section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          observer.observe(section);
        });

        // Observe feature cards and product cards
        document.querySelectorAll('.bento-card, .intro-visual').forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
          observer.observe(card);
        });
      }

      // Smooth scroll for anchor links
      function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
      }

      // Add parallax effect to hero background
      function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const scrolled = window.pageYOffset;
              heroBackground.style.transform = \`translateY(\${scrolled * 0.3}px)\`;
              ticking = false;
            });
            ticking = true;
          }
        });
      }

      // Counter animation for stats
      function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = element.textContent.replace(/\\d+/, Math.floor(target));
            clearInterval(timer);
          } else {
            element.textContent = element.textContent.replace(/\\d+/, Math.floor(current));
          }
        }, 16);
      }

      // Initialize counter animations when stats are visible
      function initCounterAnimations() {
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const statNumbers = entry.target.querySelectorAll('.stat-number');
              statNumbers.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/\\d+/);
                if (match) {
                  const target = parseInt(match[0]);
                  animateCounter(stat, target);
                }
              });
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
      }

      // Initialize all enhancements
      document.addEventListener('DOMContentLoaded', () => {
        loadFeaturedProducts();
        loadHomeSettings();
        initScrollAnimations();
        initSmoothScroll();
        initParallax();
        initCounterAnimations();
      });
    </script>
  `;

  const html = createLayout(
    settings.site_name,
    content,
    scripts,
    settings.site_description,
    false // Don't use title suffix for home page
  );

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
