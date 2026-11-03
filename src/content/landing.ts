// Copy for the fake-door landing page (validation plan, Track 3), for owners before a hand-over (segment D).
// Layout and copy follow the Figma file "Tacita Landingpage" (GzbHAa9hXQu7Vci5mI4t2i), Variante A.
// An HR/QM page (Variante B) can reuse this structure later.

interface Stat {
  stat: string;
  text: string;
  source: string;
}

// What the phone mockup in the results section shows: one question to the company memory and the answer
// in the owner's words, with the call it came from.
export interface ChatDemo {
  business: string;
  topics: string;
  q1: string;
  a1: string;
  source1: string;
  q2: string;
}

export interface LandingContent {
  title: string;
  pillTag: string;
  pill: string;
  pillShort: string;
  headline: [string, string];
  subline: string;
  emailPlaceholder: string;
  navSecondary: { label: string; href: string };
  heroCards: {
    question: { label: string; text: string; mobileText: string };
    quote: { label: string; text: string; mobileText: string };
    tags: { label: string; tags: string[] };
    status: { label: string; text: string };
  };
  heroProof: string[];
  trades?: string[];
  problem: { title: string; subtitle: string; points: Stat[] };
  video: { pill: string; title: string; text: string; cardLabel: string; cardText: string };
  dossier: { eyebrow: string; title: string; points: string[] };
  memory: { eyebrow: string; title: string; points: string[] };
  chat: ChatDemo;
  founding: {
    pill: string;
    title: string;
    subtitle: string;
    badge: string;
    pricePrefix: string;
    price: string;
    priceUnit: string;
    deposit: string;
  };
  faq: { q: string; a: string }[];
  booking: {
    pill: string;
    title: string;
    subtitle: string;
    personal: string;
    note: string;
    host: { name: string; role: string; line: string; image: string };
  };
  closing: { title: string; subtitle: string };
}

// Andrea's Erstgespräch calendar. Override with VITE_CALENDLY_URL in .env.local.
export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/andrea-buttinger-120/new-meeting-3";
// Stripe payment link for the deposit. Without it the deposit buttons lead to the booking section.
export const DEPOSIT_URL = import.meta.env.VITE_DEPOSIT_URL || "";
export const SAMPLE_DOSSIER_URL = import.meta.env.VITE_SAMPLE_DOSSIER_URL || "#ergebnis";

// Industry pages (/gastro, /kfz, …). Each preset swaps headline, subline, hero cards, the band image and the
// result points so the page reads like it was written for that trade. Keys must match BRANCHEN in src/lib/personalize.ts.
// Images: drop a 1600×900 JPG at public/branchen/<key>.jpg; until it exists the page shows the default video.
export interface BranchePreset {
  label: string;
  pill: string;
  headline: [string, string];
  subline: string;
  image: string;
  imageAlt: string;
  /** CSS object-position: keeps the face in view when the band is cropped (wide on desktop, tall on phones). */
  imagePosition: string;
  question: string;
  mobileQuestion: string;
  quoteLabel: string;
  quote: string;
  mobileQuote: string;
  tags: string[];
  video: { title: string; text: string; cardLabel: string };
  dossierPoints: string[];
  memoryPoints: string[];
  closingTitle: string;
  chat: ChatDemo;
}

export const branchen: Record<string, BranchePreset> = {
  kfz: {
    label: "Kfz-Werkstatt",
    pill: "Für Kfz-Werkstätten",
    headline: ["Werkstatt übergeben.", "Wissen behalten."],
    subline:
      "Stammkunden, Lieferanten, Pickerl-Routine, die Eigenheiten jeder Hebebühne: Tacita interviewt Sie am Telefon über alles, was nur Sie wissen, und macht daraus ein Übergabe-Dossier für Ihre Nachfolge.",
    image: "/branchen/kfz.jpg",
    imagePosition: "58% 22%",
    imageAlt: "Mechaniker in einer Kfz-Werkstatt am Telefon",
    question: "Erzählen Sie mir vom letzten Mal, als Großkunde Huber unzufrieden war. Was haben Sie gemacht?",
    mobileQuestion: "Wann war Großkunde Huber zuletzt unzufrieden?",
    quoteLabel: "Inhaber, 63 · Kfz-Werkstatt",
    quote: "Da ruf ich nie im Büro an, sondern direkt beim Polier am Handy. Und vor Ostern nie liefern.",
    mobileQuote: "Nie im Büro anrufen, direkt beim Polier am Handy.",
    tags: ["Kunde Huber", "Ansprechpartner", "Lieferfenster"],
    video: {
      title: "Ein Anruf. 15 Minuten. Zwischen zwei Autos.",
      text: "Kein Termin im Büro, keine App, kein Formular. Wir rufen an, wann es in der Werkstatt passt, und fragen nach echten Fällen: Kunden, Teilelieferanten, Prüfstelle.",
      cardLabel: "Gespräch 3 von 10 · Teilelieferanten",
    },
    dossierPoints: [
      "Stammkunden und Flottenkunden, und was jeder von ihnen erwartet",
      "Teilelieferanten, Konditionen und wer bei Engpässen schnell liefert",
      "Pickerl, Prüfstelle, Behörden: Fristen und Ansprechpartner",
    ],
    memoryPoints: [
      "Durchsuchbar: „Welches Öl nimmt der Huber-Transporter?“",
      "Eigenheiten der Hebebühnen, Geräte und Spezialwerkzeuge",
      "Wissens-Hotline für die ersten Monate",
    ],
    closingTitle: "Ihre Werkstatt ist mehr wert als die Hebebühnen.",
    chat: {
      business: "Kfz Huber",
      topics: "52 Themen · 10 Gespräche",
      q1: "Welches Öl nimmt der Transporter vom Huber?",
      a1: "Der Huber-Transporter kriegt immer das 5W-30 vom Fass, nicht das aus dem Regal. Und beim Service den Innenraumfilter gleich mit, das will er so.",
      source1: "Inhaber · Gespräch 4 · 12. März",
      q2: "Und wer macht bei uns die Pickerl-Nachkontrolle?",
    },
  },
  installateur: {
    label: "Installationsbetrieb",
    pill: "Für Installationsbetriebe",
    headline: ["Betrieb übergeben.", "Anlagenwissen behalten."],
    subline:
      "Welche Heizung im Gemeindeamt zickt, welche Hausverwaltung sofort zahlt, wo der Absperrhahn im Altbau sitzt: Tacita interviewt Sie am Telefon und macht daraus ein Übergabe-Dossier für Ihre Nachfolge.",
    image: "/branchen/installateur.jpg",
    imagePosition: "66% 18%",
    imageAlt: "Installateur im Heizungskeller am Telefon",
    question: "Welche Anlage im Bestand macht am meisten Ärger, und was wissen nur Sie darüber?",
    mobileQuestion: "Welche Anlage macht am meisten Ärger?",
    quoteLabel: "Inhaber, 61 · Installateur",
    quote: "Die Heizung im Gemeindeamt: Den Mischer nie auf Automatik, sonst steht sie im Winter. Steht nirgends.",
    mobileQuote: "Den Mischer im Gemeindeamt nie auf Automatik.",
    tags: ["Anlage Gemeindeamt", "Wartungsfalle", "Ersatzteile"],
    video: {
      title: "Ein Anruf. 15 Minuten. Auch auf der Baustelle.",
      text: "Kein Termin im Büro, keine App, kein Formular. Wir rufen an, wann es Ihnen passt, und fragen nach echten Anlagen: welche Heizung, welcher Kunde, welche Eigenheit.",
      cardLabel: "Gespräch 3 von 10 · Wartungskunden",
    },
    dossierPoints: [
      "Wartungskunden und Hausverwaltungen, und wer wie betreut wird",
      "Anlagen im Bestand mit ihren Eigenheiten und Ersatzteilen",
      "Großhändler, Konditionen und Notfall-Lieferanten",
    ],
    memoryPoints: [
      "Durchsuchbar: „Was ist mit der Therme in der Hauptstraße 12?“",
      "Fallen bei alten Anlagen, die nirgends dokumentiert sind",
      "Wissens-Hotline für die ersten Monate",
    ],
    closingTitle: "Ihr Anlagenwissen ist Teil des Kaufpreises.",
    chat: {
      business: "Installationen Berger",
      topics: "47 Themen · 9 Gespräche",
      q1: "Was ist mit der Heizung im Gemeindeamt?",
      a1: "Die Heizung im Gemeindeamt: Den Mischer nie auf Automatik stellen, sonst steht sie im Winter. Der Amtsleiter, der Herr Pichler, ruft direkt am Handy an.",
      source1: "Inhaber · Gespräch 6 · 3. April",
      q2: "Welche Hausverwaltung zahlt immer sofort?",
    },
  },
  tischler: {
    label: "Tischlerei",
    pill: "Für Tischlereien",
    headline: ["Tischlerei übergeben.", "Wissen behalten."],
    subline:
      "Wie Sie eine Küche kalkulieren, welcher Furnierlieferant nicht wirft, welcher Architekt immer Sonderwünsche hat: Tacita interviewt Sie am Telefon und macht daraus ein Übergabe-Dossier für Ihre Nachfolge.",
    image: "/branchen/tischler.jpg",
    imagePosition: "58% 22%",
    imageAlt: "Tischlermeister in der Werkstatt am Telefon",
    question: "Wie kalkulieren Sie eine Einbauküche, bei der der Kunde noch nicht weiß, was er will?",
    mobileQuestion: "Wie kalkulieren Sie eine unklare Küche?",
    quoteLabel: "Inhaber, 64 · Tischlerei",
    quote: "Beim Furnier nur vom Lieferanten in Linz, der Rest wirft. Und beim Architekten Mayer immer 15 % drauf.",
    mobileQuote: "Furnier nur aus Linz, beim Architekten 15 % drauf.",
    tags: ["Lieferant Furnier", "Kalkulation", "Architekt Mayer"],
    video: {
      title: "Ein Anruf. 15 Minuten. Zwischen Zuschnitt und Montage.",
      text: "Kein Termin im Büro, keine App, kein Formular. Wir rufen an, wann es in der Werkstatt passt, und fragen nach echten Aufträgen: Kalkulation, Lieferanten, Maschinen.",
      cardLabel: "Gespräch 3 von 10 · Kalkulation",
    },
    dossierPoints: [
      "Kalkulation: wie Sie Aufträge bepreisen und wo die Fallen liegen",
      "Lieferanten für Platten, Furnier und Beschläge, mit Konditionen",
      "Architekten, Planer und Stammkunden, und was jeder erwartet",
    ],
    memoryPoints: [
      "Durchsuchbar: „Welche Kante nehmen wir beim Mayer?“",
      "Eigenheiten von CNC, Kantenleimer und Lackieranlage",
      "Wissens-Hotline für die ersten Monate",
    ],
    closingTitle: "Ihre Tischlerei ist mehr wert als die Maschinen.",
    chat: {
      business: "Tischlerei Mayr",
      topics: "44 Themen · 9 Gespräche",
      q1: "Welche Kante nehmen wir beim Architekten Mayer?",
      a1: "Beim Mayer immer die 2-mm-ABS-Kante in Anthrazit, nie die dünne. Und 15 % auf die Kalkulation drauf, weil er dreimal umplant.",
      source1: "Inhaber · Gespräch 5 · 21. März",
      q2: "Wo bestellen wir das Furnier?",
    },
  },
  gastro: {
    label: "Gasthaus",
    pill: "Für Gasthäuser und Hotels",
    headline: ["Gasthaus übergeben.", "Wissen behalten."],
    subline:
      "Rezepturen, Lieferanten, Stammtische, Saisonplanung: Was nur Sie und Ihre Küche wissen, interviewt Tacita am Telefon und macht daraus ein Übergabe-Dossier für Ihre Nachfolge oder Ihren Käufer.",
    image: "/branchen/gastro.jpg",
    imagePosition: "56% 12%",
    imageAlt: "Wirtin in der Gaststube am Telefon",
    question: "Was passiert in der Küche, wenn Sie eine Woche nicht da sind? Wo hakt es zuerst?",
    mobileQuestion: "Was hakt zuerst, wenn Sie nicht da sind?",
    quoteLabel: "Wirtin, 62 · Gasthaus",
    quote: "Das Fleisch kommt vom Bauern in Gaming, nicht vom Großhandel. Und die Stammtischrunde am Donnerstag kriegt den Tisch beim Fenster.",
    mobileQuote: "Fleisch vom Bauern in Gaming, Stammtisch am Fenster.",
    tags: ["Lieferant Fleisch", "Stammgäste", "Saisonplanung"],
    video: {
      title: "Ein Anruf. 15 Minuten. Vor dem Mittagsgeschäft.",
      text: "Kein Termin im Büro, keine App, kein Formular. Wir rufen an, wann es im Betrieb passt, und fragen nach echten Fällen: Lieferanten, Stammgäste, Feste, Saison.",
      cardLabel: "Gespräch 3 von 10 · Lieferanten",
    },
    dossierPoints: [
      "Lieferanten für Fleisch, Gemüse, Wein und Getränke, mit Konditionen",
      "Stammgäste, Stammtische und Feste, und wer was erwartet",
      "Saisonplanung, Personal, Behörden und Brauereivertrag",
    ],
    memoryPoints: [
      "Durchsuchbar: „Wer liefert den Fisch am Freitag?“",
      "Rezepturen und Abläufe der Küche in den Worten der Wirtsleute",
      "Wissens-Hotline für die ersten Monate",
    ],
    closingTitle: "Ihr Gasthaus ist mehr wert als die Einrichtung.",
    chat: {
      business: "Gasthaus Huber",
      topics: "58 Themen · 11 Gespräche",
      q1: "Wer liefert den Fisch am Freitag?",
      a1: "Der Fisch kommt vom Gruber in Gaming, Bestellung bis Mittwoch 12 Uhr, am Handy, nicht per Mail. Und im Sommer die Saiblinge, nicht die Forellen.",
      source1: "Wirtin · Gespräch 3 · 8. März",
      q2: "Welcher Tisch gehört dem Stammtisch am Donnerstag?",
    },
  },
  handel: {
    label: "Fachhandel",
    pill: "Für den Fachhandel",
    headline: ["Geschäft übergeben.", "Wissen behalten."],
    subline:
      "Lieferantenkonditionen, Sortiment, Schlüsselkunden, Saison: Tacita interviewt Sie am Telefon über alles, was nur Sie wissen, und macht daraus ein Übergabe-Dossier für Ihre Nachfolge oder Ihren Käufer.",
    image: "/branchen/handel.jpg",
    imagePosition: "62% 18%",
    imageAlt: "Inhaber eines Fachgeschäfts im Laden am Telefon",
    question: "Welche Konditionen haben Sie mit Ihren drei wichtigsten Lieferanten ausgehandelt, und warum?",
    mobileQuestion: "Welche Konditionen haben Ihre Top-3-Lieferanten?",
    quoteLabel: "Inhaber, 60 · Fachhandel",
    quote: "Beim Hauptlieferanten gilt noch der Rabatt von 2009, aber nur, solange ich bestelle. Das weiß dort auch keiner mehr.",
    mobileQuote: "Der Rabatt von 2009 gilt nur, solange ich bestelle.",
    tags: ["Lieferantenkonditionen", "Sortiment", "Schlüsselkunden"],
    video: {
      title: "Ein Anruf. 15 Minuten. Nach Ladenschluss.",
      text: "Kein Termin im Büro, keine App, kein Formular. Wir rufen an, wann es im Geschäft passt, und fragen nach echten Fällen: Lieferanten, Sortiment, Schlüsselkunden.",
      cardLabel: "Gespräch 3 von 10 · Lieferanten",
    },
    dossierPoints: [
      "Lieferanten, Konditionen und mündliche Absprachen, die nirgends stehen",
      "Sortiment: was läuft, was nicht, und warum",
      "Schlüsselkunden, Saison und Aktionen, die den Umsatz tragen",
    ],
    memoryPoints: [
      "Durchsuchbar: „Welchen Rabatt haben wir beim Hauptlieferanten?“",
      "Bestellrhythmus und Eigenheiten der Lieferanten",
      "Wissens-Hotline für die ersten Monate",
    ],
    closingTitle: "Ihr Geschäft ist mehr wert als die Ware im Regal.",
    chat: {
      business: "Fachhandel Huber",
      topics: "49 Themen · 10 Gespräche",
      q1: "Welchen Rabatt haben wir beim Hauptlieferanten?",
      a1: "Beim Hauptlieferanten gilt noch der Rabatt von 2009, 18 % plus 3 % Skonto. Das steht in keinem Vertrag, der Herr Lang im Außendienst weiß es.",
      source1: "Inhaber · Gespräch 4 · 14. März",
      q2: "Wann bestellen wir die Saisonware?",
    },
  },
};

export const navLinks = [
  { label: "So funktioniert’s", href: "#ablauf" },
  { label: "Ergebnis", href: "#ergebnis" },
  { label: "Für wen", href: "#fuer-wen" },
  { label: "Erstgespräch", href: "#erstgespraech" },
  { label: "FAQ", href: "#faq" },
];

export const steps = [
  {
    title: "Erstgespräch",
    text: "20 Minuten am Telefon: Wir klären, welches Wissen gesichert werden muss, bis wann, und wer es später braucht.",
  },
  {
    title: "Telefon-Interviews",
    text: "8–15 Anrufe à 15 Minuten, wann es Ihnen passt, auch im Auto. Wir fragen nach echten Fällen, nicht nach Theorie.",
  },
  {
    title: "Dossier & Archiv",
    text: "Sie bekommen ein Übergabe-Dossier und ein durchsuchbares Archiv. Ihre Nachfolge fragt das Archiv statt Sie.",
  },
];

// One offer, one price (see founding). These cards only show the three ways a hand-over happens.
export const handoverCases = [
  {
    eyebrow: "Verkauf",
    title: "Verkauf an Dritte",
    text: "Käufer, Bank und Steuerberatung sehen im Dossier, dass der Betrieb ohne Sie läuft. Das stützt den Preis.",
    focus: "Kunden, Lieferanten, Kalkulation",
  },
  {
    eyebrow: "Familie",
    title: "Übergabe in der Familie",
    text: "Die nächste Generation kennt den Betrieb, aber nicht jede Absprache. Das Archiv ersetzt das ständige Nachfragen.",
    focus: "Absprachen, Eigenheiten, Ansprechpartner",
  },
  {
    eyebrow: "Team",
    title: "Übergabe im Team",
    text: "Wenn der Meister oder die Büroleitung übernimmt, steht alles an einem Ort, was bisher nur über Ihren Schreibtisch lief.",
    focus: "Büro, Behörden, Bank, Verträge",
  },
];

export const trustPoints = [
  {
    icon: "EU",
    title: "EU-Hosting",
    text: "Aufnahmen und Daten bleiben in der EU. Zugriff nur für Personen, die Sie festlegen.",
  },
  {
    icon: "§",
    title: "Transparent nach AI Act",
    text: "Klar gekennzeichnet, keine Emotionserkennung, keine Bewertung von Personen.",
  },
  {
    icon: "✓",
    title: "Betriebsrat-tauglich",
    text: "Vorlage für die Betriebsvereinbarung inklusive. Teilnahme immer freiwillig.",
  },
  {
    icon: "Aa",
    title: "Mehrsprachig",
    text: "Interviews auch auf Türkisch, BKS oder Polnisch. Dokumentiert wird auf Deutsch.",
  },
];

export const foundingIncludes = [
  "Jedes Interview auf Ihren Betrieb vorbereitet",
  "Persönliche Begleitung durch das Team",
  "Start der Interviews innerhalb von 2 Wochen",
  "Übergabe-Dossier für Käufer, Bank und Nachfolge",
  "Firmengedächtnis für Ihre Nachfolge",
];

const whoInterviews = {
  q: "Wer führt die Interviews?",
  a: "Wissbert, unser KI-Interviewer. Er ruft Sie an, stellt die Fragen und hört zu, wie ein Kollege aus dem Fach, geduldig und ohne zu bewerten. Unser Team bereitet jedes Gespräch auf Ihren Betrieb vor, liest jede Antwort gegen und baut daraus Dossier und Firmengedächtnis.",
};

export const content: LandingContent = {
  title: "Tacita – Betrieb übergeben, Wissen behalten",
  pillTag: "Neu",
  pill: "Übergabe-Interviews per Telefon · Made in Wien",
  pillShort: "Made in Wien",
  headline: ["Betrieb übergeben.", "Wissen behalten."],
  subline:
    "Tacita interviewt Sie in kurzen Telefonaten über alles, was nur Sie wissen, und macht daraus ein Übergabe-Dossier und ein Nachschlagewerk für Ihre Nachfolge.",
  emailPlaceholder: "Ihre E-Mail-Adresse",
  navSecondary: { label: "Beispiel-Dossier", href: SAMPLE_DOSSIER_URL },
  heroCards: {
    question: {
      label: "Tacita-Interview · Gespräch 4 von 10",
      text: "Erzählen Sie mir vom letzten Mal, als Großkunde Huber unzufrieden war. Was haben Sie gemacht?",
      mobileText: "Wann war Großkunde Huber zuletzt unzufrieden?",
    },
    quote: {
      label: "Inhaber, 63 · Kfz-Werkstatt",
      text: "Da ruf ich nie im Büro an, sondern direkt beim Polier am Handy. Und vor Ostern nie liefern.",
      mobileText: "Nie im Büro anrufen, direkt beim Polier am Handy.",
    },
    tags: { label: "Ins Dossier übernommen", tags: ["Kunde Huber", "Ansprechpartner", "Lieferfenster"] },
    status: { label: "Fortschritt", text: "38 von 52 Themen erfasst · noch ca. 4 Anrufe" },
  },
  heroProof: ["Nur telefonieren, keine App", "Echte Fälle statt Formulare", "Dossier für Käufer und Bank"],
  trades: ["Kfz-Werkstätten", "Installateure", "Tischlereien", "Gastronomie", "Fachhandel"],
  problem: {
    title: "Das wichtigste Wissen Ihres Betriebs steht nirgends.",
    subtitle: "Es steckt in Ihrem Kopf. Und genau das drückt den Preis, wenn Sie übergeben.",
    points: [
      { stat: "52.500", text: "österreichische Betriebe stehen bis 2034 vor der Übergabe.", source: "WKO" },
      {
        stat: "20–40 %",
        text: "Abschlag beim Verkaufspreis, wenn der Betrieb am Wissen der Inhaber:innen hängt.",
        source: "IHK-Studie 2025",
      },
      { stat: "2 von 3", text: "Inhaber:innen sagen: Eine Nachfolge zu finden ist schwierig.", source: "IHK-Studie 2025" },
    ],
  },
  video: {
    pill: "So einfach ist das",
    title: "Ein Anruf. 15 Minuten. Auch auf der Baustelle.",
    text: "Kein Termin im Büro, keine App, kein Formular. Wir rufen an, wann es Ihnen passt, und fragen nach echten Fällen aus Ihrem Alltag.",
    cardLabel: "Gespräch 3 von 10 · Lieferanten",
    cardText: "Ins Dossier übernommen",
  },
  dossier: {
    eyebrow: "Für Käufer, Bank & Steuerberatung",
    title: "Das Übergabe-Dossier",
    points: [
      "Kunden, Lieferanten und Absprachen, die nirgends stehen",
      "Abläufe, Preise und Eigenheiten des Betriebs",
      "Zeigt: Das Wissen ist übertragbar, nicht an Sie gebunden",
    ],
  },
  memory: {
    eyebrow: "Für Ihre Nachfolge",
    title: "Das Firmengedächtnis",
    points: [
      "Durchsuchbar: Frage stellen, Antwort in Ihren Worten",
      "Jede Antwort mit Quelle: aus welchem Gespräch sie stammt",
      "Wissens-Hotline für die ersten Monate",
    ],
  },
  founding: {
    pill: "Jetzt starten",
    title: "Sichern Sie Ihren Platz für die Übergabe",
    subtitle: "Persönliche Begleitung vom Erstgespräch bis zum fertigen Dossier. Die Interviews starten innerhalb von 2 Wochen.",
    badge: "Begrenzte Plätze pro Monat",
    pricePrefix: "",
    price: "Erstgespräch",
    priceUnit: "20 Minuten, kostenlos. Danach bekommen Sie ein Angebot für Ihre Übergabe.",
    deposit: "",
  },
  faq: [
    whoInterviews,
    {
      q: "Wie viel Zeit kostet mich das?",
      a: "8–15 Gespräche à 15 Minuten über einige Wochen. Insgesamt meist unter vier Stunden, verteilt so, wie es in Ihren Alltag passt.",
    },
    {
      q: "Brauche ich eine App oder einen Computer?",
      a: "Nein. Wir rufen Sie auf Ihrem normalen Telefon an. Das Dossier bekommen Sie als PDF, das Archiv öffnet Ihre Nachfolge im Browser.",
    },
    {
      q: "Was kostet es?",
      a: "Das besprechen wir im Erstgespräch, abhängig von der Größe Ihres Betriebs und der Zahl der Gespräche. Das Erstgespräch selbst ist kostenlos.",
    },
    {
      q: "Woher kommt der Name Tacita?",
      a: "Von „tacit knowledge“, dem stillen Wissen: alles, was man kann und weiß, aber nie aufgeschrieben hat. Genau dieses Wissen holt Tacita aus dem Kopf in ein Dossier. Tacita war außerdem in Rom die Göttin der Stille.",
    },
  ],
  chat: {
    business: "Betrieb Huber",
    topics: "52 Themen · 10 Gespräche",
    q1: "Wen rufe ich an, wenn der Großkunde Huber reklamiert?",
    a1: "Beim Huber nie im Büro anrufen, direkt beim Polier am Handy. Und vor Ostern nie liefern, da ist die Baustelle zu.",
    source1: "Inhaber · Gespräch 4 · 12. März",
    q2: "Welche Lieferanten haben Konditionen, die nirgends stehen?",
  },
  booking: {
    pill: "Kostenloses Erstgespräch",
    title: "In 20 Minuten wissen Sie, ob es passt",
    subtitle:
      "Ein kurzes Telefonat, kostenlos und unverbindlich: Wir klären, welches Wissen bei Ihrer Übergabe gesichert werden muss, und Sie bekommen eine ehrliche Einschätzung, ob Tacita für Ihren Betrieb Sinn macht.",
    personal: "{von} hat Ihnen diesen Link geschickt. Wählen Sie einfach eine Zeit, die Ihnen passt.",
    note: "Termin wählen, fertig. Sie bekommen sofort eine Bestätigung per E-Mail, kein Rückruf nötig.",
    host: {
      name: "Andrea Buttinger",
      role: "Tacita, Wien",
      line: "Das Gespräch führen Sie mit mir. Ich höre zu, stelle Fragen und sage Ihnen ehrlich, ob Tacita für Sie passt.",
      image: "/andrea.jpg",
    },
  },
  closing: {
    title: "Ihr Wissen ist Teil des Kaufpreises.",
    subtitle: "Sichern Sie es, bevor Sie gehen. Das Erstgespräch dauert 20 Minuten und ist kostenlos.",
  },
};
