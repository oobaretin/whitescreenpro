"use client";

import { useState } from "react";

const CONTACT_EMAIL = "contact@whitescreentools.com";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const isConfigured = Boolean(accessKey);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Contact form is not configured yet. Email us directly instead.",
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `WhiteScreen Tools contact${name ? ` from ${name}` : ""}`,
          from_name: "WhiteScreen Tools",
          botcheck: formData.get("botcheck"),
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (data.success) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setErrorMessage(data.message || "Could not send your message. Please try again.");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <p className="text-sm text-gray-600">
        Send a message and we&apos;ll reply to your email. Messages go to{" "}
        <span className="font-medium text-gray-800">{CONTACT_EMAIL}</span>.
      </p>

      {!isConfigured && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          Form delivery isn&apos;t active until{" "}
          <code className="text-xs">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code> is
          set in Vercel (or <code className="text-xs">.env.local</code> locally).
        </p>
      )}

      {/* Honeypot — hidden from users, catches bots (Web3Forms botcheck) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How can we help?"
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-green-600" role="status">
          Thanks — your message was sent. We&apos;ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline font-medium"
          >
            Email us directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
