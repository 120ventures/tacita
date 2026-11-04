import { useEffect } from "react";
import { Link } from "react-router-dom";

// What the site actually does (checked 2026-11-04): static hosting on Netlify, Google Fonts from Google's servers,
// the Calendly booking embed, and plain email contact. No cookies, no analytics, no forms of our own.
const Datenschutz = () => {
  useEffect(() => {
    document.title = "Datenschutz – Tacita";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[720px] px-5 py-12 sm:px-10 sm:py-20">
        <Link to="/" className="text-sm font-medium text-primary hover:underline">
          ← Zurück zu Tacita
        </Link>
        <h1 className="mt-6 text-[32px] font-bold tracking-[-1px] sm:text-[40px]">Datenschutzerklärung</h1>
        <p className="mt-2 text-sm text-muted-foreground">Stand: 4. November 2026</p>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Verantwortlicher</h2>
          <p>120 Ventures GmbH, Baumgasse 129, 1030 Wien, Österreich</p>
          <p>
            E-Mail:{" "}
            <a href="mailto:office@120.ventures" className="text-primary hover:underline">
              office@120.ventures
            </a>
          </p>
          <p>
            Tacita ist ein Projekt der 120 Ventures GmbH in der Konzeptphase. Diese Website informiert über das Vorhaben und
            ermöglicht die Buchung eines Erstgesprächs. Es gibt noch kein Produkt und keine Kundendaten aus Interviews.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Was diese Website nicht tut</h2>
          <p>
            Wir setzen keine Cookies, verwenden keine Analyse- oder Tracking-Dienste und betreiben keine eigenen Formulare.
            Wir erstellen keine Nutzungsprofile.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Hosting und Server-Logfiles</h2>
          <p>
            Die Website wird bei Netlify, Inc. (San Francisco, USA) gehostet. Beim Aufruf verarbeitet Netlify technisch
            notwendige Daten wie IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, Browser und Betriebssystem in
            Server-Logfiles. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen Betrieb
            (Art. 6 Abs. 1 lit. f DSGVO). Netlify ist unter dem EU-US Data Privacy Framework zertifiziert; die
            Datenverarbeitung ist durch einen Auftragsverarbeitungsvertrag geregelt.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Schriftarten (Google Fonts)</h2>
          <p>
            Die Schriftart Inter wird von Servern von Google Ireland Ltd. geladen. Dabei erhält Google Ihre IP-Adresse.
            Rechtsgrundlage ist unser berechtigtes Interesse an einer einheitlichen Darstellung (Art. 6 Abs. 1 lit. f
            DSGVO). Wenn Sie das vermeiden möchten, blockieren Sie in Ihrem Browser Verbindungen zu fonts.googleapis.com;
            die Seite bleibt lesbar.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Terminbuchung (Calendly)</h2>
          <p>
            Das Erstgespräch buchen Sie über einen eingebetteten Kalender von Calendly LLC (Atlanta, USA). Beim Laden des
            Kalenders wird Ihre IP-Adresse an Calendly übertragen. Wenn Sie einen Termin buchen, verarbeitet Calendly die
            Angaben, die Sie dort machen (Name, E-Mail-Adresse, gewählter Termin, optionale Nachricht) und übermittelt sie
            an uns. Wir nutzen diese Daten ausschließlich zur Vorbereitung und Durchführung des Gesprächs. Rechtsgrundlage
            ist die Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Calendly ist
            unter dem EU-US Data Privacy Framework zertifiziert. Details:{" "}
            <a href="https://calendly.com/legal/privacy-notice" className="text-primary hover:underline" rel="noreferrer">
              Datenschutzerklärung von Calendly
            </a>
            .
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Persönliche Links</h2>
          <p>
            Wenn wir Ihnen einen persönlichen Link schicken, kann dieser Ihren Namen enthalten, damit die Seite Sie
            anspricht. Der Name wird nur im Browser angezeigt und von uns nicht gespeichert.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Kontakt per E-Mail</h2>
          <p>
            Wenn Sie uns per E-Mail schreiben, speichern wir Ihre Nachricht und Ihre Kontaktdaten, um Ihre Anfrage zu
            beantworten (Art. 6 Abs. 1 lit. b und f DSGVO). Wir geben diese Daten nicht weiter. Wir löschen sie, sobald
            der Zweck erfüllt ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen. Wenn Sie keine weiteren
            Nachrichten von uns möchten, genügt eine kurze Antwort.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-[15px] leading-[1.6] text-body">
          <h2 className="text-lg font-semibold text-foreground">Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Schreiben Sie dafür an{" "}
            <a href="mailto:office@120.ventures" className="text-primary hover:underline">
              office@120.ventures
            </a>
            . Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei
            der Österreichischen Datenschutzbehörde beschweren (
            <a href="https://www.dsb.gv.at" className="text-primary hover:underline" rel="noreferrer">
              dsb.gv.at
            </a>
            ).
          </p>
        </section>
      </main>
    </div>
  );
};

export default Datenschutz;
