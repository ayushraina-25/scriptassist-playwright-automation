import { test, expect, request } from '@playwright/test';
import { loadEnvFile } from '../../utils/loadEnv';

loadEnvFile();

const baseUrl = process.env.BASE_URL?.replace(/\/$/, '') || '';
const authApiBase = 'https://staging-rpc-api-824772294646.europe-west2.run.app';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

test.describe('API - Auth', () => {
  test('should return an auth token for valid login', async () => {
    test.skip(!baseUrl || !email || !password, 'Set BASE_URL, EMAIL, and PASSWORD in your .env file to run this test.');

    const req = await request.newContext();
    const response = await req.post(`${authApiBase}/auth/login`, {
      data: {
        email,
        password,
        timezone: 'Asia/Calcutta',
        scope: {
          type: 'CLINIC',
          variant: 'SCRIPT_ASSIST'
        },
        platform: 'PATIENT'
      },
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    });

    const responseText = await response.text();

    if (response.status() === 401) {
      throw new Error(`Authentication failed for login endpoint. Status: ${response.status()}. Response: ${responseText}`);
    }

    expect([200, 201]).toContain(response.status());

    let body: any;

    try {
      body = JSON.parse(responseText);
    } catch (error) {
      console.error('Login endpoint did not return JSON:', responseText);
      throw new Error(`Expected JSON response from login endpoint, but received HTML response. Check the endpoint URL, headers, and payload.`);
    }

    expect(body).toBeTruthy();
    expect(body.success).toBe(true);
    expect(body.message).toBe('Login successful');
    expect(body.access_token).toBeTruthy();
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
    expect(body.user.email).toBe(email);

    await req.dispose();
  });
});
