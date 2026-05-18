import { NextResponse } from "next/server";

const isEmail = (s: unknown): s is string =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const { firstName, lastName, email, subject, message } = body;
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    !isEmail(email) ||
    typeof message !== "string" ||
    !firstName.trim() ||
    !lastName.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "contact@comjam.fr";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Com'Jam <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[contact stub] new submission", { firstName, lastName, email, subject, message });
    return NextResponse.json({ ok: true, stub: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const subjectLine = subject ? `Contact Com'Jam · ${subject}` : "Contact Com'Jam";
    const html = `
      <h2>Nouveau message Com'Jam</h2>
      <p><strong>De :</strong> ${escapeHtml(`${firstName} ${lastName}`)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Sujet :</strong> ${escapeHtml(String(subject ?? "-"))}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: subjectLine,
      html,
    });
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json({ error: "Envoi impossible." }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
