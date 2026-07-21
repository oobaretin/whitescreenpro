"use client";

import { useState } from "react";

const CONTACT_EMAIL = "contact@whitescreentools.com";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const inputClass =
  "w-full rounded-lg border border-card bg-page/5 px-3 py-2.5 text-sm text-page placeholder:text-page/45 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)]";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const showConfigHint =
    process.env.NODE_ENV === "development" && !accessKey;

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
      setErrorMessage(
        data.message || "Could not send your message. Please try again.",
      );
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showConfigHint && (
        <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
          Add{" "}
          <code className="text-xs">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code> to{" "}
          <code className="text-xs">.env.local</code> to test locally.
        </p>
      )}

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-page mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-page mb-1.5">
            Email <span className="text-page/50">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-page mb-1.5">
          Message <span className="text-page/50">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[7rem]`}
          placeholder="How can we help?"
        />
      </div>

      {status === "success" && (
        <p
          className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2"
          role="status"
        >
          Thanks — your message was sent. We&apos;ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p
          className="text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2"
          role="alert"
        >
          {errorMessage}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline font-medium text-[color:var(--accent-color)]"
          >
            Email us directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "var(--accent-color)" }}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
