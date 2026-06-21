import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CalendarDays, CalendarPlus, Camera, MapPin, Navigation, Send } from "lucide-react";
import { useEffect } from "react";
import { Mandala } from "./assets/Mandala";
import { BananaLeaves } from "./assets/BananaLeaves";
import { FlowerSprig } from "./assets/FlowerSprig";
import { MarigoldGarland } from "./assets/MarigoldGarland";
import { TempleArch } from "./assets/TempleArch";
import { TempleLine } from "./assets/TempleLine";
import { Hairline, OmMark } from "./components/Ornament";
import { Reveal } from "./components/Reveal";
import { Section } from "./components/Section";
import { ceremony, graduationMilestones, invitation, sacredJourney } from "./data/ceremony";
import { softReveal, stagger } from "./utils/motion";

function escapeCalendarText(value) {
  return value.replaceAll("\\", "\\\\").replaceAll(",", "\\,").replaceAll(";", "\\;").replaceAll("\n", "\\n");
}

function createCalendarInviteUrl() {
  const title = `${ceremony.childName} Upanayanam`;
  const description = `Upanayanam ceremony for ${ceremony.childName} at ${ceremony.venueName}.\nMuhurtham: ${ceremony.muhurtamTime}.`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//Kalidasu Family//Upanayanam Invitation//EN",
    "BEGIN:VEVENT",
    "UID:spandan-kalidasu-upanayanam-20260711@kalidasu-family",
    "DTSTAMP:20260620T000000Z",
    "DTSTART;VALUE=DATE:20260711",
    "DTEND;VALUE=DATE:20260712",
    "TRANSP:TRANSPARENT",
    "X-MICROSOFT-CDO-ALLDAYEVENT:TRUE",
    `SUMMARY:${escapeCalendarText(title)}`,
    `DESCRIPTION:${escapeCalendarText(description)}`,
    `LOCATION:${escapeCalendarText(`${ceremony.venueName}, ${ceremony.venueAddress}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const archY = useTransform(scrollYProgress, [0, 0.18], [0, 72]);
  const archOpacity = useTransform(scrollYProgress, [0, 0.22], [0.28, 0.06]);
  const calendarInviteUrl = createCalendarInviteUrl();

  return (
    <Section id="hero" className="bg-paper">
      <BananaLeaves className="pointer-events-none absolute -left-28 -top-12 z-[1] hidden w-[min(34vw,430px)] rotate-[-7deg] text-ash opacity-70 md:block" />
      <BananaLeaves mirror className="pointer-events-none absolute -right-32 bottom-[-8rem] z-[1] hidden w-[min(30vw,390px)] rotate-[8deg] opacity-45 lg:block" />
      <motion.div style={{ y: archY, opacity: archOpacity }} className="pointer-events-none absolute inset-x-0 top-12 mx-auto w-[min(92vw,620px)] text-bronze">
        <TempleArch className="w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(199,168,103,0.22),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(245,239,226,0.52))]" />
      <motion.div className="relative z-10 mx-auto max-w-5xl text-center" variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={softReveal} className="mx-auto mb-5 text-bronze/70">
          <OmMark />
        </motion.div>
        <motion.p variants={softReveal} className="mb-4 font-lora text-sm uppercase tracking-[0.35em] text-ash">
          A Sacred Journey Begins
        </motion.p>
        <motion.h1 variants={softReveal} className="font-display text-[clamp(3.7rem,10vw,9.5rem)] font-medium leading-[0.82] text-ink">
          {ceremony.childName}
        </motion.h1>
        <motion.div variants={softReveal} className="mx-auto mt-8 grid max-w-4xl gap-4 font-lora text-base text-ash sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <span className="flex items-center justify-center gap-2"><CalendarDays size={18} />{ceremony.date}</span>
          <span className="hidden justify-center text-bronze sm:flex">|</span>
          <span className="flex items-center justify-center text-bronze">Muhurtam {ceremony.muhurtamTime}</span>
          <span className="hidden justify-center text-bronze sm:flex">|</span>
          <a
            href={ceremony.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 transition hover:text-ink"
          >
            <MapPin size={18} />{ceremony.venueName}
          </a>
        </motion.div>
        <motion.div variants={softReveal} className="mx-auto mt-8 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={calendarInviteUrl}
              download="spandan-kalidasu-upanayanam.ics"
              className="inline-flex items-center gap-3 rounded-full border border-bronze/25 bg-white/30 px-6 py-3 font-lora text-sm text-ink/85 backdrop-blur-md transition hover:border-bronze/60 hover:bg-white/60 hover:text-ink"
            >
              <CalendarPlus size={16} />
              Save to Calendar
            </a>
            <a
              href={ceremony.rsvpRedirectUrl}
              className="inline-flex items-center gap-3 rounded-full border border-bronze/25 bg-white/30 px-6 py-3 font-lora text-sm text-ink/85 backdrop-blur-md transition hover:border-bronze/60 hover:bg-white/60 hover:text-ink"
            >
              <Send size={16} />
              RSVP Here
            </a>
          </div>
          <a
            href="#invitation"
            className="group inline-flex items-center gap-3 rounded-full border border-bronze/35 bg-white/45 px-6 py-3 font-lora text-sm text-ink shadow-[0_18px_80px_rgba(85,65,30,0.12)] backdrop-blur-md transition hover:border-bronze/70 hover:bg-white/70"
          >
            Begin the Journey
            <ArrowDown size={16} className="transition group-hover:translate-y-1" />
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Invitation() {
  return (
    <Section id="invitation" className="bg-warm">
      <FlowerSprig className="pointer-events-none absolute bottom-8 left-8 hidden w-40 opacity-45 lg:block" />
      <FlowerSprig mirror className="pointer-events-none absolute right-10 top-14 hidden w-36 opacity-35 lg:block" />
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Reveal>
          <p className="font-lora text-sm uppercase tracking-[0.34em] text-bronze">With reverence</p>
          <Hairline className="mx-auto mt-10 max-w-2xl" />
        </Reveal>
        <Reveal delay={0.12} className="mt-12 w-full">
          <p className="font-lora text-sm uppercase tracking-[0.28em] text-bronze">Parents</p>
          <div className="mx-auto mt-6 grid max-w-6xl items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <p className="font-display text-[clamp(2.9rem,5.5vw,6rem)] leading-[0.88] text-ink sm:text-right">
              {ceremony.parents[0]}
            </p>
            <p className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-none text-gold/65">&amp;</p>
            <p className="font-display text-[clamp(2.9rem,5.5vw,6rem)] leading-[0.88] text-ink sm:text-left">
              {ceremony.parents[1]}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl border-y border-bronze/20 py-6">
            <p className="font-lora text-xs uppercase tracking-[0.28em] text-bronze">Elder brother</p>
            <p className="mt-3 font-display text-[clamp(2.4rem,5vw,5rem)] leading-[0.92] text-ink">
              {invitation.elderBrother}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 max-w-2xl">
          <p className="font-lora text-base leading-8 text-ash">invite you to bless</p>
          <p className="mt-2 font-display text-[clamp(2.9rem,5.6vw,5.8rem)] leading-[0.9] text-ink">
            {ceremony.childName}
          </p>
          <p className="mt-5 font-lora text-lg leading-9 text-ash sm:text-xl sm:leading-10">
            as he begins the sacred discipline of learning, prayer, and inner light.
          </p>
          <p className="mt-7 font-lora text-base uppercase tracking-[0.22em] text-bronze">with the blessings of our elders</p>
        </Reveal>
      </div>
    </Section>
  );
}

function Quote() {
  return (
    <Section id="quote" className="bg-ivory">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(199,168,103,0.15),transparent_34rem)]" />
      <OmMark className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] text-bronze/10" />
      <Reveal className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="font-lora text-sm uppercase tracking-[0.34em] text-bronze">a quiet receiving</p>
        <Hairline className="mx-auto mt-9 max-w-xl" />
        <blockquote className="mt-10 font-display text-[clamp(2.25rem,5vw,5.25rem)] leading-[1.02] text-ink sm:leading-[0.96]">
          <span className="block sm:hidden">A mantra is</span>
          <span className="mt-3 block sm:hidden">not merely heard.</span>
          <span className="mt-3 block sm:hidden">It is received, carried,</span>
          <span className="mt-3 block sm:hidden">and allowed to</span>
          <span className="mt-3 block sm:hidden">become light.</span>
          <span className="hidden whitespace-nowrap sm:block">A mantra is not merely heard.</span>
          <span className="mt-3 hidden sm:block">It is received, carried,</span>
          <span className="mt-3 hidden sm:block">and allowed to become light.</span>
        </blockquote>
        <div className="mt-10 grid w-full max-w-xl grid-cols-3 border-y border-bronze/20 py-5 sm:mt-12">
          {["received", "carried", "light"].map((word) => (
            <p key={word} className="font-lora text-[0.64rem] uppercase tracking-[0.16em] text-bronze sm:text-xs sm:tracking-[0.24em]">
              {word}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Meaning() {
  return (
    <Section id="meaning" className="bg-sand/45">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
        <Reveal>
          <p className="mb-8 font-lora text-sm uppercase tracking-[0.3em] text-bronze">Upanayanam</p>
          <h2 className="font-display text-[clamp(3.5rem,7vw,8rem)] leading-[0.9] text-ink">To be led near.</h2>
        </Reveal>
        <Reveal delay={0.14} className="space-y-7 font-lora text-lg leading-9 text-ash sm:text-xl sm:leading-10">
          <p>Upanayanam is a gentle turning of the child toward knowledge. It is the moment a young seeker is invited closer to the teacher, closer to discipline, and closer to the quiet strength of prayer.</p>
          <p>The thread is a reminder, not an ornament. It asks the heart to remember clarity, compassion, study, and service in ordinary life.</p>
        </Reveal>
      </div>
    </Section>
  );
}

function SacredJourney() {
  return (
    <Section id="journey" className="bg-warm">
      <TempleArch className="pointer-events-none absolute -bottom-28 left-8 hidden w-[430px] text-bronze/8 lg:block" />
      <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal className="max-w-xl">
          <p className="mb-7 font-lora text-sm uppercase tracking-[0.32em] text-bronze">Sacred Journey</p>
          <h2 className="font-display text-[clamp(3.5rem,7.5vw,8.2rem)] leading-[0.88] text-ink">
            Six rites.
            <span className="block">One vow.</span>
          </h2>
          <p className="mt-8 max-w-lg font-lora text-lg leading-9 text-ash">
            The morning moves through invocation, purification, vow, teaching, humility, and blessing.
          </p>
          <p className="mt-6 font-lora text-sm uppercase tracking-[0.22em] text-bronze">
            {ceremony.date} · Muhurtam {ceremony.muhurtamTime}
          </p>
          <div className="mt-10 grid max-w-sm grid-cols-3 border-y border-bronze/20 py-5">
            {["prayer", "study", "grace"].map((word) => (
              <p key={word} className="font-lora text-xs uppercase tracking-[0.24em] text-bronze">
                {word}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grid gap-4 sm:grid-cols-2">
            {sacredJourney.map((item) => (
              <article
                key={item.number}
                className="group min-h-[13.5rem] border border-bronze/18 bg-ivory/35 p-5 shadow-[0_22px_80px_rgba(82,64,36,0.06)] transition hover:scale-[0.99] hover:border-bronze/32 sm:p-6"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="font-display text-5xl leading-none text-gold/60">{item.number}</span>
                  <span className="mt-3 h-px flex-1 bg-bronze/18" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-[clamp(2.05rem,3.1vw,3.35rem)] leading-[0.9] text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 font-lora text-sm leading-7 text-ash sm:text-base sm:leading-8">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
function Celebration() {
  return (
    <Section id="celebration" className="bg-ivory py-16 sm:py-20">
      <TempleArch className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[460px] -translate-x-1/2 -translate-y-1/2 text-bronze/5 lg:block" />
      <FlowerSprig mirror className="pointer-events-none absolute right-8 top-10 hidden w-40 opacity-35 lg:block" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal className="max-w-3xl">
          <p className="mb-5 font-lora text-sm uppercase tracking-[0.3em] text-bronze">Celebration</p>
          <h2 className="font-display text-[clamp(3rem,5.6vw,5.9rem)] leading-[0.88] text-ink">
            After the rites,
            <span className="block">we celebrate the brothers.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-lora text-base leading-8 text-ash sm:text-lg sm:leading-9">
            A family gathering for Spandan&apos;s Upanayanam, Nikhil&apos;s college graduation, and Spandan&apos;s high school graduation.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-9 w-full">
          <div className="relative grid gap-6 border-y border-bronze/18 py-7 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <article className="mx-auto max-w-lg lg:text-right">
              <p className="font-lora text-xs uppercase tracking-[0.25em] text-bronze">{graduationMilestones[0].milestone}</p>
              <h3 className="mt-3 whitespace-nowrap font-display text-[clamp(2.7rem,4.25vw,4.55rem)] leading-[0.86] text-ink">
                {graduationMilestones[0].name}
              </h3>
            </article>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-bronze/20 bg-warm/45 font-display text-4xl text-gold/70 lg:h-20 lg:w-20" aria-hidden="true">
              &
            </div>

            <article className="mx-auto max-w-lg lg:text-left">
              <p className="font-lora text-xs uppercase tracking-[0.25em] text-bronze">{graduationMilestones[1].milestone}</p>
              <h3 className="mt-3 whitespace-nowrap font-display text-[clamp(2.7rem,4.25vw,4.55rem)] leading-[0.86] text-ink">
                {graduationMilestones[1].name}
              </h3>
            </article>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-7 w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {["Prasadam", "Portraits", "Blessings", "Lunch"].map((item) => (
              <p key={item} className="font-lora text-xs uppercase tracking-[0.18em] text-bronze">
                {item}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function VisitDetails() {
  return (
    <Section id="details" className="bg-paper">
      <FlowerSprig className="pointer-events-none absolute bottom-8 left-10 hidden w-36 opacity-35 lg:block" />
      <MarigoldGarland className="pointer-events-none absolute right-12 top-12 hidden w-72 opacity-30 lg:block" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="text-center lg:text-left">
          <p className="mb-7 font-lora text-sm uppercase tracking-[0.3em] text-bronze">Details</p>
          <h2 className="font-display text-[clamp(3.3rem,6.4vw,6.8rem)] leading-[0.88] text-ink">
            Everything for
            <span className="block">the day.</span>
          </h2>
          <p className="mt-7 max-w-md font-lora text-lg leading-9 text-ash lg:mx-0">
            Find the temple, share the memories, and let us know you will be with us.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="border-y border-bronze/18">
            <div className="border-b border-bronze/14 py-6 text-bronze/60">
              <TempleLine className="mx-auto w-full max-w-md" />
            </div>
            <div id="venue" className="grid gap-5 border-b border-bronze/14 py-7 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                <p className="font-lora text-xs uppercase tracking-[0.24em] text-bronze">Venue</p>
                <h3 className="mt-2 font-display text-[clamp(2.4rem,4.2vw,4.4rem)] leading-[0.9] text-ink">{ceremony.venueName}</h3>
                <p className="mt-3 font-lora text-base leading-8 text-ash">{ceremony.venueAddress}</p>
              </div>
              <a
                href={ceremony.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-bronze/35 bg-white/45 px-6 py-3 font-lora text-sm text-ink transition hover:border-bronze/70 hover:bg-white/70"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>

            <div className="grid gap-0 sm:grid-cols-2">
              <a
                id="gallery"
                href={ceremony.photoGalleryRedirectUrl}
                target="_blank"
                rel="noreferrer"
                className="group border-b border-bronze/14 py-7 transition hover:bg-white/25 sm:border-b-0 sm:border-r sm:border-bronze/14 sm:pr-7"
              >
                <p className="font-lora text-xs uppercase tracking-[0.24em] text-bronze">Photo Gallery</p>
                <p className="mt-3 font-lora text-base leading-8 text-ash">Ceremony moments and family memories.</p>
                <span className="mt-5 inline-flex items-center gap-3 font-lora text-sm text-ink transition group-hover:text-bronze">
                  <Camera size={16} /> Open Photo Gallery
                </span>
              </a>

              <a
                id="rsvp"
                href={ceremony.rsvpRedirectUrl}
                className="group py-7 transition hover:bg-white/25 sm:pl-7"
              >
                <p className="font-lora text-xs uppercase tracking-[0.24em] text-bronze">RSVP</p>
                <p className="mt-3 font-lora text-base leading-8 text-ash">Kindly let us know if you will join us.</p>
                <span className="mt-5 inline-flex items-center gap-3 font-lora text-sm text-ink transition group-hover:text-bronze">
                  <Send size={16} /> RSVP Here
                </span>
              </a>
            </div>
          </div>
          <div className="mt-6 grid gap-4 font-lora text-sm uppercase tracking-[0.18em] text-bronze sm:grid-cols-3">
            <p>{ceremony.date}</p>
            <p className="sm:text-center">Muhurtam {ceremony.muhurtamTime}</p>
            <p className="sm:text-right">{ceremony.venueName}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ClosingBlessing() {
  return (
    <footer id="blessings" className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 lg:px-16">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 w-[min(70vw,360px)] -translate-x-1/2 -translate-y-1/2 text-bronze/6" />
      <FlowerSprig className="pointer-events-none absolute -bottom-4 left-6 hidden w-36 opacity-35 sm:block" />
      <FlowerSprig mirror className="pointer-events-none absolute -bottom-4 right-6 hidden w-36 opacity-35 sm:block" />
      <Reveal className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="font-lora text-xs uppercase tracking-[0.35em] text-bronze">Blessings</p>
        <div className="mt-8 grid w-full gap-5 border-y border-bronze/18 py-8 lg:grid-cols-2 lg:items-center">
          <p className="font-devanagari text-[clamp(2rem,4vw,4rem)] leading-tight text-ink">
            सर्वे भवन्तु सुखिनः
          </p>
          <p className="font-telugu text-[clamp(1.9rem,3.8vw,3.8rem)] leading-tight text-ink">
            సర్వే భవంతు సుఖినః
          </p>
        </div>
        <p className="mt-8 font-lora text-xs uppercase tracking-[0.32em] text-bronze">Spandan Seal</p>
        <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.88] text-ink">
          The Kalidasu Family
        </h2>
      </Reveal>
    </footer>
  );
}

export default function App() {
  useLenis();

  return (
    <main>
      <Hero />
      <Invitation />
      <Meaning />
      <Quote />
      <SacredJourney />
      <Celebration />
      <VisitDetails />
      <ClosingBlessing />
    </main>
  );
}
