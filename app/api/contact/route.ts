import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact API: RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "WhiteScreen Tools <contact@whitescreentools.com>",
      to: ["osagie.codes@gmail.com"],
      replyTo: email,
      subject: `New message from ${name || "Website visitor"}`,
      text: `From: ${name || "Anonymous"} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}

