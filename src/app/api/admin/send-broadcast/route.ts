import { NextResponse } from "next/server";

type SubscriberFilterClause = { all: { type: string; ids: number[] }[] | null };

type SendBroadcastBody = {
  subject: string;
  previewText: string;
  contentHtml: string;
  sendAt: string;
  public?: boolean;
  description?: string;
};

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.ADMIN_SECRET;
  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "KIT_API_KEY not configured" }, { status: 503 });
  }

  let body: SendBroadcastBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body" }, { status: 400 });
  }

  if (!body.subject || !body.contentHtml || !body.sendAt) {
    return NextResponse.json(
      { error: "subject, contentHtml, and sendAt are required" },
      { status: 400 },
    );
  }

  const payload: Record<string, unknown> = {
    subject: body.subject,
    preview_text: body.previewText ?? "",
    content: body.contentHtml,
    description: body.description ?? body.subject,
    public: body.public ?? false,
    published_at: body.sendAt,
    send_at: body.sendAt,
    subscriber_filter: [] as SubscriberFilterClause[],
  };

  const res = await fetch("https://api.kit.com/v4/broadcasts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.errors ?? data?.message ?? "Kit API rejected the broadcast" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, broadcast: data?.broadcast });
}
