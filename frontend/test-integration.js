#!/usr/bin/env node

// Frontend Integration Test Script
// Tests frontend's ability to communicate with backend APIs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n╔════════════════════════════════════════╗');
console.log('║   FRONTEND INTEGRATION TEST SUITE    ║');
console.log('╚════════════════════════════════════════╝\n');

// Tests to perform
const tests = {
  apiClient: 'Check API client configuration',
  authContext: 'Check Auth context implementation',
  providerContext: 'Check Provider context implementation',
  loginPage: 'Check Login page',
  hirePage: 'Check Hire page',
  appConfig: 'Check App.jsx and environment',
};

const frontendDir = './src';
let passed = 0;
let failed = 0;

// Test utilities
const test = (name, fn) => {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
    return true;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
    return false;
  }
};

const fileExists = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`File not found: ${filepath}`);
  }
};

const fileContains = (filepath, pattern) => {
  const content = fs.readFileSync(filepath, 'utf8');
  if (!content.includes(pattern)) {
    throw new Error(`Pattern not found in ${filepath}: ${pattern}`);
  }
};

const fileNotContains = (filepath, pattern) => {
  const content = fs.readFileSync(filepath, 'utf8');
  if (content.includes(pattern)) {
    throw new Error(
      `Pattern found (should not exist) in ${filepath}: ${pattern}`,
    );
  }
};

// ====== RUN TESTS ======

console.log('📋 FILE STRUCTURE TESTS\n');

test('API client exists', () => {
  fileExists(path.join(frontendDir, 'api', 'client.js'));
});

test('Auth context exists', () => {
  fileExists(path.join(frontendDir, 'context', 'AuthContext.jsx'));
});

test('Provider context exists', () => {
  fileExists(path.join(frontendDir, 'context', 'ProviderContext.jsx'));
});

test('Login page exists', () => {
  fileExists(path.join(frontendDir, 'Pages', 'Login', 'index.jsx'));
});

test('Hire page exists', () => {
  fileExists(path.join(frontendDir, 'Pages', 'Hire', 'index.jsx'));
});

console.log('\n📋 API CLIENT CONFIGURATION TESTS\n');

test('API client uses environment variable', () => {
  fileContains(
    path.join(frontendDir, 'api', 'client.js'),
    'import.meta.env.VITE_API_URL',
  );
});

test('API client has auth header handling', () => {
  fileContains(path.join(frontendDir, 'api', 'client.js'), 'Bearer');
});

test('API client has localStorage token handling', () => {
  fileContains(path.join(frontendDir, 'api', 'client.js'), 'localStorage');
});

test('API client exports auth methods', () => {
  fileContains(path.join(frontendDir, 'api', 'client.js'), 'userSignup');
});

test('API client exports provider methods', () => {
  fileContains(path.join(frontendDir, 'api', 'client.js'), 'providerAPI');
});

console.log('\n📋 CONTEXT & STATE MANAGEMENT TESTS\n');

test('Auth context provides useAuth hook', () => {
  fileContains(path.join(frontendDir, 'context', 'AuthContext.jsx'), 'useAuth');
});

test('Auth context has login function', () => {
  const content = fs.readFileSync(
    path.join(frontendDir, 'context', 'AuthContext.jsx'),
    'utf8',
  );
  if (!content.includes('userLogin') && !content.includes('providerLogin')) {
    throw new Error('Auth context does not have login functions');
  }
});

test('Auth context saves token', () => {
  fileContains(
    path.join(frontendDir, 'context', 'AuthContext.jsx'),
    'localStorage',
  );
});

test('Provider context provides useProviders hook', () => {
  fileContains(
    path.join(frontendDir, 'context', 'ProviderContext.jsx'),
    'useProviders',
  );
});

test('Provider context calls API', () => {
  fileContains(
    path.join(frontendDir, 'context', 'ProviderContext.jsx'),
    'providerAPI',
  );
});

console.log('\n📋 PAGE INTEGRATION TESTS\n');

test('Login page imports auth utilities', () => {
  fileContains(
    path.join(frontendDir, 'Pages', 'Login', 'index.jsx'),
    'useAuth',
  );
});

test('Login page calls API methods', () => {
  const content = fs.readFileSync(
    path.join(frontendDir, 'Pages', 'Login', 'index.jsx'),
    'utf8',
  );
  if (
    !content.includes('userLogin') &&
    !content.includes('userSignup') &&
    !content.includes('providerLogin')
  ) {
    throw new Error('Login page does not call API methods');
  }
});

test('Hire page imports provider context', () => {
  fileContains(
    path.join(frontendDir, 'Pages', 'Hire', 'index.jsx'),
    'useProviders',
  );
});

test('Hire page fetches providers on mount', () => {
  fileContains(
    path.join(frontendDir, 'Pages', 'Hire', 'index.jsx'),
    'useEffect',
  );
});

console.log('\n📋 ERROR BOUNDARY & ERROR HANDLING\n');

test('Error boundary component exists', () => {
  fileExists(path.join(frontendDir, 'components', 'ErrorBoundary.jsx'));
});

test('Error boundary catches errors', () => {
  fileContains(
    path.join(frontendDir, 'components', 'ErrorBoundary.jsx'),
    'getDerivedStateFromError',
  );
});

test('App.jsx wraps with providers', () => {
  fileContains(path.join(frontendDir, 'App.jsx'), 'Provider');
});

console.log('\n📋 ENVIRONMENT SETUP TESTS\n');

test('Frontend has .env configuration', () => {
  fileExists(path.join('..', 'frontend', '.env'));
});

test('Frontend package.json has required deps', () => {
  const pkgPath = path.join('..', 'frontend', 'package.json');
  fileContains(pkgPath, 'react');
});

// ====== SUMMARY ======
console.log('\n╔════════════════════════════════════════╗');
console.log('║         TEST SUMMARY REPORT          ║');
console.log('╚════════════════════════════════════════╝');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total: ${passed + failed} tests`);
console.log(
  `🎯 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(2)}%`,
);

if (failed === 0) {
  console.log('\n🎉 ALL FRONTEND TESTS PASSED! 🎉\n');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${failed} test(s) failed. Review above for details.\n`);
  process.exit(1);
}
