import { NextResponse } from 'next/server';

const FIREBASE_SCOPE = 'https://www.googleapis.com/auth/datastore';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { customerName, phone, email, category, requirement, address, notes } = payload;

    if (!customerName || !phone) {
      return NextResponse.json({ ok: false, error: 'Name and phone are required.' }, { status: 400 });
    }

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    if (!serviceAccount.client_email || !serviceAccount.private_key || !serviceAccount.project_id) {
      return NextResponse.json({ ok: false, error: 'Server not configured for lead capture.' }, { status: 500 });
    }

    const businessId = process.env.FIREBASE_BUSINESS_ID || '';
    if (!businessId) {
      return NextResponse.json({ ok: false, error: 'Server not configured for lead capture.' }, { status: 500 });
    }

    const accessToken = await getAccessToken(serviceAccount);
    const leadId = crypto.randomUUID();
    const now = new Date().toISOString();

    const lead = {
      id: leadId,
      customerName,
      phone,
      category: payload.category || 'Residential',
      leadDate: now.slice(0, 10),
      address: address || '',
      requirement: requirement || '',
      visitStatus: 'Not Scheduled',
      visitDateTime: '',
      quotationStatus: 'Quote Required',
      quotationAmount: '',
      followUpStage: 'New Enquiry',
      nextFollowUpDate: '',
      closureStatus: 'Open',
      lostReason: '',
      paymentStatus: 'Not Applicable',
      paymentReceived: '',
      notes: buildNotes(notes, email),
      source: 'website',
      createdAt: now,
      updatedAt: now,
      createdBy: 'website',
      updatedBy: 'website',
      businessId
    };

    const url = `https://firestore.googleapis.com/v1/projects/${serviceAccount.project_id}/databases/(default)/documents/businesses/${businessId}/leads/${leadId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: toFirestoreFields(lead) })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firestore write failed:', errorText);
      return NextResponse.json({ ok: false, error: 'Submission failed.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, lead: { id: leadId } });
  } catch (error) {
    console.error('submit-lead error:', error);
    return NextResponse.json({ ok: false, error: 'Submission failed.' }, { status: 500 });
  }
}

function buildNotes(notes: string, email: string): string {
  const parts: string[] = [];
  if (notes) parts.push(notes);
  if (email) parts.push(`Email: ${email}`);
  return parts.length ? parts.join(' · ') : 'Website enquiry';
}

async function getAccessToken(serviceAccount: {
  client_email: string;
  private_key: string;
  project_id: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: FIREBASE_SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claimSet));
  const signingInput = `${encodedHeader}.${encodedClaim}`;

  const signature = await signRsaSha256(signingInput, serviceAccount.private_key);
  const jwt = `${signingInput}.${signature}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('OAuth token exchange failed:', errorText);
    throw new Error('Failed to obtain access token');
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string };
  return tokenData.access_token;
}

async function signRsaSha256(data: string, privateKeyPem: string): Promise<string> {
  const pem = privateKeyPem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s+/g, '');

  const binary = base64ToArrayBuffer(pem);
  const key = await crypto.subtle.importKey(
    'pkcs8',
    binary,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    new TextEncoder().encode(data)
  );

  return base64UrlEncodeBuffer(signature);
}

function toFirestoreFields(obj: Record<string, unknown>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      fields[key] = { integerValue: String(value) };
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
    } else if (value === null) {
      fields[key] = { nullValue: null };
    } else if (Array.isArray(value)) {
      fields[key] = { arrayValue: { values: value.map((item) => toFirestoreValue(item)) } };
    } else if (typeof value === 'object') {
      fields[key] = { mapValue: { fields: toFirestoreFields(value as Record<string, unknown>) } };
    }
  }
  return fields;
}

function toFirestoreValue(value: unknown): unknown {
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'number') return { integerValue: String(value) };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (value === null) return { nullValue: null };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } };
  if (typeof value === 'object') return { mapValue: { fields: toFirestoreFields(value as Record<string, unknown>) } };
  return { nullValue: null };
}

function base64UrlEncode(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncodeBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}