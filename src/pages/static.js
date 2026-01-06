/**
 * Static assets handler
 * Serves CSS, JS, and image files from the public directory
 */

// In-memory storage for static files (for production, consider using KV or R2)
const staticFiles = new Map();

// Helper function to get content type
function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const types = {
    'css': 'text/css',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'ico': 'image/x-icon',
  };
  return types[ext] || 'application/octet-stream';
}

export async function handleStaticAssets(request, env, defaultContentType) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Extract the object key from the path (remove /images/ prefix)
  const objectKey = path.replace('/images/', '');

  console.log(`[Static Assets] Serving image: ${objectKey} from path: ${path}`);

  try {
    // Try R2 bucket first (if available)
    if (env && env.IMAGES) {
      const object = await env.IMAGES.get(objectKey);

      if (object) {
        console.log(`[Static Assets] Image found in R2: ${objectKey}, size: ${object.size}`);
        return new Response(object.body, {
          headers: {
            'Content-Type': defaultContentType || getContentType(objectKey) || object.httpMetadata?.contentType || 'image/png',
            'Cache-Control': 'public, max-age=86400',
            'ETag': object.httpEtag,
          },
        });
      }
    }

    // Fallback: Check in-memory storage (for local development with pre-loaded files)
    const staticFile = staticFiles.get(objectKey);
    if (staticFile) {
      console.log(`[Static Assets] Image found in static files: ${objectKey}`);
      return new Response(staticFile.content, {
        headers: {
          'Content-Type': staticFile.contentType || getContentType(objectKey),
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    console.log(`[Static Assets] Image not found: ${objectKey}`);
    return new Response('Image not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('[Static Assets] Error serving image:', error);
    return new Response(`Error loading image: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Function to register static files (to be called during build)
export function registerStaticFile(path, content, contentType) {
  staticFiles.set(path, { content, contentType });
}
