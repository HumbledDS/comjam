"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block text-[11px] font-medium tracking-[1.5px] uppercase text-text-light mb-2 transition-colors group-focus-within:text-blue"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full bg-transparent border-0 border-b border-beige-mid px-0 py-3 text-[15px] font-light text-blue placeholder:text-text-light/50 focus:outline-none focus:border-blue transition-colors";

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
        headers: { "Content-Type": "application/json; charset=utf-8" },
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
    <div className="bg-paper border-t-[3px] border-blue p-8 sm:p-12 relative">
      <AnimatePresence mode="wait">
        {state === "ok" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-blue text-beige flex items-center justify-center text-2xl font-display">
              ✓
            </div>
            <h3 className="font-display text-[28px] font-light text-blue mb-3 italic">
              Message bien reçu.
            </h3>
            <p className="text-[14px] font-light text-text-light leading-[1.7] max-w-sm mx-auto">
              Nous revenons vers vous sous 48h, du lundi au vendredi. À très vite.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-8 text-[11px] font-medium tracking-[2px] uppercase text-blue-light hover:text-blue transition-colors"
            >
              Envoyer un autre message →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field id="firstName" label="Prénom">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Marie"
                  required
                  autoComplete="given-name"
                  className={inputBase}
                />
              </Field>
              <Field id="lastName" label="Nom">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Dupont"
                  required
                  autoComplete="family-name"
                  className={inputBase}
                />
              </Field>
            </div>

            <Field id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="marie@email.fr"
                required
                autoComplete="email"
                className={inputBase}
              />
            </Field>

            <Field id="subject" label="Je suis intéressé·e par">
              <select
                id="subject"
                name="subject"
                defaultValue={initialSubject}
                className={`${inputBase} appearance-none cursor-pointer pr-6 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22 viewBox=%220 0 10 6%22><path d=%22M1 1l4 4 4-4%22 stroke=%22%231B3A5C%22 stroke-width=%221.2%22 fill=%22none%22/></svg>')] bg-no-repeat bg-[right_4px_center]`}
              >
                <option value="">— Choisir un service —</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="message" label="Votre message">
              <textarea
                id="message"
                name="message"
                placeholder="Dites-nous en quelques mots ce que vous cherchez…"
                required
                rows={4}
                className={`${inputBase} resize-none leading-relaxed`}
              />
            </Field>

            <button
              type="submit"
              disabled={state === "loading"}
              className="self-start mt-2 px-10 py-4 bg-blue text-beige text-[11px] font-medium tracking-[2.5px] uppercase cursor-pointer transition-all hover:bg-blue-mid hover:tracking-[3px] disabled:opacity-60 disabled:cursor-wait"
            >
              {state === "loading" ? "Envoi en cours…" : "Envoyer le message"}
            </button>

            {state === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[12px] text-red-700 font-light"
              >
                {errorMsg ||
                  "Une erreur est survenue. Écrivez-nous directement à contact@comjam.fr."}
              </motion.p>
            )}

            <p className="text-[11px] font-light text-text-light leading-relaxed mt-2">
              En envoyant ce message, vous acceptez d'être recontacté·e par email à propos de votre demande.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm({ subjects }: { subjects: readonly string[] }) {
  return (
    <Suspense fallback={<div className="h-[500px] bg-paper" />}>
      <FormInner subjects={subjects} />
    </Suspense>
  );
}
