import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { contactSubmissionSchema } from "@/lib/validation";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Invalid contact payload."
        },
        { status: 400 }
      );
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0]?.trim() : null;
    const recaptchaResult = await verifyRecaptchaToken(parsed.data.recaptchaToken, ipAddress);

    if (!recaptchaResult.ok) {
      return NextResponse.json({ error: recaptchaResult.error }, { status: 403 });
    }

    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json(
        {
          error:
            "Contact service is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable submissions."
        },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      source: "portfolio_web",
      ip_address: ipAddress
    });

    if (error) {
      return NextResponse.json({ error: "Failed to save your message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unexpected server error while sending message." }, { status: 500 });
  }
}