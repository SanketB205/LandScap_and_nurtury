/**
 * Comprehensive API Test Runner for Janai Landscape Services
 * Run via: node tests/api.test.js
 * Requires backend running at TEST_URL (default http://localhost:5000)
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:5000";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// Simple cookie jar for Node fetch (no persistent cookie store)
let cookieStore = "";

function extractCookies(res) {
  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) return;
  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const c of cookies) {
    const nameVal = c.split(";")[0].trim();
    const [name, ...valParts] = nameVal.split("=");
    const value = valParts.join("=");
    if (name && value) {
      cookieStore = cookieStore.replace(new RegExp(`${name}=[^;]*`), "") || cookieStore;
      cookieStore += `${cookieStore ? "; " : ""}${name}=${value}`;
    }
  }
}

function fetchWithCookies(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (cookieStore) {
    headers.Cookie = cookieStore;
  }
  return fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });
}

async function runTests() {
  console.log(`\n🌿 Starting Janai Landscape Services API Tests against ${BASE_URL}...\n`);

  // 1. Health Check
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    extractCookies(res);
    assert(res.status === 200, "GET /api/health returns 200 OK");
    assert(data.status === "ok", "Health status is 'ok'");
  } catch (err) {
    console.error("Health check request failed (Is backend running?):", err.message);
    failed++;
  }

  // 2. Services API
  try {
    const res = await fetch(`${BASE_URL}/api/services`);
    const data = await res.json();
    assert(res.status === 200, "GET /api/services returns 200 OK");
    assert(data.success === true, "Services response success flag is true");
    assert(Array.isArray(data.data), "Services response contains array of services");

    if (data.data.length > 0) {
      const firstSlug = data.data[0].slug;
      const slugRes = await fetch(`${BASE_URL}/api/services/${firstSlug}`);
      const slugData = await slugRes.json();
      assert(slugRes.status === 200, `GET /api/services/${firstSlug} returns 200 OK`);
      assert(slugData.data.slug === firstSlug, "Service slug matches requested slug");
    }
  } catch (err) {
    assert(false, `Services test failed: ${err.message}`);
  }

  // 3. Plants Catalog & Recommendations
  try {
    const res = await fetch(`${BASE_URL}/api/plants`);
    const data = await res.json();
    assert(res.status === 200, "GET /api/plants returns 200 OK");
    assert(Array.isArray(data.data), "Plants response contains data array");

    const recRes = await fetch(`${BASE_URL}/api/plants/recommendations?sunlight=Full+Sun&watering=Moderate`);
    const recData = await recRes.json();
    assert(recRes.status === 200, "GET /api/plants/recommendations returns 200 OK");
    assert(Array.isArray(recData.data), "Recommendations returns array of matching plants");
  } catch (err) {
    assert(false, `Plants test failed: ${err.message}`);
  }

  // 4. Smart Estimator Calculation (needs CSRF token)
  try {
    const csrfToken = cookieStore.match(/csrf_token=([^;]+)/)?.[1];
    const estRes = await fetchWithCookies(`${BASE_URL}/api/planner/estimate`, {
      method: "POST",
      headers: csrfToken ? { "X-CSRF-Token": csrfToken } : {},
      body: JSON.stringify({
        areaLength: 20,
        areaWidth: 30,
        surfaceType: "natural-lawn",
        irrigationType: "drip",
        includeSoilPrep: true,
      }),
    });
    const estData = await estRes.json();
    extractCookies(estRes);
    assert(estRes.status === 200, "POST /api/planner/estimate returns 200 OK");
    assert(estData.data.areaSqFt === 600, "Estimator correctly computes area (20x30 = 600 sq ft)");
    assert(estData.data.totalEstimate > 0, "Estimator returns positive total cost");
    assert(Array.isArray(estData.data.breakdown), "Estimator provides itemized cost breakdown");
  } catch (err) {
    assert(false, `Estimator test failed: ${err.message}`);
  }

  // 5. Public Quote & Inquiry Submission with Unique Reference ID (needs CSRF token)
  try {
    const csrfToken = cookieStore.match(/csrf_token=([^;]+)/)?.[1];
    const inqRes = await fetchWithCookies(`${BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: csrfToken ? { "X-CSRF-Token": csrfToken } : {},
      body: JSON.stringify({
        name: "Test Client",
        phone: "+91 99999 88888",
        email: "test.client@example.com",
        serviceName: "Landscape Design and Planning",
        propertyType: "Residential Villa",
        areaSqFt: 1500,
        location: "Kothrud, Pune",
        budgetRange: "₹50,000 - ₹1,00,000",
        message: "Automated test quote inquiry.",
      }),
    });
    const inqData = await inqRes.json();
    extractCookies(inqRes);
    assert(inqRes.status === 201, "POST /api/inquiries returns 201 Created");
    assert(Boolean(inqData.referenceId), `Generated Reference ID: ${inqData.referenceId}`);
    assert(inqData.referenceId.startsWith("JLS-INQ-"), "Reference ID matches format JLS-INQ-XXXXX");
  } catch (err) {
    assert(false, `Inquiry submission failed: ${err.message}`);
  }

  // 6. Security & Unauthorized Admin Route Access (no cookies)
  try {
    const unauthRes = await fetch(`${BASE_URL}/api/inquiries`);
    assert(unauthRes.status === 401, "GET /api/inquiries without token returns 401 Unauthorized");

    const unauthStats = await fetch(`${BASE_URL}/api/analytics/stats`);
    assert(unauthStats.status === 401, "GET /api/analytics/stats without token returns 401 Unauthorized");
  } catch (err) {
    assert(false, `Security test failed: ${err.message}`);
  }

  // 7. Admin Authentication Flow (cookie-based)
  try {
    const loginRes = await fetchWithCookies(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: process.env.TEST_ADMIN_EMAIL || "admin@janailandscape.com",
        password: process.env.TEST_ADMIN_PASSWORD || "Admin@Janai2026",
      }),
    });
    const loginData = await loginRes.json();
    extractCookies(loginRes);
    assert(loginRes.status === 200, "POST /api/auth/login with valid credentials returns 200 OK");
    assert(Boolean(loginData.user), "Auth response contains user object");
    assert(loginData.user.role === "admin", "User role is confirmed as admin");

    // Test authorized admin route using cookies
    const adminStatsRes = await fetchWithCookies(`${BASE_URL}/api/analytics/stats`);
    const statsData = await adminStatsRes.json();
    assert(adminStatsRes.status === 200, "GET /api/analytics/stats with admin cookie returns 200 OK");
    assert(statsData.data.totalInquiries >= 0, "Admin stats provides real inquiry count");
  } catch (err) {
    assert(false, `Admin auth test failed: ${err.message}`);
  }

  console.log(`\n========================================`);
  console.log(`Total Tests Run: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
