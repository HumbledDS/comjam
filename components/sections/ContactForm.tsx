"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function FormInner({ subjects }: { subjects: readonly string[] }) {
  const params = useSearchParams();
  const initialSubject = params.get("subject") === "bootcamp" ? subjects[0] : "";

  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Une erreur est survenue.");
      }
      setState("ok");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
      setState("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[rgba(255,255,255,0.04)] border border-[rgba(200,220,234,0.1)] p-12"
    >
      <div className="font-display text-2xl font-light italic text-beige mb-8">
        Envoyez-nous un message
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Marie"
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Dupont"
            required
            className="form-input"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="marie@email.fr"
          required
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
          Je suis intéressé(e) par
        </label>
        <select id="subject" name="subject" defaultValue={initialSubject} className="form-select">
          <option value="">Choisir un service…</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Dites-nous en quelques mots ce que vous cherchez…"
          required
          className="form-textarea"
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-beige text-blue border-0 py-[18px] font-sans text-[11px] font-semibold tracking-[2.5px] uppercase cursor-pointer mt-2 transition-all hover:bg-paper hover:tracking-[3px] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Envoi en cours…" : "Envoyer le message"}
      </button>

      {state === "ok" && (
        <p className="mt-5 text-[12px] text-blue-pale text-center">
          Merci ! Nous revenons vers vous sous 48h.
        </p>
      )}
      {state === "error" && (
        <p className="mt-5 text-[12px] text-red-300 text-center">
          {errorMsg || "Une erreur est survenue, réessayez ou écrivez-nous directement à contact@comjam.fr."}
        </p>
      )}
    </form>
  );
}

export function ContactForm({ subjects }: { subjects: readonly string[] }) {
  return (
    <Suspense fallback={<div className="h-[500px] bg-[rgba(255,255,255,0.04)]" />}>
      <FormInner subjects={subjects} />
    </Suspense>
  );
}
