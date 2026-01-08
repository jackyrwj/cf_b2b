/**
 * Generate Product Image using Replicate and Upload to R2
 * Usage: REPLICATE_API_TOKEN=your_token node scripts/generate-product-image.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PRODUCT_ID = 1;
const PRODUCT_NAME = 'Industrial Robotic Arm System';

// Prompt for industrial robotic arm
const PROMPT = `Professional product photograph of an industrial robotic arm system in a modern factory, clean white background, studio lighting, high quality, 4K, detailed, B2B product catalog style, Memphis Design aesthetic with vibrant colors`;

// Replicate API configuration
const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';

function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`API Error: ${res.statusCode} - ${body}`));
          }
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', reject);
  });
}

async function uploadToR2(filePath, key) {
  try {
    console.log('☁️  Uploading to R2...');
    console.log(`   Key: ${key}`);

    // Use wrangler to put object in R2
    const cmd = `npx wrangler r2 object put b2b-product-images/${key} --file="${filePath}" --local`;
    console.log(`   Running: ${cmd}`);

    execSync(cmd, { stdio: 'inherit' });

    console.log('✅ Uploaded to R2 successfully!');
    return `/api/upload/image/${key}`;
  } catch (error) {
    console.error('❌ R2 upload error:', error.message);
    throw error;
  }
}

async function updateProductInDB(imageUrl) {
  try {
    console.log('');
    console.log('📝 Updating product in database...');

    const cmd = `npx wrangler d1 execute b2b_database --local --command="UPDATE products SET image_url = '${imageUrl}', updated_at = CURRENT_TIMESTAMP WHERE id = ${PRODUCT_ID};"`;
    console.log(`   Running: ${cmd}`);

    execSync(cmd, { stdio: 'inherit' });

    console.log('✅ Product updated successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database update error:', error.message);
    throw error;
  }
}

async function generateAndUpload() {
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    console.error('❌ Error: REPLICATE_API_TOKEN environment variable is required');
    console.error('\nGet your API token from: https://replicate.com/account/api-tokens');
    console.error('\nUsage: REPLICATE_API_TOKEN=your_token node scripts/generate-product-image.js');
    process.exit(1);
  }

  console.log('🎨 Generating Product Image for Industrial Robotic Arm');
  console.log('━'.repeat(60));
  console.log('📦 Product ID:', PRODUCT_ID);
  console.log('📝 Name:', PRODUCT_NAME);
  console.log('🤖 AI Model: Stability AI SDXL');
  console.log('');

  try {
    // Step 1: Create prediction
    console.log('⏳ Step 1: Creating prediction...');
    const createResponse = await makeRequest(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }, {
      version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      input: {
        prompt: PROMPT,
        width: 1024,
        height: 1024,
        num_outputs: 1,
        scheduler: 'K_EULER',
        num_inference_steps: 30,
        guidance_scale: 7.5,
        negative_prompt: 'blurry, low quality, distorted, watermark, text, logo, ugly, amateur',
      }
    });

    console.log('✅ Prediction created:', createResponse.id);
    console.log('');

    // Step 2: Poll for result
    console.log('⏳ Step 2: Waiting for image generation...');
    console.log('   This may take 1-2 minutes...');

    let status = 'starting';
    let getResult = createResponse;
    let dots = 0;

    while (status !== 'succeeded' && status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 3000));

      getResult = await makeRequest(getResult.urls.get, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      status = getResult.status;

      process.stdout.write('\r   ' + '.'.repeat(dots % 20) + ' ' + status.toUpperCase() + ' ' + '.'.repeat(20 - dots % 20));
      dots++;

      if (status === 'processing' && dots % 10 === 0) {
        console.log('\n   Still generating...');
      }
    }

    console.log('\r' + ' '.repeat(60)); // Clear the line

    if (status === 'failed') {
      console.error('❌ Image generation failed');
      console.error('Error:', getResult.error);
      process.exit(1);
    }

    console.log('✅ Image generated successfully!');
    console.log('');

    // Step 3: Download image
    const imageUrl = getResult.output[0];
    console.log('⏳ Step 3: Downloading image...');
    console.log('   URL:', imageUrl);

    const timestamp = Date.now();
    const tempPath = path.join(__dirname, `temp-${timestamp}.png`);

    await downloadImage(imageUrl, tempPath);
    console.log('✅ Downloaded to:', tempPath);
    console.log('');

    // Step 4: Upload to R2
    const r2Key = `products/product-${PRODUCT_ID}-${timestamp}.png`;
    const publicUrl = await uploadToR2(tempPath, r2Key);

    // Clean up temp file
    fs.unlinkSync(tempPath);
    console.log('🧹 Cleaned up temporary file');
    console.log('');

    // Step 5: Update database
    await updateProductInDB(publicUrl);

    console.log('');
    console.log('━'.repeat(60));
    console.log('✅ SUCCESS! Product image updated!');
    console.log('');
    console.log('📋 Summary:');
    console.log(`   - Product: ${PRODUCT_NAME} (ID: ${PRODUCT_ID})`);
    console.log(`   - New Image URL: ${publicUrl}`);
    console.log(`   - R2 Key: ${r2Key}`);
    console.log('');
    console.log('💡 To see the updated image, refresh your browser at:');
    console.log('   http://localhost:8788/products/1');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
generateAndUpload();
