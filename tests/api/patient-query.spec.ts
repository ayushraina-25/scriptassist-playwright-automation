import { test, expect } from '@playwright/test';

// Configure via env var or fall back to the token from your curl example
const BEARER = process.env.PATIENT_API_BEARER ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkzNDgyLCJqdGkiOiIzNGIwODdjYy04NWQ2LTQyMjUtYWM5ZC0zZGMwMDc3NTNiM2EiLCJjb250ZXh0Ijp7InR5cGUiOiJDTElOSUMiLCJtZW1iZXJzaGlwSWQiOjI5NDQ3LCJvcmdhbml6YXRpb25JZCI6Nywicm9sZSI6IlBBVElFTlQiLCJzdGF0dXMiOiJQRU5ESU5HIiwiaWQiOjMyMDM5LCJyb2xlcyI6IlBBVElFTlQiLCJzY29wZVR5cGUiOiJDTElOSUMifSwicm9sZVR5cGUiOiJQQVRJRU5UIiwicm9sZUVudGl0eUlkIjo0MDI4NzY4LCJzZXNzaW9uSWQiOjQ2ODM0LCJpYXQiOjE3ODUzMDc4OTEsImV4cCI6MTc4NTMzNjY5MX0.BzP36QjpuUFf7ZkL_k5SZFxBcRYfr2B9_sIzw2d94NE';

// Endpoint from the curl — kept as-is
const URL =
  "https://staging-entity-api-824772294646.europe-west2.run.app/patient/query?where%5BuserId%5D=93482&where%5BclinicId%5D=7&relations%5Buser%5D=true&relations%5BclinicMembership%5D=true&relations%5BpharmacyMembership%5D=true&relations%5Baddresses%5D%5Baddress%5D=true&relations%5BidentificationFiles%5D=true&relations%5Bindications%5D%5BmedicalIndication%5D=true&take=1";

test.describe('API - Patient query', () => {
  test('returns patient and contains expected fields', async ({ request }) => {
    test.skip(!BEARER, 'Set PATIENT_API_BEARER env var to run this test.');

    const res = await request.get(URL, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${BEARER}`,
        Origin: 'https://scriptassist-staging-patient.scriptassist.co.uk',
      },
    });

    if (!res.ok()) {
      const text = await res.text();
      console.log('PATIENT QUERY FAILED', res.status(), res.statusText(), text);
    }

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    const patient = body[0];

    // Validate presence of key fields
    expect(patient).toHaveProperty('firstName');
    expect(patient).toHaveProperty('lastName');
    expect(patient).toHaveProperty('email');
    expect(patient).toHaveProperty('title');
    expect(patient).toHaveProperty('sex');

    // If you want to assert exact values, adjust these constants
    const expected = {
      firstName: 'Ayush',
      lastName: 'Raina',
      email: 'ayush.rainafc1@gmail.com',
      title: 'Mr.',
      sex: 'MALE',
    };

    expect(patient.firstName).toBe(expected.firstName);
    expect(patient.email).toBe(expected.email);
    expect(patient.title).toBe(expected.title);
    expect(patient.sex).toBe(expected.sex);
  });
});
