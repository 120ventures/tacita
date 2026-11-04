// Industry pages and personal links for the private outreach: tacita.at/3?name=Huber&von=Andrea
// Everything is optional. Without parameters the page is the public version.

export const BRANCHEN = ["kfz", "installateur", "tischler", "gastro", "handel", "friseur"] as const;
export type Branche = (typeof BRANCHEN)[number];

/**
 * Public paths are numbers (/1 … /6) so a recipient does not see their trade in the link.
 * The named paths (/gastro, /kfz, …) keep working for old links.
 */
export const BRANCHE_NUMMERN: Record<string, Branche> = {
  "1": "gastro",
  "2": "kfz",
  "3": "installateur",
  "4": "tischler",
  "5": "handel",
  "6": "friseur",
};

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

/** Resolves a path segment (/3 or /installateur) to an industry; undefined if it is neither. */
export const resolveBranche = (value: string | undefined): Branche | undefined => {
  const v = (value ?? "").toLowerCase();
  if (isBranche(v)) return v;
  return BRANCHE_NUMMERN[v];
};

/** The industry comes from the path (/3 or /gastro); ?branche=gastro still works for old links. */
export function readPersonalization(search: string, pathBranche?: string): Personalization {
  const params = new URLSearchParams(search);
  const brancheRaw = pathBranche ?? clean(params.get("branche"));
  return {
    name: clean(params.get("name")),
    branche: resolveBranche(brancheRaw),
    von: clean(params.get("von"), 30),
  };
}
