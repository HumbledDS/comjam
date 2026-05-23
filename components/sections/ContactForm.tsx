"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Brand-styled service picker. Wraps a hidden <select name="subject"> so the
 * form payload is unchanged, but the visible UI is a custom listbox styled in
 * Com'Jam beige/blue (the native <option> list is OS-painted and can't be
 * themed properly).
 */
function ServiceSelect({
  subjects,
  defaultValue,
  name,
  id,
}: {
  subjects: readonly string[];
  defaultValue: string;
  name: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Hidden native select keeps the form payload identical and screen-reader friendly */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      >
        <option value="">Choisir un service</option>
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 border-b border-beige-mid py-3 text-left text-[15px] font-light text-blue cursor-pointer focus:outline-none focus:border-blue transition-colors"
      >
        <span className={value ? "text-blue" : "text-text-light/70"}>
          {value || "Choisir un service"}
        </span>
        <span
          className={`text-blue text-xs transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30 mt-2 w-full bg-beige border border-beige-mid shadow-[0_18px_40px_-12px_rgba(13,32,53,0.25)] max-h-[280px] overflow-y-auto"
          >
            {subjects.map((s) => {
              const active = s === value;
              return (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setValue(s);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-[13.5px] font-light leading-snug transition-colors cursor-pointer border-l-2 ${
                      active
                        ? "bg-paper text-blue border-blue-light"
                        : "text-blue-mid border-transparent hover:bg-paper hover:border-blue-light hover:text-blue"
                    }`}
                  >
                    {s}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

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
              <ServiceSelect
                id="subject"
                name="subject"
                defaultValue={initialSubject}
                subjects={subjects}
              />
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

            <p className="text-[11px] font-light text-text-light leading-relaxed mt-2 max-w-md">
              En envoyant ce message, vous acceptez d&apos;être recontacté·e
              par email à propos de votre&nbsp;demande.
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
