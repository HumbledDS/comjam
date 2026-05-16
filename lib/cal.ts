/**
 * Cal.com configuration.
 * Set NEXT_PUBLIC_CAL_USERNAME in .env.local.
 * Each pack's calEvent (lib/copy.ts) must exist as an event type in your Cal.com account.
 */

export const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "";
export const PAYPAL_HANDLE = process.env.NEXT_PUBLIC_PAYPAL_HANDLE ?? "";

export const isCalConfigured = () => Boolean(CAL_USERNAME);
export const isPayPalConfigured = () => Boolean(PAYPAL_HANDLE);

export const calLink = (eventSlug: string) =>
  CAL_USERNAME ? `${CAL_USERNAME}/${eventSlug}` : "";

export const paypalLink = (amount: number, note?: string) => {
  if (!PAYPAL_HANDLE) return "";
  const params = note ? `?locale.x=fr_FR` : "";
  return `https://paypal.me/${PAYPAL_HANDLE}/${amount}EUR${params}`;
};
