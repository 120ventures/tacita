// Industry pages and personal links for the private outreach: tacita.at/gastro?name=Huber&von=Andrea
// Everything is optional. Without parameters the page is the public version.

export const BRANCHEN = ["kfz", "installateur", "tischler", "gastro", "handel"] as const;
export type Branche = (typeof BRANCHEN)[number];

export interface Personalization {
  /** Family or business name as it should appear on the page, e.g. "Huber" or "Familie Huber". */
  name: string;
  /** Industry preset for the hero cards. */
  branche?: Branche;
  /** First name of the person who sent the link, shown in the booking section. */
  von: string;
}

const clean = (value: string | null, max = 40) =>
  (value ?? "")
    .replace(/[<>"'`]/g, "")
    .trim()
    .slice(0, max);

export const isBranche = (value: string | undefined): value is Branche =>
  !!value && (BRANCHEN as readonly string[]).includes(value);

/** The industry comes from the path (/gastro); ?branche=gastro still works for old links. */
export function readPersonalization(search: string, pathBranche?: string): Personalization {
  const params = new URLSearchParams(search);
  const brancheRaw = (pathBranche ?? clean(params.get("branche"))).toLowerCase();
  return {
    name: clean(params.get("name")),
    branche: isBranche(brancheRaw) ? brancheRaw : undefined,
    von: clean(params.get("von"), 30),
  };
}
