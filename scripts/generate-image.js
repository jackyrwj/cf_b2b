/**
 * Generate Product Image using Replicate API
 * Usage: REPLICATE_API_TOKEN=your_token node scripts/generate-image.js
 */

const https = require('https');

// Replicate API configuration
const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';

// Prompt for industrial robotic arm
const PROMPT = 'Professional product photograph of an industrial robotic arm system in a modern factory, clean white background, studio lighting, high quality, 4K, detailed, B2B product catalog style';

// Model to use (Stable Diffusion or similar)
const MODEL = 'stability-ai/sdxl';

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

async function generateImage() {
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    console.error('❌ Error: REPLICATE_API_TOKEN environment variable is required');
    console.error('\nGet your API token from: https://replicate.com/account/api-tokens');
    console.error('\nUsage: REPLICATE_API_TOKEN=your_token node scripts/generate-image.js');
    process.exit(1);
  }

  console.log('🎨 Generating image with Replicate API...');
  console.log('📝 Prompt:', PROMPT);
  console.log('🤖 Model:', MODEL);
  console.log('');

  try {
    // Step 1: Create prediction
    console.log('⏳ Creating prediction...');
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
        negative_prompt: 'blurry, low quality, distorted, watermark, text, logo',
      }
    });

    console.log('✅ Prediction created:', createResponse.id);
    console.log('🔗 Status URL:', createResponse.urls.get);
    console.log('');

    // Step 2: Poll for result
    let status = 'starting';
    let getResult = createResponse;

    while (status !== 'succeeded' && status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('⏳ Checking status...');
      getResult = await makeRequest(getResult.urls.get, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      status = getResult.status;
      console.log('📊 Current status:', status);

      if (status === 'processing') {
        console.log('   Still generating...');
      }
    }

    console.log('');

    if (status === 'failed') {
      console.error('❌ Image generation failed');
      console.error('Error:', getResult.error);
      process.exit(1);
    }

    // Step 3: Get output
    console.log('✅ Image generated successfully!');
    const imageUrl = getResult.output[0];
    console.log('🖼️  Image URL:', imageUrl);
    console.log('');

    // Step 4: Download image
    console.log('⬇️  Downloading image...');
    const imageFileName = 'industrial-robotic-arm-sdxl.png';
    const fs = require('fs');
    const file = fs.createWriteStream(`./public/images/${imageFileName}`);

    await new Promise((resolve, reject) => {
      https.get(imageUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('✅ Image saved to:', `./public/images/${imageFileName}`);
          console.log('');
          console.log('📋 To update the product, run:');
          console.log(`   npx wrangler d1 execute b2b_database --local --command="UPDATE products SET image_url = '/images/${imageFileName}' WHERE id = 1;"`);
          resolve();
        });
      }).on('error', reject);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
generateImage();
