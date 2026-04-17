const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const DEFAULT_RECAPTCHA_THRESHOLD = 0.5;
const RECAPTCHA_ACTION = "contact_submit";

type RecaptchaVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  [key: string]: unknown;
};

function getRecaptchaThreshold() {
  const rawThreshold = process.env.RECAPTCHA_V3_THRESHOLD?.trim();
  if (!rawThreshold) {
    return DEFAULT_RECAPTCHA_THRESHOLD;
  }

  const parsedThreshold = Number(rawThreshold);
  return Number.isFinite(parsedThreshold) ? parsedThreshold : DEFAULT_RECAPTCHA_THRESHOLD;
}

export async function verifyRecaptchaToken(token: string, remoteIp?: string | null) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();

  if (!secretKey) {
    return { ok: false as const, error: "reCAPTCHA is not configured yet." };
  }

  const payload = new URLSearchParams({
    secret: secretKey,
    response: token
  });

  if (remoteIp) {
    payload.set("remoteip", remoteIp);
  }

  let response: Response;
  try {
    response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload
    });
  } catch {
    return { ok: false as const, error: "Unable to verify reCAPTCHA right now. Please try again." };
  }

  let verification: RecaptchaVerifyResponse;
  try {
    verification = (await response.json()) as RecaptchaVerifyResponse;
  } catch {
    return { ok: false as const, error: "Unable to verify reCAPTCHA right now. Please try again." };
  }

  if (!response.ok || !verification.success) {
    return { ok: false as const, error: "reCAPTCHA verification failed. Please try again." };
  }

  if (verification.action !== RECAPTCHA_ACTION) {
    return { ok: false as const, error: "reCAPTCHA action mismatch. Please try again." };
  }

  const score = typeof verification.score === "number" ? verification.score : 0;
  if (score < getRecaptchaThreshold()) {
    return { ok: false as const, error: "Your message was flagged by reCAPTCHA. Please try again." };
  }

  return { ok: true as const };
}

export const recaptchaAction = RECAPTCHA_ACTION;