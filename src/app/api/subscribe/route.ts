import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json(
      { error: "Newsletter isn't configured yet — missing Kit credentials." },
      { status: 503 },
    );
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  // Kit's "add to form" endpoint only accepts subscribers that already
  // exist on the account, so a new subscriber has to be created first.
  const createRes = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email }),
  });

  if (!createRes.ok) {
    const detail = await createRes.json().catch(() => null);
    return NextResponse.json(
      { error: detail?.errors?.[0] ?? detail?.message ?? "Subscription failed. Try again in a moment." },
      { status: 502 },
    );
  }

  const addRes = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email }),
  });

  if (!addRes.ok) {
    const detail = await addRes.json().catch(() => null);
    return NextResponse.json(
      { error: detail?.errors?.[0] ?? detail?.message ?? "Subscription failed. Try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
