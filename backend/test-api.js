#!/usr/bin/env node

// Comprehensive API Testing Script for Loconomi Backend
// Tests all endpoints, authentication, and data validation

const API_URL = 'http://localhost:3000/api';
let testResults = {
  passed: 0,
  failed: 0,
  endpoints: {},
};

// Test utilities
const test = async (name, fn) => {
  try {
    await fn();
    console.log(`✅ ${name}`);
    testResults.passed++;
    return true;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    testResults.failed++;
    return false;
  }
};

const assertEqual = (actual, expected, message) => {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
};

const assertExists = (value, message) => {
  if (!value) {
    throw new Error(`${message}: value is null or undefined`);
  }
};

const request = async (method, endpoint, body = null, token = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();

  return {
    status: response.status,
    data,
    ok: response.ok,
  };
};

// Test data
let testData = {
  userToken: null,
  userId: null,
  providerToken: null,
  providerId: null,
  userEmail: `testuser${Date.now()}@test.com`,
  providerEmail: `testprovider${Date.now()}@test.com`,
};

const runTests = async () => {
  console.log('\n=== LOCONOMI API TEST SUITE ===\n');

  // ====== HEALTH CHECK ======
  console.log('\n📋 HEALTH CHECK');
  await test('GET /health returns 200', async () => {
    const result = await request('GET', '');
    const healthResult = await fetch('http://localhost:3000/health').then((r) =>
      r.json(),
    );
    assertEqual(healthResult.status, 'OK', 'Health status');
  });

  // ====== AUTHENTICATION ======
  console.log('\n📋 AUTHENTICATION TESTS');

  // User Signup
  let userSignupResponse;
  await test('POST /auth/user/signup - Create user', async () => {
    const result = await request('POST', '/auth/user/signup', {
      name: 'Test User',
      email: testData.userEmail,
      password: 'TestPassword123!',
      userType: 'user',
    });

    assertEqual(result.status, 201, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertExists(result.data.data.token, 'JWT token');
    assertExists(result.data.data.user.id, 'User ID');

    testData.userToken = result.data.data.token;
    testData.userId = result.data.data.user.id;
    userSignupResponse = result;
  });

  // User Login
  await test('POST /auth/user/login - Login user', async () => {
    const result = await request('POST', '/auth/user/login', {
      email: testData.userEmail,
      password: 'TestPassword123!',
    });

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertExists(result.data.data.token, 'JWT token');
    assertEqual(
      result.data.data.user.email,
      testData.userEmail,
      'Returned email',
    );
  });

  // Provider Signup
  let providerSignupResponse;
  await test('POST /auth/provider/signup - Create provider', async () => {
    const result = await request('POST', '/auth/provider/signup', {
      name: 'Test Provider',
      email: testData.providerEmail,
      password: 'TestPassword123!',
      role: 'Electrician',
      wage: 50,
      phone: '1234567890',
    });

    assertEqual(result.status, 201, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertExists(result.data.data.token, 'JWT token');
    assertExists(result.data.data.user.id, 'Provider ID');

    testData.providerToken = result.data.data.token;
    testData.providerId = result.data.data.user.id;
    providerSignupResponse = result;
  });

  // Provider Login
  await test('POST /auth/provider/login - Login provider', async () => {
    const result = await request('POST', '/auth/provider/login', {
      email: testData.providerEmail,
      password: 'TestPassword123!',
    });

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertExists(result.data.data.token, 'JWT token');
  });

  // ====== USER ROUTES ======
  console.log('\n📋 USER ROUTES');

  // Get User Profile
  await test('GET /users/me - Get authenticated user profile', async () => {
    const result = await request('GET', '/users/me', null, testData.userToken);
    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertEqual(result.data.data.email, testData.userEmail, 'Email match');
  });

  // Update User Profile
  await test('PATCH /users/:id - Update user profile', async () => {
    const result = await request(
      'PATCH',
      `/users/${testData.userId}`,
      {
        name: 'Updated Test User',
      },
      testData.userToken,
    );

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertEqual(result.data.data.name, 'Updated Test User', 'Name was updated');
  });

  // ====== PROVIDER ROUTES ======
  console.log('\n📋 PROVIDER ROUTES');

  // Get All Providers (Paginated)
  await test('GET /providers - Get all providers (paginated)', async () => {
    const result = await request('GET', '/providers?page=1&limit=20');
    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    // Service returns data as array directly, with pagination as separate field
    assertExists(result.data.data, 'Providers array');
    assertExists(result.data.pagination, 'Pagination object');
    assertExists(result.data.pagination.total, 'Total count');
  });

  // Get Providers by Role
  await test('GET /providers/role/:role - Get providers by role', async () => {
    const result = await request(
      'GET',
      '/providers/role/Electrician?page=1&limit=20',
    );
    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    // Service returns data as array directly
    assertExists(result.data.data, 'Providers array');
  });

  // Get Specific Provider by ID
  await test('GET /providers/:id - Get specific provider', async () => {
    const result = await request('GET', `/providers/${testData.providerId}`);
    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertEqual(
      result.data.data._id,
      testData.providerId,
      'Provider ID matches',
    );
  });

  // Get Provider Profile (Authenticated)
  await test('GET /providers/me - Get authenticated provider profile', async () => {
    const result = await request(
      'GET',
      '/providers/me',
      null,
      testData.providerToken,
    );
    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertEqual(result.data.data.email, testData.providerEmail, 'Email match');
  });

  // Update Provider Profile
  await test('PATCH /providers/:id - Update provider profile', async () => {
    const result = await request(
      'PATCH',
      `/providers/${testData.providerId}`,
      {
        wage: 75,
      },
      testData.providerToken,
    );

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertEqual(result.data.data.wage, 75, 'Wage was updated');
  });

  // Update Provider Availability
  await test('PATCH /providers/:id/availability - Update provider availability', async () => {
    const result = await request(
      'PATCH',
      `/providers/${testData.providerId}/availability`,
      {
        availability: 'Busy',
      },
      testData.providerToken,
    );

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
    assertEqual(result.data.data.availability, 'Busy', 'Availability updated');
  });

  // ====== ERROR HANDLING & EDGE CASES ======
  console.log('\n📋 ERROR HANDLING & EDGE CASES');

  // Duplicate Email Signup
  await test('POST /auth/user/signup - Reject duplicate email', async () => {
    const result = await request('POST', '/auth/user/signup', {
      name: 'Another User',
      email: testData.userEmail,
      password: 'AnotherPassword123!',
      userType: 'user',
    });

    assertEqual(result.status, 400, 'Should return 400 Bad Request');
    assertEqual(result.data.status, 'error', 'Status should be error');
    if (
      !result.data.message.toLowerCase().includes('already') &&
      !result.data.message.toLowerCase().includes('registered')
    ) {
      throw new Error(
        'Error message should mention duplicate/already registered',
      );
    }
  });

  // Invalid Password Login
  await test('POST /auth/user/login - Reject invalid password', async () => {
    const result = await request('POST', '/auth/user/login', {
      email: testData.userEmail,
      password: 'WrongPassword123!',
    });

    assertEqual(result.status, 401, 'Should return 401 Unauthorized');
    assertEqual(result.data.status, 'error', 'Status should be error');
  });

  // Non-existent User Login
  await test('POST /auth/user/login - Handle non-existent user', async () => {
    const result = await request('POST', '/auth/user/login', {
      email: 'nonexistent@test.com',
      password: 'SomePassword123!',
    });

    assertEqual(result.status, 401, 'Should return 401 Unauthorized');
    assertEqual(result.data.status, 'error', 'Status should be error');
  });

  // Missing Required Fields
  await test('POST /auth/user/signup - Validate required fields', async () => {
    const result = await request('POST', '/auth/user/signup', {
      name: 'Test',
      // Missing email and password
    });

    // Should get validation error
    if (result.status !== 400 && result.status !== 422) {
      throw new Error(`Expected validation error, got ${result.status}`);
    }
  });

  // Invalid JWT Token
  await test('GET /users/me - Reject invalid/missing JWT token', async () => {
    const result = await request('GET', '/users/me', null, 'invalid.token');
    assertEqual(result.status, 403, 'Should return 403 Forbidden');
  });

  // Non-existent Provider
  await test('GET /providers/:id - Handle non-existent provider', async () => {
    const result = await request('GET', '/providers/000000000000000000000000');
    assertEqual(result.status, 404, 'Should return 404 Not Found');
  });

  // 404 Not Found
  await test('GET /invalid-route - Return 404 for non-existent route', async () => {
    const result = await request('GET', '/invalid-route');
    assertEqual(result.status, 404, 'Should return 404 Not Found');
  });

  // ====== CLEANUP ======
  console.log('\n📋 CLEANUP');

  // Delete User
  await test('DELETE /users/:id - Delete user account', async () => {
    const result = await request(
      'DELETE',
      `/users/${testData.userId}`,
      null,
      testData.userToken,
    );

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
  });

  // Delete Provider
  await test('DELETE /providers/:id - Delete provider account', async () => {
    const result = await request(
      'DELETE',
      `/providers/${testData.providerId}`,
      null,
      testData.providerToken,
    );

    assertEqual(result.status, 200, 'Response status');
    assertEqual(result.data.status, 'success', 'Response status field');
  });

  // ====== SUMMARY ======
  console.log('\n╔════════════════════════════════╗');
  console.log('║       TEST SUMMARY REPORT      ║');
  console.log('╚════════════════════════════════╝');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📊 Total: ${testResults.passed + testResults.failed} tests`);
  console.log(
    `🎯 Success Rate: ${(
      (testResults.passed / (testResults.passed + testResults.failed)) *
      100
    ).toFixed(2)}%`,
  );

  if (testResults.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! 🎉\n');
  } else {
    console.log(
      `\n⚠️  ${testResults.failed} test(s) failed. Review above for details.\n`,
    );
  }

  process.exit(testResults.failed > 0 ? 1 : 0);
};

// Run tests
runTests().catch((error) => {
  console.error('Test suite error:', error);
  process.exit(1);
});
