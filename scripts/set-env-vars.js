/**
 * Helper script to set environment variables in .env.local
 * Usage: node scripts/set-env-vars.js
 */

const fs = require('fs');
const path = require('path');

const envVars = {
  // Supabase Public
  NEXT_PUBLIC_SUPABASE_URL: "https://nuvmiyjojbqjhxnwyslz.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dm1peWpvamJxamh4bnd5c2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxODUzMzEsImV4cCI6MjA4Mjc2MTMzMX0.iboFPTw8hlmelnFu7-Gb932dKzcbhZVbLdt4_8MeXQ4",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_jq6YnSpc4lhRpm7z0LUfZw_4vSTRGaY",
  SUPABASE_URL: "https://nuvmiyjojbqjhxnwyslz.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_jq6YnSpc4lhRpm7z0LUfZw_4vSTRGaY",
  
  // Supabase Secret
  SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dm1peWpvamJxamh4bnd5c2x6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzE4NTMzMSwiZXhwIjoyMDgyNzYxMzMxfQ.EwPEtGSq4NZULUxMQEziFut2NfqrRpux818Fra4IWnI",
  SUPABASE_SECRET_KEY: "sb_secret_rV3bK0Y2R96rOTHJx7NcIg_USqoI2dl",
  SUPABASE_JWT_SECRET: "9cXA9fzOYyK96Vg/w15WbHLHs1qJ7aYt+l+PKFpB2ar7LZZjq8VFPmuXUKDoD4B/e+eHg7Uon1NEKR8wW+jdUQ==",
  
  // PostgreSQL Public
  POSTGRES_DATABASE: "postgres",
  POSTGRES_HOST: "db.nuvmiyjojbqjhxnwyslz.supabase.co",
  POSTGRES_USER: "postgres",
  
  // PostgreSQL Secret
  POSTGRES_PASSWORD: "5s7F1SZ2s8ZoafLC",
  POSTGRES_URL: "postgres://postgres.nuvmiyjojbqjhxnwyslz:5s7F1SZ2s8ZoafLC@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x",
  POSTGRES_PRISMA_URL: "postgres://postgres.nuvmiyjojbqjhxnwyslz:5s7F1SZ2s8ZoafLC@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true",
  POSTGRES_URL_NON_POOLING: "postgres://postgres.nuvmiyjojbqjhxnwyslz:5s7F1SZ2s8ZoafLC@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require",
};

const envFilePath = path.join(process.cwd(), '.env.local');

// Read existing .env.local if it exists
let existingVars = {};
if (fs.existsSync(envFilePath)) {
  const content = fs.readFileSync(envFilePath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        existingVars[key] = value;
      }
    }
  });
}

// Merge with new values (new values override existing)
const mergedVars = { ...existingVars, ...envVars };

// Write to .env.local
const lines = [
  '# Environment variables',
  '# This file is auto-generated. Do not edit manually unless you know what you\'re doing.',
  '',
  '# Supabase Configuration',
];

// Add Supabase public variables
const supabasePublicKeys = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_URL',
  'SUPABASE_PUBLISHABLE_KEY',
];
supabasePublicKeys.forEach((key) => {
  if (mergedVars[key]) {
    lines.push(`${key}="${mergedVars[key]}"`);
  }
});

// Add Supabase secret variables
lines.push('');
const supabaseSecretKeys = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SECRET_KEY',
  'SUPABASE_JWT_SECRET',
];
supabaseSecretKeys.forEach((key) => {
  if (mergedVars[key]) {
    lines.push(`${key}="${mergedVars[key]}"`);
  }
});

// Add PostgreSQL variables
lines.push('');
lines.push('# PostgreSQL Configuration');
const postgresPublicKeys = ['POSTGRES_DATABASE', 'POSTGRES_HOST', 'POSTGRES_USER'];
postgresPublicKeys.forEach((key) => {
  if (mergedVars[key]) {
    lines.push(`${key}="${mergedVars[key]}"`);
  }
});

const postgresSecretKeys = [
  'POSTGRES_PASSWORD',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
];
postgresSecretKeys.forEach((key) => {
  if (mergedVars[key]) {
    lines.push(`${key}="${mergedVars[key]}"`);
  }
});

// Add any other custom variables
const allKnownKeys = [
  ...supabasePublicKeys,
  ...supabaseSecretKeys,
  ...postgresPublicKeys,
  ...postgresSecretKeys,
];
const customKeys = Object.keys(mergedVars).filter((key) => !allKnownKeys.includes(key));
if (customKeys.length > 0) {
  lines.push('');
  lines.push('# Custom variables');
  customKeys.forEach((key) => {
    if (mergedVars[key]) {
      lines.push(`${key}="${mergedVars[key]}"`);
    }
  });
}

fs.writeFileSync(envFilePath, lines.join('\n') + '\n', 'utf-8');

console.log('✅ Environment variables have been written to .env.local');
console.log(`📝 Total variables set: ${Object.keys(mergedVars).length}`);
console.log('🔒 Remember: .env.local is in .gitignore and should never be committed!');

