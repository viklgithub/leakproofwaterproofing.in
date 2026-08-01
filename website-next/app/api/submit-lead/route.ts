import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch('http://127.0.0.1:8766/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Submission failed' }, { status: 500 });
  }
}
