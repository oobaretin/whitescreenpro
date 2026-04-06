"use client";

import { useState } from "react";

const CONTACT_EMAIL = "contact@whitescreentools.com";

type Status = "idle" | "opening" | "done";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("opening");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    const subject = encodeURIComponent(
      `WhiteScreen Tools contact${name ? ` from ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      `${message}\n\n---\nFrom: ${name || "(no name)"}\nReply-To: ${email}`,
    );
    const href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = href;
    setStatus("done");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <p className="text-sm text-gray-600">
        This opens your email app with your message addressed to{" "}
        <span className="font-medium text-gray-800">{CONTACT_EMAIL}</span>.
      </p>
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
      {status === "done" && (
        <p className="text-sm text-green-600">
          If your mail app didn&apos;t open, email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline font-medium"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === "opening"}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "opening" ? "Opening…" : "Open in email app"}
      </button>
    </form>
  );
}
