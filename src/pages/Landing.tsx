import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FileText, Menu, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import siteCallVideo from "@/assets/site-call.mp4";
import siteCallPoster from "@/assets/site-call-poster.jpg";
import {
  CALENDLY_URL,
  DEPOSIT_URL,
  branchen,
  handoverCases,
  foundingIncludes,
  navLinks,
  steps,
  trustPoints,
  content,
  type LandingContent,
} from "@/content/landing";
import { isBranche, readPersonalization, type Personalization } from "@/lib/personalize";
import NotFound from "./NotFound";
import { saveLead } from "@/integrations/supabase/leads";

// The calendar is embedded on the page, so every booking button jumps to it.
const BOOK_HREF = "#erstgespraech";
// Without a payment link the deposit buttons lead to the booking as well.
const DEPOSIT_HREF = DEPOSIT_URL || BOOK_HREF;

// Calendly prefills name and email from the query string; the rest is styling and tracking.
const calendlyEmbedUrl = (p: Personalization, email: string) => {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("hide_landing_page_details", "1");
  url.searchParams.set("primary_color", "0b9a72");
  url.searchParams.set("text_color", "0c1a17");
  url.searchParams.set("background_color", "ffffff");
  url.searchParams.set("utm_source", "tacita.at");
  url.searchParams.set("utm_medium", p.von ? "personal-link" : "website");
  if (p.name) {
    url.searchParams.set("name", p.name);
    url.searchParams.set("utm_content", p.name);
  }
  if (email) url.searchParams.set("email", email);
  return url.toString();
};

// Logo mark: five voice bars, same idea as the hero waveform. Kept in sync with public/favicon.svg.
const LogoMark = ({ className }: { className?: string }) => {
  // The logo renders in header and footer, so each instance needs its own gradient id.
  const gradientId = useId();
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fd1a5" />
          <stop offset="1" stopColor="#0b9a72" />
        </linearGradient>
      </defs>
      {[
        [1, 9, 8],
        [6.25, 5, 16],
        [11.5, 1, 24],
        [16.75, 6, 14],
        [22, 8.5, 9],
      ].map(([x, y, h]) => (
        <rect key={x} x={x} y={y} width="3" height={h} rx="1.5" fill={`url(#${gradientId})`} />
      ))}
    </svg>
  );
};

const Logo = ({ small = false }: { small?: boolean }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark className={small ? "size-[22px]" : "size-[26px]"} />
    <span className={cn("font-bold text-foreground", small ? "text-[19px] tracking-[-0.5px]" : "text-[22px] tracking-[-0.6px]")}>
      Tacita
    </span>
  </span>
);

const Pill = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("inline-flex rounded-full bg-accent px-3 py-1.5 text-[11px] font-semibold text-primary sm:text-[13px]", className)}>
    {children}
  </span>
);

const Check = ({ className }: { className?: string }) => (
  <span aria-hidden className={cn("font-bold text-primary", className)}>
    ✓
  </span>
);

const Section = ({
  id,
  muted = false,
  children,
}: {
  id?: string;
  muted?: boolean;
  children: ReactNode;
}) => (
  <section id={id} className={cn("scroll-mt-20 px-5 py-9 sm:px-10 sm:py-20 lg:px-16 lg:py-[104px]", muted && "bg-secondary")}>
    <div className="mx-auto max-w-[1312px]">{children}</div>
  </section>
);

const SectionHeader = ({ pill, title, subtitle }: { pill: string; title: string; subtitle?: string }) => (
  <div className="flex flex-col items-center text-center">
    <Pill className="mb-3 sm:mb-[18px]">{pill}</Pill>
    <h2 className="max-w-[860px] text-[28px] font-bold leading-[1.15] tracking-[-0.9px] sm:text-[46px] sm:leading-[1.12] sm:tracking-[-1.4px]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 max-w-[640px] text-base leading-[1.55] text-muted-foreground sm:text-lg">{subtitle}</p>
    )}
  </div>
);

const Card = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("rounded-[18px] border bg-card p-5 shadow-[0_1px_1px_rgba(12,26,23,0.04)] sm:rounded-[20px] sm:p-8", className)}>
    {children}
  </div>
);

const FloatingCard = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div
    className={cn(
      "absolute rounded-[14px] border bg-card px-3 py-2.5 shadow-[0_12px_16px_rgba(12,26,23,0.08)] sm:rounded-2xl sm:px-4 sm:py-3.5",
      className,
    )}
  >
    {children}
  </div>
);

const Header = ({ v }: { v: LandingContent }) => (
  <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-2.5 sm:px-10 sm:py-5 lg:px-16">
      <div className="flex items-center gap-12">
        <Link to="/" aria-label="Tacita Startseite">
          <span className="sm:hidden">
            <Logo small />
          </span>
          <span className="hidden sm:inline">
            <Logo />
          </span>
        </Link>
        <nav className="hidden gap-8 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-medium text-body hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <Button asChild variant="outline" className="hidden h-10 rounded-[10px] px-4 font-semibold sm:inline-flex">
          <a href={v.navSecondary.href}>{v.navSecondary.label}</a>
        </Button>
        <Button asChild variant="ink" className="h-[34px] rounded-[9px] px-3 text-[13px] font-semibold sm:h-10 sm:rounded-[10px] sm:px-4 sm:text-sm">
          <a href={BOOK_HREF}>
            <span className="sm:hidden">Erstgespräch</span>
            <span className="hidden sm:inline">Erstgespräch buchen</span>
          </a>
        </Button>
        <Sheet>
          <SheetTrigger className="ml-1.5 lg:hidden" aria-label="Menü öffnen">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menü</SheetTitle>
            <nav className="mt-10 flex flex-col gap-5">
              {[...navLinks, v.navSecondary].map((l) => (
                <SheetClose asChild key={l.label}>
                  <a href={l.href} className="text-lg font-medium">
                    {l.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
);

const EmailBooking = ({ placeholder, onBooked }: { placeholder: string; onBooked: (email: string) => void }) => {
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // The lead is stored in the background; the visitor goes straight to the calendar.
    onBooked(email);
    document.getElementById("erstgespraech")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-[560px] flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-2xl sm:border sm:border-primary sm:bg-card sm:py-1.5 sm:pl-5 sm:pr-1.5 sm:shadow-[0_0_0_6px_rgba(11,154,114,0.08)]"
    >
      <label htmlFor="hero-email" className="sr-only">
        E-Mail-Adresse
      </label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="h-[50px] rounded-[14px] border border-primary bg-card px-4 text-[15px] shadow-[0_0_0_5px_rgba(11,154,114,0.08)] outline-none placeholder:text-subtle sm:h-auto sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:shadow-none"
      />
      <Button type="submit" size="xl">
        Erstgespräch buchen →
      </Button>
    </form>
  );
};

// Bar heights for the voice waveform: loud in the middle, quieter at the edges, a little irregular like speech.
const WAVE_BAR_COUNT = 29;
const WAVE_BARS = Array.from({ length: WAVE_BAR_COUNT }, (_, i) => {
  const envelope = Math.sin((Math.PI * i) / (WAVE_BAR_COUNT - 1)) ** 0.8;
  const jitter = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
  return {
    height: Math.round(100 * Math.max(0.12, envelope * jitter)),
    duration: 0.8 + ((i * 37) % 5) * 0.12,
    delay: -((i * 0.13) % 1.1),
  };
});

const VoiceWave = () => (
  <div aria-hidden className="absolute left-1/2 top-[84px] flex -translate-x-1/2 flex-col items-center sm:top-[40px]">
    <div className="flex h-[84px] items-center gap-[4px] sm:h-[180px] sm:gap-[6px]">
      {WAVE_BARS.map((b, i) => (
        <span
          key={i}
          className="tacita-wave-bar w-[5px] rounded-full sm:w-[6px]"
          style={{ height: `${b.height}%`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
    <span className="mt-5 hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_2px_4px_rgba(12,26,23,0.05)] sm:flex">
      <span className="size-1.5 animate-pulse rounded-full bg-primary" />
      Live-Gespräch · 08:42
    </span>
  </div>
);

const Hero = ({ v, onBooked }: { v: LandingContent; onBooked: (email: string) => void }) => {
  const c = v.heroCards;
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-8 pt-6 sm:px-10 sm:pb-14 sm:pt-[72px]">
      <div
        aria-hidden
        className="tacita-glow absolute left-[-260px] top-[80px] hidden size-[720px] rounded-full lg:block"
        style={{ "--glow": "rgba(79,209,165,0.2)" } as CSSProperties}
      />
      <div
        aria-hidden
        className="tacita-glow absolute right-[-280px] top-[-60px] hidden size-[760px] rounded-full lg:block"
        style={{ "--glow": "rgba(11,154,114,0.13)" } as CSSProperties}
      />

      <div className="relative mx-auto flex max-w-[1040px] flex-col items-center text-center">
        <div className="flex items-center gap-2 rounded-full border bg-card py-[5px] pl-[5px] pr-3 shadow-[0_2px_4px_rgba(12,26,23,0.05)] sm:gap-2.5 sm:py-2 sm:pl-2 sm:pr-4">
          <span className="rounded-full bg-accent px-2 py-[3px] text-[11px] font-semibold text-primary sm:px-2.5 sm:py-1 sm:text-xs">
            {v.pillTag}
          </span>
          <span className="text-xs text-body sm:text-sm">
            <span className="sm:hidden">{v.pillShort}</span>
            <span className="hidden sm:inline">{v.pill}</span>
          </span>
        </div>

        <h1 className="mt-6 text-[36px] font-bold min-[400px]:text-[40px] leading-[1.08] tracking-[-1.4px] sm:mt-[30px] sm:text-[56px] lg:text-[68px] lg:tracking-[-2.2px]">
          {v.headline[0]}
          <br />
          <span className="text-primary">{v.headline[1]}</span>
        </h1>
        <p className="mt-4 max-w-[720px] text-base leading-[1.5] text-muted-foreground sm:mt-6 sm:text-xl sm:leading-[1.55]">
          {v.subline}
        </p>

        {/* Voice waveform with floating interview cards. Mobile shows two cards, desktop all four. */}
        <div className="relative mt-4 h-[270px] w-full max-w-[362px] text-left sm:mt-10 sm:h-[320px] sm:max-w-[1040px]">
          <div
            aria-hidden
            className="tacita-glow absolute left-1/2 top-[-60px] size-[420px] -translate-x-1/2 rounded-full sm:top-[-70px] sm:size-[440px]"
            style={{ "--glow": "rgba(79,209,165,0.28)" } as CSSProperties}
          />
          <VoiceWave />

          <FloatingCard className="left-0 top-0 w-[230px] sm:left-[10px] sm:top-[20px] sm:w-[330px]">
            <p className="flex items-center gap-1.5 pb-1 text-[11px] font-semibold text-primary sm:pb-1.5 sm:text-xs">
              <span className="size-1.5 rounded-full bg-primary sm:size-[7px]" />
              {c.question.label}
            </p>
            <p className="text-[12.5px] leading-[1.4] text-body sm:text-sm">
              <span className="sm:hidden">{c.question.mobileText}</span>
              <span className="hidden sm:inline">{c.question.text}</span>
            </p>
          </FloatingCard>

          <FloatingCard className="right-0 top-[180px] w-[220px] sm:top-0 sm:w-[320px] lg:right-0">
            <p className="pb-1 text-[11px] font-semibold text-subtle sm:pb-1.5 sm:text-xs">{c.quote.label}</p>
            <p className="text-[12.5px] leading-[1.4] text-body sm:text-sm">
              <span className="sm:hidden">{c.quote.mobileText}</span>
              <span className="hidden sm:inline">{c.quote.text}</span>
            </p>
          </FloatingCard>

          <FloatingCard className="hidden w-[280px] sm:left-[30px] sm:top-[210px] sm:block lg:left-[80px]">
            <p className="text-xs font-semibold text-primary">{c.tags.label}</p>
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {c.tags.tags.map((t) => (
                <span key={t} className="rounded-full border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </FloatingCard>

          <FloatingCard className="hidden w-[290px] sm:right-[30px] sm:top-[190px] sm:block lg:right-[50px]">
            <p className="pb-1.5 text-xs font-semibold text-primary">{c.status.label}</p>
            <p className="text-sm leading-[1.45] text-body">{c.status.text}</p>
          </FloatingCard>
        </div>

        <div className="mt-1.5 flex w-full justify-center sm:mt-8">
          <EmailBooking placeholder={v.emailPlaceholder} onBooked={onBooked} />
        </div>

        <ul className="mt-5 hidden flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-muted-foreground md:flex">
          {v.heroProof.map((p) => (
            <li key={p} className="flex items-center gap-1.5">
              <Check className="text-[13px]" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {v.trades && (
        <ul className="relative mt-16 hidden flex-wrap justify-center gap-x-8 gap-y-2 md:flex">
          {v.trades.map((t) => (
            <li key={t} className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
              {t}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const VideoBand = ({ v }: { v: LandingContent }) => {
  const ref = useRef<HTMLVideoElement>(null);

  // Respect reduced motion: show the poster frame instead of a looping video.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);

  return (
    <section className="px-5 pt-9 sm:px-10 sm:pt-20 lg:px-16 lg:pt-[104px]">
      <div className="relative mx-auto aspect-[4/5] max-w-[1312px] overflow-hidden rounded-[20px] bg-foreground sm:aspect-[16/9] sm:rounded-3xl lg:aspect-[21/9]">
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover object-[62%_center]"
          src={siteCallVideo}
          poster={siteCallPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent sm:bg-gradient-to-r sm:from-foreground/85 sm:via-foreground/40" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:inset-y-0 sm:flex sm:max-w-[560px] sm:flex-col sm:justify-end sm:p-12 lg:justify-center lg:p-16">
          <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold backdrop-blur sm:text-[13px]">
            {v.video.pill}
          </span>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.9px] sm:mt-[18px] sm:text-[40px] sm:tracking-[-1.2px] lg:text-[46px] lg:tracking-[-1.4px]">
            {v.video.title}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.55] text-white/80 sm:mt-4 sm:text-lg">{v.video.text}</p>
        </div>

        <div className="absolute right-8 top-8 hidden rounded-2xl border bg-card px-4 py-3.5 text-left shadow-[0_12px_16px_rgba(12,26,23,0.08)] md:block lg:right-12 lg:top-12">
          <p className="flex items-center gap-1.5 pb-1.5 text-xs font-semibold text-primary">
            <span className="size-[7px] animate-pulse rounded-full bg-primary" />
            {v.video.cardLabel}
          </p>
          <p className="flex items-center gap-2 text-sm text-body">
            <Check />
            {v.video.cardText}
          </p>
        </div>
      </div>
    </section>
  );
};

// Small scenes for the three steps: a booked call, a running interview, the finished dossier.
const MiniCard = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("w-full max-w-[260px] rounded-xl border bg-card p-4 shadow-[0_8px_16px_rgba(12,26,23,0.06)]", className)}>
    {children}
  </div>
);

const SceneCall = () => (
  <MiniCard>
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
        <Phone className="size-[18px]" />
      </span>
      <div>
        <p className="text-sm font-semibold">Erstgespräch</p>
        <p className="text-xs text-muted-foreground">20 Min. · Telefon oder Video</p>
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs">
      <span className="font-medium">Di, 10:30</span>
      <span className="flex items-center gap-1 font-semibold text-primary">
        <Check className="text-[11px]" /> bestätigt
      </span>
    </div>
  </MiniCard>
);

const SCENE_BARS = WAVE_BARS.filter((_, i) => i % 2 === 0);

const SceneInterview = () => (
  <MiniCard>
    <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
      <span className="size-[7px] animate-pulse rounded-full bg-primary" />
      Gespräch 4 von 10 · 07:12
    </p>
    <div aria-hidden className="mt-3 flex h-10 items-center gap-[3px]">
      {SCENE_BARS.map((b, i) => (
        <span
          key={i}
          className="tacita-wave-bar w-[4px] rounded-full"
          style={{ height: `${b.height}%`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
    <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-xs leading-snug text-body">
      „Und wen rufen Sie an, wenn die Hebebühne ausfällt?“
    </p>
  </MiniCard>
);

const SceneDossier = () => (
  <div className="relative w-full max-w-[260px]">
    <MiniCard className="max-w-none">
      <div className="flex items-center gap-2">
        <FileText className="size-[18px] text-primary" />
        <p className="text-sm font-semibold">Übergabe-Dossier</p>
        <span className="ml-auto text-xs text-muted-foreground">42 Seiten</span>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-11/12 rounded bg-muted" />
        <div className="h-1.5 w-8/12 rounded bg-muted" />
        <div className="h-1.5 w-10/12 rounded bg-muted" />
        <div className="h-1.5 w-7/12 rounded bg-muted" />
      </div>
    </MiniCard>
    <div className="absolute -bottom-4 -right-2 flex items-center gap-1.5 rounded-full border bg-card py-1.5 pl-2.5 pr-3 text-xs text-body shadow-[0_8px_16px_rgba(12,26,23,0.08)]">
      <Search className="size-3.5 text-primary" />
      Lieferant für Bremsen?
    </div>
  </div>
);

const STEP_SCENES = [SceneCall, SceneInterview, SceneDossier];

const Faq = ({ items }: { items: LandingContent["faq"] }) => (
  <AccordionPrimitive.Root type="single" collapsible defaultValue={items[0].q} className="mx-auto flex max-w-[860px] flex-col gap-3">
    {items.map((f) => (
      <AccordionPrimitive.Item key={f.q} value={f.q} className="group rounded-2xl border bg-card px-5 py-[18px] sm:px-[26px] sm:py-[22px]">
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger className="flex w-full items-start justify-between gap-4 text-left text-base font-semibold sm:text-[17px]">
            {f.q}
            <span aria-hidden className="font-normal text-subtle group-data-[state=open]:hidden">
              +
            </span>
            <span aria-hidden className="hidden font-normal text-subtle group-data-[state=open]:inline">
              –
            </span>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <p className="pt-2.5 text-[15px] leading-6 text-muted-foreground">{f.a}</p>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
);

// Embedded Calendly calendar. Loads lazily so the page stays fast for visitors who only read.
const Booking = ({ v, p, email }: { v: LandingContent; p: Personalization; email: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="erstgespraech">
      <SectionHeader pill={v.booking.pill} title={v.booking.title} subtitle={v.booking.subtitle} />
      {p.von && (
        <p className="mx-auto mt-4 max-w-[560px] rounded-2xl bg-accent px-5 py-3 text-center text-[15px] text-primary">
          {v.booking.personal.replace("{von}", p.von)}
        </p>
      )}
      <div
        ref={ref}
        className="mx-auto mt-6 w-full max-w-[1000px] overflow-hidden rounded-[20px] border bg-card sm:mt-10 sm:rounded-3xl"
      >
        {visible ? (
          <iframe
            key={email}
            title="Erstgespräch buchen"
            src={calendlyEmbedUrl(p, email)}
            className="h-[760px] w-full sm:h-[720px]"
          />
        ) : (
          <div className="flex h-[760px] items-center justify-center text-sm text-muted-foreground sm:h-[720px]">
            Kalender wird geladen …
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-[13px] text-subtle">
        {v.booking.note}{" "}
        <a href={calendlyEmbedUrl(p, email)} target="_blank" rel="noreferrer" className="underline hover:text-foreground">
          Kalender in neuem Fenster öffnen
        </a>
      </p>
    </Section>
  );
};

const Landing = () => {
  // Personal links (?name=Huber&branche=kfz&von=Andrea) swap the hero example and greet the visitor.
  const { branche: pathBranche } = useParams();
  const p = useMemo(() => readPersonalization(window.location.search, pathBranche), [pathBranche]);
  const v = useMemo<LandingContent>(() => {
    const b = p.branche ? branchen[p.branche] : undefined;
    return {
      ...content,
      pillTag: p.name ? "Persönlich" : b ? b.label : content.pillTag,
      pill: p.name ? `Für ${p.name} · Übergabe-Interviews per Telefon` : b ? `${b.pill} · Übergabe-Interviews per Telefon` : content.pill,
      pillShort: p.name ? `Für ${p.name}` : b ? b.pill : content.pillShort,
      heroCards: b
        ? {
            ...content.heroCards,
            question: { ...content.heroCards.question, text: b.question, mobileText: b.mobileQuestion },
            quote: { label: b.quoteLabel, text: b.quote, mobileText: b.mobileQuote },
            tags: { ...content.heroCards.tags, tags: b.tags },
          }
        : content.heroCards,
    };
  }, [p]);
  const [pastHero, setPastHero] = useState(false);
  const [email, setEmail] = useState("");

  const onBooked = (value: string) => {
    setEmail(value);
    if (value) void saveLead({ email: value, name: p.name, branche: p.branche, ref: p.von });
  };

  useEffect(() => {
    document.title = v.title;
  }, [v.title]);

  // Mobile sticky call-to-action appears once the hero is out of view.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // /irgendwas is not an industry page.
  if (pathBranche && !isBranche(pathBranche)) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header v={v} />

      <main>
        <Hero v={v} onBooked={onBooked} />

        <Section muted>
          <SectionHeader pill="Das Problem" title={v.problem.title} subtitle={v.problem.subtitle} />
          <div className="mt-6 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
            {v.problem.points.map((p, i) => (
              <Card key={p.stat}>
                <p
                  className={cn(
                    "text-[40px] font-bold tracking-[-1.5px] sm:text-[56px] sm:tracking-[-2px]",
                    i === 0 && "text-primary",
                  )}
                >
                  {p.stat}
                </p>
                <p className="pt-1.5 text-[15px] leading-[1.45] text-body sm:pt-3.5 sm:text-[17px] sm:leading-[1.5]">{p.text}</p>
                <p className="pt-2.5 text-[11px] text-subtle sm:pt-[18px] sm:text-xs">Quelle: {p.source}</p>
              </Card>
            ))}
          </div>
        </Section>

        <VideoBand v={v} />

        <Section id="ablauf">
          <SectionHeader pill="So funktioniert’s" title="In drei Schritten zur sicheren Übergabe" />
          <ol className="mt-8 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-0">
            {steps.map((s, i) => {
              const Scene = STEP_SCENES[i];
              return (
                <li key={s.title} className="flex flex-col">
                  <div className="order-last mt-5 flex h-[190px] items-center justify-center rounded-2xl border bg-secondary px-5 md:order-first md:mr-8 md:mt-0 md:h-[220px]">
                    <Scene />
                  </div>
                  {/* Step node; on desktop a line runs through all three nodes. */}
                  <div
                    className={cn(
                      "relative mt-0 md:mt-7 md:before:absolute md:before:inset-x-0 md:before:top-1/2 md:before:h-px md:before:bg-border",
                      i === 0 && "md:before:left-[18px]",
                      i === steps.length - 1 && "md:before:right-auto md:before:w-[18px]",
                    )}
                  >
                    <span className="relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-primary bg-background text-[13px] font-bold text-primary">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[21px] font-semibold tracking-[-0.3px] md:mr-8">{s.title}</h3>
                  <p className="mt-2 text-base leading-[1.55] text-muted-foreground md:mr-8">{s.text}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-11 hidden justify-center md:flex">
            <Button asChild variant="ink" size="xl">
              <a href={BOOK_HREF}>Erstgespräch buchen</a>
            </Button>
          </div>
        </Section>

        <Section id="ergebnis" muted>
          <SectionHeader pill="Das Ergebnis" title="Zwei Dinge, die bleiben, wenn Sie gehen" />
          <div className="mt-6 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2">
            <div className="tacita-dossier rounded-[20px] p-[22px] text-white sm:rounded-3xl sm:p-10 md:min-h-[400px]">
              <p className="text-[11px] font-semibold text-[#cff3e5] sm:text-[13px]">{v.dossier.eyebrow}</p>
              <h3 className="pt-2.5 text-2xl font-bold tracking-[-0.6px] sm:pt-[18px] sm:text-[32px] sm:tracking-[-0.8px]">
                {v.dossier.title}
              </h3>
              <ul className="flex flex-col gap-2.5 pt-4 sm:gap-3.5 sm:pt-[26px]">
                {v.dossier.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-[1.4] sm:gap-3 sm:text-[17px] sm:leading-[1.45]">
                    <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold sm:size-[22px] sm:text-xs">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border bg-card p-[22px] sm:rounded-3xl sm:p-10 md:min-h-[400px]">
              <p className="text-[11px] font-semibold text-primary sm:text-[13px]">{v.memory.eyebrow}</p>
              <h3 className="pt-2.5 text-2xl font-bold tracking-[-0.6px] sm:pt-[18px] sm:text-[32px] sm:tracking-[-0.8px]">
                {v.memory.title}
              </h3>
              <ul className="flex flex-col gap-2.5 pt-4 sm:gap-3.5 sm:pt-[26px]">
                {v.memory.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-[1.4] text-body sm:gap-3 sm:text-[17px] sm:leading-[1.45]">
                    <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-primary sm:size-[22px] sm:text-xs">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="fuer-wen">
          <SectionHeader pill="Für wen" title="Für jede Art der Übergabe" />
          <div className="mt-6 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
            {handoverCases.map((a) => (
              <Card key={a.title} className="flex flex-col">
                <p className="text-[13px] font-semibold text-primary">{a.eyebrow}</p>
                <h3 className="pt-3.5 text-2xl font-bold tracking-[-0.5px]">{a.title}</h3>
                <p className="flex-1 pt-3 text-base leading-[1.55] text-muted-foreground">{a.text}</p>
                <p className="mt-7 border-t pt-5 text-[15px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Im Dossier:</span> {a.focus}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section muted>
          <SectionHeader pill="Datenschutz & Vertrauen" title="Ihr Wissen bleibt Ihres" />
          <div className="mt-6 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {trustPoints.map((t) => (
              <Card key={t.title}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-lg font-bold text-primary">
                  {t.icon}
                </span>
                <h3 className="pt-[22px] text-lg font-semibold">{t.title}</h3>
                <p className="pt-2 text-[15px] leading-[1.55] text-muted-foreground">{t.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="preise">
          <SectionHeader pill={v.founding.pill} title={v.founding.title} subtitle={v.founding.subtitle} />
          <div className="mt-[18px] flex justify-center sm:mt-14">
            <div className="tacita-ring w-full max-w-[760px] rounded-[22px] p-0.5 shadow-[0_30px_40px_rgba(11,154,114,0.18)] sm:rounded-[28px] sm:p-[3px]">
              <div className="flex flex-col gap-4 rounded-[20px] bg-card p-[22px] sm:rounded-[25px] sm:p-12 md:flex-row md:gap-12">
                <div className="flex-1">
                  <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-primary sm:px-3 sm:text-xs">
                    {v.founding.badge}
                  </span>
                  <p className="mt-3 flex items-baseline gap-2 font-bold tracking-[-1.8px] sm:mt-[18px] sm:tracking-[-2.5px]">
                    {v.founding.pricePrefix && (
                      <span className="text-sm font-medium tracking-normal text-muted-foreground sm:text-[17px]">
                        {v.founding.pricePrefix}
                      </span>
                    )}
                    <span className="text-[46px] leading-none sm:text-[64px]">{v.founding.price}</span>
                  </p>
                  <p className="pt-2 text-sm text-muted-foreground sm:text-[15px]">{v.founding.priceUnit}</p>
                  <p className="pt-2.5 text-[13px] leading-[1.45] text-muted-foreground sm:pt-3.5 sm:text-[15px] sm:leading-[1.5]">
                    {v.founding.deposit}
                  </p>
                  <div className="hidden flex-col gap-2.5 pt-7 md:flex">
                    <Button asChild size="xl" className="w-full">
                      <a href={DEPOSIT_HREF}>Platz sichern</a>
                    </Button>
                    <Button asChild size="xl" variant="outline" className="w-full">
                      <a href={BOOK_HREF}>Erst Erstgespräch buchen</a>
                    </Button>
                  </div>
                </div>
                <div className="flex-1 border-t pt-3.5 md:border-l md:border-t-0 md:pl-12 md:pt-0">
                  <h3 className="hidden text-[15px] font-semibold md:block">Enthalten</h3>
                  <ul className="flex flex-col gap-2.5 md:gap-3.5 md:pt-4">
                    {foundingIncludes.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[13.5px] text-body md:text-[15px]">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2.5 md:hidden">
                  <Button asChild size="xl" className="w-full">
                    <a href={DEPOSIT_HREF}>Platz sichern</a>
                  </Button>
                  <Button asChild size="xl" variant="outline" className="w-full">
                    <a href={BOOK_HREF}>Erst Erstgespräch buchen</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="faq" muted>
          <SectionHeader pill="FAQ" title="Häufige Fragen" />
          <div className="mt-6 sm:mt-14">
            <Faq items={v.faq} />
          </div>
        </Section>

        <Booking v={v} p={p} email={email} />

        <section id="kontakt" className="scroll-mt-20 px-5 pt-10 sm:px-10 sm:pt-16 lg:px-16">
          <div className="relative mx-auto max-w-[1312px] overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-center sm:rounded-[32px] sm:py-[88px]">
            <div
              aria-hidden
              className="tacita-glow absolute left-1/2 top-[-260px] size-[520px] -translate-x-1/2 rounded-full"
              style={{ "--glow": "rgba(79,209,165,0.5)" } as CSSProperties}
            />
            <h2 className="relative text-[28px] font-bold leading-[1.15] tracking-[-0.9px] text-white sm:text-[46px] sm:tracking-[-1.4px]">
              {v.closing.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-[640px] text-base leading-[1.55] text-[#a3b6af] sm:text-lg">
              {v.closing.subtitle}
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:mt-11 sm:flex-row">
              <Button asChild size="xl" variant="outline" className="border-white bg-white text-foreground hover:bg-white/90">
                <a href={BOOK_HREF}>Erstgespräch buchen</a>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-[#2e4540] bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href={v.navSecondary.href}>Beispiel-Dossier ansehen</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t px-5 py-8 pb-28 sm:mt-16 sm:px-10 sm:py-10 md:pb-10 lg:px-16">
        <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-4 text-sm text-muted-foreground md:flex-row md:justify-between">
          <Logo />
          <p>Ein Projekt von 120 Ventures · Wien</p>
          <div className="flex flex-wrap justify-center gap-7">
            <a href="#" className="hover:text-foreground">Impressum</a>
            <a href="#" className="hover:text-foreground">Datenschutz</a>
            <a href="#kontakt" className="hover:text-foreground">Kontakt</a>
          </div>
        </div>
      </footer>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-20 border-t bg-white/95 px-4 pb-7 pt-3 transition-transform md:hidden",
          pastHero ? "translate-y-0" : "translate-y-full",
        )}
      >
        <Button asChild size="xl" className="w-full">
          <a href="#preise">Platz sichern</a>
        </Button>
      </div>
    </div>
  );
};

export default Landing;
