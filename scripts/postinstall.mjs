#!/usr/bin/env node

/**
 * Post-install script for Astraia
 * Validates environment and creates necessary directories
 */

import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Astraia Post-Install Checks\n');

// Check Node.js version
const nodeVersion = process.version;
const requiredVersion = 'v20.0.0';
const currentMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
const requiredMajor = parseInt(requiredVersion.slice(1).split('.')[0]);

console.log(`📦 Node.js version: ${nodeVersion}`);
if (currentMajor < requiredMajor) {
  console.error(`❌ Node.js ${requiredVersion} or higher is required. Current: ${nodeVersion}`);
  console.error(`   Please install Node.js ${requiredMajor} LTS or use nvm: nvm install 20`);
  process.exit(1);
} else {
  console.log(`✅ Node.js version OK\n`);
}

// Check required environment variables
console.log('🔐 Checking environment variables...');

const requiredEnvVars = [
  'RESEND_API_KEY',
  'LEADS_TO',
  'CAPTCHA_SECRET',
];

const envFile = join(rootDir, '.env.local');
const envProdFile = join(rootDir, '.env.production');

if (!existsSync(envFile) && !existsSync(envProdFile)) {
  console.warn('⚠️  No .env.local or .env.production found');
  console.warn('   Copy .env.example to .env.local and fill in the values:');
  console.warn('   cp .env.example .env.local\n');
} else {
  console.log('✅ Environment file found\n');
}

// Validate environment variables if running in development
if (process.env.NODE_ENV !== 'production') {
  let missingVars = [];
  
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.warn('⚠️  Missing environment variables:');
    missingVars.forEach(v => console.warn(`   - ${v}`));
    console.warn('\n   These are required for the app to function properly.');
    console.warn('   Set them in .env.local before running the app.\n');
  } else {
    console.log('✅ All required environment variables are set\n');
  }

  // Validate CAPTCHA_SECRET length
  if (process.env.CAPTCHA_SECRET && process.env.CAPTCHA_SECRET.length < 32) {
    console.error('❌ CAPTCHA_SECRET must be at least 32 characters long');
    process.exit(1);
  }

  // Validate email format
  if (process.env.LEADS_TO && !process.env.LEADS_TO.includes('@')) {
    console.error('❌ LEADS_TO must be a valid email address');
    process.exit(1);
  }
}

// Create public directories if they don't exist
console.log('📁 Creating public asset directories...');

const publicDir = join(rootDir, 'public');
const screensDir = join(publicDir, 'screens');
const logosDir = join(publicDir, 'logos');

[publicDir, screensDir, logosDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`   Created: ${dir}`);
  }
});

console.log('✅ Public directories ready\n');

// Display next steps
console.log('🎉 Post-install complete!\n');
console.log('Next steps:');
console.log('1. Add your images to public/screens/ and public/logos/');
console.log('2. Review .env.local and ensure all variables are set');
console.log('3. Run: npm run dev');
console.log('4. Open: http://localhost:3000\n');

console.log('For production deployment:');
console.log('- Docker: npm run docker:build && npm run docker:up');
console.log('- See README.md for VPS deployment guide\n');
