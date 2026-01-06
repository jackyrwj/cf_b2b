/**
 * Page Router - serves frontend HTML pages
 */

import { homePage } from './home';
import { productsPage } from './products';
import { productDetailPage } from './product-detail';
import { aboutPage } from './about';
import { contactPage } from './contact';
import { adminLoginPage } from './admin-login';
import { adminDashboard } from './admin-dashboard';

export async function handlePageRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Serve image files
  if (path.startsWith('/images/')) {
    const { handleStaticAssets } = await import('./static');
    return handleStaticAssets(request, env);
  }

  // Route to pages
  if (path === '/' || path === '/home') {
    return homePage(env);
  }

  if (path === '/products') {
    return productsPage(env);
  }

  if (path.startsWith('/products/')) {
    return productDetailPage(request, env);
  }

  if (path === '/about') {
    return aboutPage(env);
  }

  if (path === '/contact') {
    return contactPage(env);
  }

  if (path === '/admin' || path === '/admin/login') {
    return adminLoginPage(env);
  }

  if (path === '/admin/dashboard') {
    return adminDashboard(env);
  }

  // Test page for debugging
  if (path === '/test-api') {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>API Test</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    button { padding: 10px 20px; font-size: 16px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer; }
    button:hover { background: #1e40af; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px; white-space: pre-wrap; }
    .success { color: #10b981; }
    .error { color: #ef4444; }
  </style>
</head>
<body>
  <h1>🧪 Inquiry API Test</h1>
  <p>Click the button below to test the inquiry submission API:</p>
  <button onclick="testAPI()">Test API</button>
  <pre id="result">Waiting for test...</pre>

  <script>
    async function testAPI() {
      const result = document.getElementById('result');
      result.textContent = 'Testing...\\n';
      result.className = '';

      const testData = {
        name: 'API测试用户',
        email: 'apitest@example.com',
        company: '测试公司',
        phone: '1234567890',
        country: 'China',
        message: 'Product Inquiry: 这是一条测试消息'
      };

      result.textContent += 'Sending data:\\n' + JSON.stringify(testData, null, 2) + '\\n\\n';

      try {
        const response = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testData)
        });

        result.textContent += \`Response Status: \${response.status} \${response.statusText}\\n\`;
        result.textContent += \`Response OK: \${response.ok}\\n\\n\`;

        const data = await response.json();
        result.textContent += 'Response Data:\\n' + JSON.stringify(data, null, 2) + '\\n\\n';

        if (response.ok && data.success) {
          result.className = 'success';
          result.textContent += '✅ SUCCESS! Inquiry ID: ' + data.data.id + '\\n';
          result.textContent += '请检查管理后台是否显示此记录。';
        } else {
          result.className = 'error';
          result.textContent += '❌ FAILED!\\n';
          if (data.error) {
            result.textContent += 'Error: ' + data.error;
          }
        }
      } catch (error) {
        result.className = 'error';
        result.textContent += '❌ NETWORK ERROR!\\n\\n';
        result.textContent += 'Error: ' + error.message + '\\n';
        result.textContent += 'Stack: ' + error.stack;
      }
    }
  </script>
</body>
</html>`;
    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  }

  // 404 Not Found
  return new Response('Page not found', { status: 404 });
}
