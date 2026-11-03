import { useEffect } from "react";
import { Link } from "react-router-dom";

// Company data as on 120.ventures/imprint (last checked 2026-11-03). Photo credits per iStock standard licence.
const credits = [
  { what: "Video „Ein Anruf. 15 Minuten.“ (Startseite)", who: "Ivan Veselkov", id: "2155571865" },
  { what: "Foto Gastronomie", who: "nortonrsx", id: "2236258679" },
  { what: "Foto Kfz-Werkstatt", who: "miodrag ignjatovic", id: "924893914" },
  { what: "Foto Installationsbetrieb", who: "Mariia Vitkovska", id: "2170643841" },
  { what: "Foto Tischlerei", who: "LSOphoto", id: "2247479509" },
  { what: "Foto Fachhandel", who: "andresr", id: "1586522918" },
];

const Impressum = () => {
  useEffect(() => {
    document.title = "Impressum – Tacita";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[720px] px-5 py-12 sm:px-10 sm:py-20">
        <Link to="/" className="text-sm font-medium text-primary hover:underline">
          ← Zurück zu Tacita
        </Link>
        <h1 className="mt-6 text-[32px] font-bold tracking-[-1px] sm:text-[40px]">Impressum</h1>
        <p className="mt-2 text-sm text-muted-foreground">Offenlegung gemäß § 25 Mediengesetz und § 5 E-Commerce-Gesetz</p>

        <section className="mt-10 space-y-1 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Medieninhaber und Diensteanbieter</h2>
          <p>120 Ventures GmbH</p>
          <p>Baumgasse 129, 1030 Wien, Österreich</p>
          <p>
            E-Mail:{" "}
            <a href="mailto:office@120.ventures" className="text-primary hover:underline">
              office@120.ventures
            </a>
          </p>
          <p>
            Web:{" "}
            <a href="https://www.120.ventures" className="text-primary hover:underline" rel="noreferrer">
              www.120.ventures
            </a>
          </p>
          <p>Firmenbuchnummer: FN 617650 · Firmenbuchgericht: Handelsgericht Wien</p>
          <p>UID-Nummer: ATU80155458</p>
          <p>Geschäftsführer: Sebastian Hermans</p>
          <p className="pt-2">
            Unternehmensgegenstand: Eigen- und Auftragsforschung zur Entwicklung von zukünftigen Geschäftsmodellen;
            Erbringung von Innovationsleistungen wie Konzept- und Prototypenentwicklung; Beteiligung an
            Forschungsprojekten.
          </p>
          <p className="pt-2">Tacita ist ein Projekt der 120 Ventures GmbH in der Konzeptphase.</p>
        </section>

        <section className="mt-10 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Bildnachweis</h2>
          <p className="mt-1">Alle Fotos und das Video stammen von iStock by Getty Images und werden unter der iStock-Standardlizenz genutzt.</p>
          <ul className="mt-3 space-y-1">
            {credits.map((c) => (
              <li key={c.id}>
                {c.what}: © iStock / {c.who} (Nr. {c.id})
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Terminbuchung</h2>
          <p className="mt-1">
            Die Terminbuchung auf dieser Seite läuft über Calendly (Calendly LLC, USA). Beim Laden des Kalenders werden
            Daten an Calendly übertragen; Details in deren Datenschutzerklärung.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Impressum;
