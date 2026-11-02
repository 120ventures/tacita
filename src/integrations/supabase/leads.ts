// Stores an email from the landing page before the visitor is sent on to the booking calendar.
// Without VITE_SUPABASE_URL the call is a no-op, so the page works without a backend.

export interface LeadInput {
  email: string;
  name?: string;
  branche?: string;
  ref?: string;
}

const configured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export async function saveLead(lead: LeadInput): Promise<void> {
  if (!configured) return;
  try {
    // Loaded lazily: the client throws at import time when the URL is missing.
    const { supabase } = await import("./client");
    const { error } = await supabase.from("leads").insert({
      email: lead.email,
      name: lead.name || null,
      branche: lead.branche || null,
      ref: lead.ref || null,
      page_path: window.location.pathname + window.location.search,
    });
    if (error) console.warn("lead not saved", error.message);
  } catch (e) {
    console.warn("lead not saved", e);
  }
}
