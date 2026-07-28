import { test, expect, request } from '@playwright/test';

const authApiBase = 'https://staging-rpc-api-824772294646.europe-west2.run.app';
const accessToken = process.env.ACCESS_TOKEN || '';

test.describe('API - User Agreements', () => {
  test('should fetch user agreements for an authenticated user', async () => {
    test.skip(!accessToken, 'Set ACCESS_TOKEN in your .env file to run this test.');

    const req = await request.newContext();
    const response = await req.get(`${authApiBase}/auth/user-agreements`, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`
      }
    });

    const responseText = await response.text();

    if (response.status() === 401) {
      throw new Error(`Authentication failed for user agreements endpoint. Status: ${response.status()}. Response: ${responseText}`);
    }

    expect([200, 304]).toContain(response.status());

    // 304 Not Modified responses don't have a body, so skip JSON parsing
    if (response.status() === 304) {
      await req.dispose();
      return;
    }

    let body: any;

    try {
      body = JSON.parse(responseText);
    } catch (error) {
      throw new Error(`Expected JSON response from user agreements endpoint, but received: ${responseText}`);
    }

    expect(body).toBeTruthy();
    expect(typeof body.agreedToTerms).toBe('boolean');
    expect(typeof body.agreedToEULA).toBe('boolean');
    expect(typeof body.agreedToProTerms).toBe('boolean');

    await req.dispose();
  });
});
