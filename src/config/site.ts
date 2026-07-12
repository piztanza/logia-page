/// <reference types="vite/client" />

/**
 * Single source of truth for the site's external / third-party integrations.
 *
 * Per the architecture rubric, integration config lives here rather than being
 * scattered as inline string literals across section components:
 *   - Web3Forms endpoint + access key are read from Vite env (`import.meta.env`)
 *     and are NEVER hard-coded — ship `.env.example` with the variable NAMES only.
 *   - The WhatsApp business number + default greeting are centralised constants
 *     so the Contact section can stay presentational.
 */

/** WhatsApp business line backing the Contact section's secondary CTA. */
export const WHATSAPP_NUMBER = '6281318732870';

/** Prefilled greeting for the WhatsApp deep link. */
export const WHATSAPP_GREETING =
  "Hello Logia Initiative! I found your website and I'm interested in learning more about your services. I'd love to discuss a potential collaboration.";

/** Builds the `wa.me` deep link with the greeting URL-encoded into `?text=`. */
export const whatsAppHref = (
  number: string = WHATSAPP_NUMBER,
  text: string = WHATSAPP_GREETING,
): string => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export interface Web3FormsConfig {
  endpoint: string;
  accessKey: string;
}

/**
 * Reads the Web3Forms endpoint + access key from Vite env.
 *
 * Deliberately a function (not a module-scope constant) so the values are read
 * at call time — this keeps env stubbing (`vi.stubEnv`) in tests effective and
 * mirrors the original in-component read timing (inside the submit handler).
 */
export const getWeb3FormsConfig = (): Web3FormsConfig => ({
  endpoint: import.meta.env.VITE_WEB3FORMS_ENDPOINT,
  accessKey: import.meta.env.VITE_WEB3FORMS_KEY,
});
