# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a B2B product exhibition website built on **Cloudflare Workers** with:
- **D1 database** (SQLite) for products, inquiries, and admin accounts
- **R2 storage** for product images
- **KV storage** for website settings
- **Role-based admin system** (super_admin with full CRUD, admin with read-only)
- **Vanilla JavaScript** frontend (no frameworks)

## Development Commands

```bash
# Install dependencies
npm install

# Local development
npm run dev

# Deploy to Cloudflare
npm run deploy

# Create D1 database (first-time setup)
wrangler d1 create b2b_database

# Initialize database schema
wrangler d1 execute b2b_database --file=./schema/schema.sql

# Create R2 bucket for images
wrangler r2 bucket create b2b-product-images

# Create KV namespace for settings
wrangler kv namespace create "STATIC_ASSETS"
```

## Architecture

### Request Flow

The application uses a **dual-router architecture** in `src/index.js`:

1. **API requests** (`/api/*`) → `src/api/router.js` → handler functions
2. **Page requests** (everything else) → `src/pages/router.js` → page generators

### API Layer (`src/api/`)

All API handlers follow this pattern:
- Route matching in `src/api/router.js` by path prefix
- Handler functions in `src/api/handlers/`:
  - `products.js` - Product CRUD with role-based visibility
  - `inquiries.js` - Customer inquiry management
  - `admin.js` - Authentication, JWT tokens, dashboard stats
  - `upload.js` - R2 image upload (max 5MB, JPEG/PNG/GIF/WebP)
  - `settings.js` - Website config via KV storage

**Important**: JWT secret is hardcoded in `src/api/handlers/admin.js:8` - TODO mentions moving to env variable. Use `wrangler secret put JWT_SECRET` for production.

### Frontend Layer (`src/pages/`)

Each page is a function that returns HTML string:
- `layout.js` - Common layout template with embedded CSS
- Page generators (home, products, product-detail, about, contact, admin-*)
- All CSS is inline in `layout.js`, no separate CSS files
- JavaScript is embedded in HTML strings

### Authentication & Authorization

- **SHA-256 password hashing** in `src/utils/auth.js`
- **Custom JWT implementation** (not using library)
- **Role-based access control**:
  - `requireAuth()` - Check if authenticated admin
  - `requireSuperAdmin()` - Check if super_admin role
  - Used in API handlers to protect mutations
- Products: Public sees `is_active=1` only, admins see all
- Inquiries: All admins can view/update status, only super_admin can delete

### Database Schema (`schema/schema.sql`)

Tables:
- `products` - With `is_active` (soft delete), `is_featured`, `gallery_images` (JSON)
- `inquiries` - With product_id FK, status (pending/processing/completed)
- `admins` - With role (super_admin/admin), password_hash, last_login

Default credentials (CHANGE AFTER DEPLOYMENT):
- Super Admin: `admin123` / `admin123`
- Regular Admin: `staff` / `staff123`

### Configuration (`wrangler.toml`)

Bindings:
- `DB` → D1 database
- `IMAGES` → R2 bucket
- `STATIC_ASSETS` → KV namespace

## Code Patterns

### API Handler Pattern

```javascript
export async function handleProducts(request, env, corsHeaders) {
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Route by method and path
  if (method === 'GET' && pathParts.length === 2) {
    return getAllProducts(env, corsHeaders, request);
  }
  // ... more routes
}
```

### Database Access Pattern

```javascript
const result = await env.DB.prepare('SELECT * FROM products WHERE id = ?')
  .bind(productId)
  .first();

const { results } = await env.DB.prepare('SELECT * FROM products').all();
```

### Auth Protection Pattern

```javascript
const admin = await requireSuperAdmin(request, env);
if (!admin) {
  return new Response(JSON.stringify({
    error: 'Unauthorized. Super admin access required.'
  }), {
    status: 403,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

### Soft Delete Pattern

Products are never actually deleted - `is_active` is set to 0 instead. This preserves data and allows recovery.

## Common Tasks

### Adding a new API endpoint

1. Add route in `src/api/router.js`
2. Create handler in `src/api/handlers/`
3. If authenticated, use `requireAuth()` or `requireSuperAdmin()`
4. Return Response with CORS headers

### Adding a new page

1. Create page generator function in `src/pages/`
2. Add route in `src/pages/router.js`
3. Use `createLayout()` from `layout.js` for consistent structure

### Database migration

```bash
wrangler d1 execute b2b_database --command="YOUR SQL HERE"
```

### Updating admin password

Hash password in browser console using `crypto.subtle.digest('SHA-256')`, then:

```sql
UPDATE admins SET password_hash = 'your-hash' WHERE username = 'admin';
```

### Testing locally

Static assets (CSS/JS) are embedded in HTML strings. The `/images/*` route serves from R2. For local development with placeholder images, ensure R2 is configured or update `src/pages/static.js`.

## Deployment Notes

- All assets are inline (no separate CSS/JS files to deploy)
- Images stored in R2 bucket
- Settings stored in KV (site name, description, contact info, social links)
- D1 database must be created manually before first deploy
- Set `JWT_SECRET` via Cloudflare secrets for production
