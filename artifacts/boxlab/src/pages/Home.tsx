import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import {
  CheckCircle2,
  Dumbbell,
  Mail,
  Monitor,
  Smartphone,
  Star,
  Tablet,
  ShieldCheck,
  Gift,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Trophy,
  Play,
  Clock,
  X
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroBg from "/hero-boxing.png";

const CHECKOUT_URL = "#";
const CHECKOUT_URL_PREMIUM = "#";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ── Shared timer logic ──────────────────────────────────────────────── */
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  useEffect(() => {
    const saved = localStorage.getItem("boxlab_timer");
    const stamp = localStorage.getItem("boxlab_timestamp");
    if (saved && stamp) {
      const elapsed = Math.floor((Date.now() - parseInt(stamp, 10)) / 1000);
      const rem = parseInt(saved, 10) - elapsed;
      setTimeLeft(rem > 0 ? rem : 15 * 60);
    }
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev <= 1 ? 15 * 60 : prev - 1;
        localStorage.setItem("boxlab_timer", next.toString());
        localStorage.setItem("boxlab_timestamp", Date.now().toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

/* ── Compact header timer ────────────────────────────────────────────── */
const HeaderTimer = () => {
  const t = useCountdown();
  const m = Math.floor(t / 60).toString().padStart(2, "0");
  const s = (t % 60).toString().padStart(2, "0");
  return (
    <div className="hidden sm:flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5">
      <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
      <span className="font-display font-bold text-sm text-primary tracking-widest tabular-nums">
        {m}:{s}
      </span>
      <span className="text-white/40 text-xs hidden md:inline">oferta termina em</span>
    </div>
  );
};

/* ── Big urgency timer ───────────────────────────────────────────────── */
const BigTimer = () => {
  const t = useCountdown();
  const m = Math.floor(t / 60).toString().padStart(2, "0");
  const s = (t % 60).toString().padStart(2, "0");
  return (
    <div className="flex items-center justify-center gap-3">
      {[{ val: m, label: "min" }, { val: s, label: "seg" }].map(({ val, label }, i) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="bg-black/60 border border-white/10 rounded-xl px-6 py-4 min-w-[90px] text-center"
            style={{ boxShadow: "0 0 30px rgba(225,6,0,0.25)" }}
          >
            <span className="font-display font-bold text-6xl md:text-7xl text-white tabular-nums leading-none">
              {val}
            </span>
          </div>
          <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-semibold">{label}</span>
          {i === 0 && (
            <span
              className="font-display font-bold text-5xl text-primary absolute"
              style={{ marginTop: "-2.5rem", marginLeft: "6rem" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Testimonials wide carousel ──────────────────────────────────────── */
const testimonials = [
  { text: "Material excelente! Minhas aulas ficaram muito mais dinâmicas e criativas. Recomendo para todos os professores.", author: "Carlos M.", role: "Professor de Boxe" },
  { text: "Valeu cada centavo. O premium ainda vem com bônus incríveis! Minha academia evoluiu muito.", author: "Fernanda R.", role: "Personal Trainer" },
  { text: "Treino em casa e adorei. Conteúdo para todos os níveis, do iniciante ao avançado!", author: "Juliana P.", role: "Aluna" },
  { text: "Conteúdo muito organizado e fácil de aplicar nas aulas. Acabei comprando o premium também.", author: "Rodrigo S.", role: "Professor" },
  { text: "Meus alunos adoraram as novas dinâmicas. Nunca mais ficamos repetindo o mesmo treino.", author: "Tiago L.", role: "Dono de Academia" },
];

const TestimonialCard = ({ t, active }: { t: typeof testimonials[0]; active: boolean }) => (
  <div
    className="rounded-2xl p-7 border flex flex-col gap-4 flex-shrink-0 w-[300px] md:w-[340px] transition-all duration-500"
    style={{
      background: active ? "linear-gradient(135deg,#181010,#1a0a0a)" : "#111",
      borderColor: active ? "rgba(225,6,0,0.4)" : "rgba(255,255,255,0.07)",
      boxShadow: active ? "0 0 40px rgba(225,6,0,0.12)" : "none",
      opacity: active ? 1 : 0.55,
      transform: active ? "scale(1.03)" : "scale(0.97)",
    }}
  >
    <div className="flex gap-1">
      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-accent text-accent" />)}
    </div>
    <p className="italic text-white/80 leading-relaxed flex-1">"{t.text}"</p>
    <div>
      <p className="font-display font-bold uppercase tracking-widest text-white text-sm">{t.author}</p>
      <p className="text-primary text-xs font-semibold mt-0.5">{t.role}</p>
    </div>
  </div>
);

const AutoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % testimonials.length);
    }, 3200);
  };

  useEffect(() => { restart(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const go = (dir: number) => {
    setCurrent(p => (p + dir + testimonials.length) % testimonials.length);
    restart();
  };

  const visible = [-1, 0, 1].map(offset => (current + offset + testimonials.length) % testimonials.length);

  return (
    <div>
      {/* Cards row */}
      <div className="flex justify-center gap-4 overflow-hidden pb-2">
        {visible.map((idx, pos) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TestimonialCard t={testimonials[idx]} active={pos === 1} />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          data-testid="carousel-prev"
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              data-testid={`dot-${i}`}
              onClick={() => { setCurrent(i); restart(); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <button
          data-testid="carousel-next"
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

/* ── Content tabs ────────────────────────────────────────────────────── */
const contentTabs = [
  {
    icon: Zap, label: "Preparação", title: "Preparação e Desenvolvimento",
    desc: "Aquecimentos específicos para boxe, rotinas de mobilidade articular e exercícios de condicionamento físico para preparar atletas de todos os níveis.",
    items: ["Aquecimentos dinâmicos", "Mobilidade articular", "Condicionamento progressivo", "Exercícios de coordenação", "Ativação muscular específica"]
  },
  {
    icon: Target, label: "Técnica", title: "Técnica e Combate",
    desc: "Fundamentos técnicos avançados, combinações de golpes planejadas, técnicas de defesa, drills de sparring e simulações reais de combate.",
    items: ["Jab, direto, gancho, uppercut", "Técnicas de esquiva e defesa", "Combinações táticas", "Drills de sparring controlado", "Leitura e reação ao adversário"]
  },
  {
    icon: Trophy, label: "Performance", title: "Performance e Aulas",
    desc: "Treinos funcionais de alta intensidade, circuitos metabólicos e estruturas completas de planos de aula para academias e projetos sociais.",
    items: ["Circuitos HIIT para boxe", "Treinos funcionais específicos", "Estrutura de aulas 50min/60min", "Periodização de treinos", "Avaliações de desempenho"]
  }
];

const ContentTabs = () => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {contentTabs.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <button
              key={i}
              data-testid={`tab-${i}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                active === i ? "bg-primary text-white" : "bg-card border border-border text-white/60 hover:text-white hover:border-primary/50"
              }`}
              style={active === i ? { boxShadow: "0 0 20px rgba(225,6,0,0.35)" } : {}}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12"
          style={{ boxShadow: "0 0 60px rgba(225,6,0,0.07)" }}
        >
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-3 mb-4">
                {(() => { const Icon = contentTabs[active].icon; return <Icon className="w-7 h-7 text-primary" />; })()}
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">{contentTabs[active].title}</h3>
              </div>
              <p className="text-white/55 leading-relaxed text-lg">{contentTabs[active].desc}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              {contentTabs[active].items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 bg-black/40 rounded-lg px-4 py-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-white/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ── Upsell Modal ────────────────────────────────────────────────────── */
const UpsellModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{
          background: "linear-gradient(135deg,#0f0800 0%,#1a1000 100%)",
          border: "2px solid hsl(46 65% 52%)",
          boxShadow: "0 0 80px rgba(212,175,55,0.25), 0 0 160px rgba(212,175,55,0.08)"
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          data-testid="upsell-close"
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top badge */}
        <div className="bg-primary px-6 py-3 text-center">
          <p className="font-display font-bold uppercase tracking-widest text-white text-sm animate-pulse">
            Espera! Temos uma oferta especial para você
          </p>
        </div>

        <div className="p-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-accent leading-tight mb-2"
            style={{ textShadow: "0 0 30px rgba(212,175,55,0.3)" }}>
            Acesse o Plano Premium
          </h2>
          <p className="text-center text-white/50 text-sm mb-6">
            Por apenas mais R$ 5,00, tenha acesso completo a tudo:
          </p>

          {/* Price comparison */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <p className="text-white/30 text-xs uppercase tracking-widest">Era</p>
              <p className="font-display text-3xl text-white/30 line-through">R$ 22,90</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-accent text-xs uppercase tracking-widest font-bold">Oferta especial</p>
              <div className="flex items-baseline gap-1 text-accent">
                <span className="font-display text-2xl">R$</span>
                <span className="font-display text-5xl font-bold" style={{ textShadow: "0 0 20px rgba(212,175,55,0.4)" }}>17,90</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2.5 mb-8 bg-black/30 rounded-xl p-5">
            {[
              { gold: false, text: "Preparação e Desenvolvimento" },
              { gold: false, text: "Técnica e Combate" },
              { gold: false, text: "Performance e Aulas" },
              { gold: false, text: "150 Dinâmicas de Boxe" },
              { gold: true,  text: "100 Combinações de Golpes (Bônus)" },
              { gold: true,  text: "Cronômetro de Treinos + Protocolos (Bônus)" },
              { gold: false, text: "Garantia de 7 dias — 100% do dinheiro de volta" },
            ].map(({ gold, text }, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${gold ? "text-accent" : "text-primary"}`} />
                <span className={`text-sm font-semibold ${gold ? "text-accent" : "text-white/80"}`}>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={CHECKOUT_URL_PREMIUM}
            data-testid="upsell-accept"
            className="block text-center font-display font-bold text-xl uppercase tracking-widest py-4 rounded-xl transition-all hover:scale-105 mb-3"
            style={{ background: "linear-gradient(135deg,#d4af37,#f0d060,#d4af37)", color: "#000", boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
          >
            Sim! Quero o Premium por R$ 17,90
          </a>

          <button
            onClick={onClose}
            data-testid="upsell-decline"
            className="block w-full text-center text-white/30 hover:text-white/60 text-sm py-2 transition-colors"
          >
            Não, quero continuar apenas com o plano básico
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ── Pendulum plan card ──────────────────────────────────────────────── */
const PendulumCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{ rotate: [0, 0.6, 0, -0.6, 0] }}
    transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay }}
    style={{ transformOrigin: "top center" }}
  >
    {children}
  </motion.div>
);

/* ── Main component ──────────────────────────────────────────────────── */
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
  const glowRed = "0 0 30px rgba(225,6,0,0.4)";
  const glowLine = { boxShadow: "0 0 10px rgba(225,6,0,0.8)" };

  return (
    <>
    {showUpsell && <UpsellModal onClose={() => setShowUpsell(false)} />}
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Sticky Header (with compact timer) ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between max-w-6xl gap-3">
          <div className="font-display text-3xl font-extrabold tracking-tight flex items-center gap-1 flex-shrink-0">
            <span className="text-white">BOX</span>
            <span className="text-primary" style={{ textShadow: "0 0 20px rgba(225,6,0,0.6)" }}>LAB</span>
          </div>

          {/* compact countdown */}
          <HeaderTimer />

          <button
            data-testid="header-cta"
            onClick={() => scrollToSection("planos")}
            className="bg-primary hover:bg-primary/90 text-white font-display font-bold px-5 py-2.5 rounded-lg transition-all text-sm uppercase tracking-widest flex-shrink-0"
            style={{ boxShadow: "0 0 20px rgba(225,6,0,0.3)" }}
          >
            Comprar Agora
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-10" />
          {heroBg && <img src={heroBg} alt="Boxing Training" className="w-full h-full object-cover object-center opacity-50" />}
        </div>
        <div className="container mx-auto px-4 relative z-20 max-w-5xl w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeIn} className="inline-block bg-primary/20 text-primary border border-primary/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-8 uppercase">
              Material Exclusivo para Professores de Boxe
            </motion.div>
            <motion.h1 variants={fadeIn} className="font-display text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-none tracking-tight mb-6">
              150 Dinâmicas<br />
              <span className="text-primary" style={{ textShadow: "0 0 60px rgba(225,6,0,0.5), 0 0 120px rgba(225,6,0,0.2)" }}>
                Para Aulas de Boxe
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
              Transforme seus treinos com uma biblioteca completa de dinâmicas prontas para professores, academias e pessoas que desejam aprender Boxe em casa.
            </motion.p>
            <motion.div variants={fadeIn}>
              <button
                data-testid="hero-cta"
                onClick={() => scrollToSection("planos")}
                className="bg-primary hover:bg-primary/90 text-white font-display text-xl font-bold px-12 py-5 rounded-xl transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest"
                style={{ boxShadow: "0 0 50px rgba(225,6,0,0.4), 0 0 100px rgba(225,6,0,0.15)" }}
              >
                Quero Meu Acesso Agora
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VSL Section ── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-10">
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-3">Assista antes de decidir</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
              Veja o <span className="text-primary" style={{ textShadow: glowRed }}>BOXLAB</span> em ação
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            {/* VSL placeholder — replace the div below with an <iframe> or <video> tag */}
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-border group cursor-pointer"
              style={{
                aspectRatio: "16/9",
                background: "linear-gradient(135deg,#0f0f0f,#1a0a0a)",
                boxShadow: "0 0 60px rgba(225,6,0,0.1)"
              }}
              data-testid="vsl-placeholder"
            >
              {/* Background subtle pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "repeating-linear-gradient(45deg,#e10600 0,#e10600 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />

              {/* Glow ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "rgba(225,6,0,0.15)",
                    boxShadow: "0 0 0 12px rgba(225,6,0,0.07), 0 0 60px rgba(225,6,0,0.2)"
                  }}
                >
                  <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="font-display font-bold uppercase tracking-widest text-white/40 text-sm">
                  {/* TROCAR: cole aqui a URL do seu vídeo de vendas (YouTube, Vimeo, Panda, etc.) */}
                  Cole aqui o seu vídeo de vendas
                </p>
              </div>
            </div>

            <p className="text-center text-white/25 text-xs mt-4 font-mono">
              {/* Para usar: substitua o div acima por: */}
              {/* <iframe src="URL_DO_VIDEO" allow="autoplay; fullscreen" className="absolute inset-0 w-full h-full" frameBorder="0" /> */}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Por Que <span className="text-primary" style={{ textShadow: glowRed }}>BoxLab?</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={glowLine} />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Economize horas planejando treinos","Nunca mais repita os mesmos exercícios","Aulas mais organizadas e profissionais","Mais criatividade em cada treino","Conteúdo para todos os níveis","Material profissional e completo"].map((b, i) => (
              <motion.div key={i} variants={fadeIn} whileHover={{ scale: 1.02 }}
                className="bg-card border border-border p-7 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-all duration-300 group">
                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <p className="font-bold text-lg leading-tight pt-1 text-white/90">{b}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Para Quem É ── */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Para Quem É O <span className="text-primary" style={{ textShadow: glowRed }}>BoxLab?</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={glowLine} />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {["Professores de Boxe","Personal Trainers","Academias","Projetos Sociais","Pessoas que treinam em casa","Iniciantes"].map((a, i) => (
              <motion.div key={i} variants={fadeIn} whileHover={{ scale: 1.02 }}
                className="bg-background border border-border p-5 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all">
                <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="font-bold text-lg">{a}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── O Que Você Recebe (tabs) ── */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              O Que Você <span className="text-primary" style={{ textShadow: glowRed }}>Recebe</span>
            </h2>
            <p className="text-white/40 mt-4 text-base">Selecione um módulo para explorar o conteúdo</p>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={glowLine} />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <ContentTabs />
          </motion.div>
        </div>
      </section>

      {/* ── Pricing (pendulum) ── */}
      <section id="planos" className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Escolha Seu <span className="text-primary" style={{ textShadow: glowRed }}>Plano</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={glowLine} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Básico */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <PendulumCard delay={0}>
                <div
                  className="bg-background border border-white/10 rounded-2xl p-8 md:p-10 relative hover:border-primary/50 transition-all duration-300"
                  style={{ transition: "box-shadow .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(225,6,0,0.12)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  <h3 className="font-display text-3xl font-bold uppercase mb-2 text-center">Plano Básico</h3>
                  <p className="text-white/50 mb-6 text-center text-sm">O essencial para transformar suas aulas.</p>
                  <div className="text-center mb-8">
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Por apenas</span>
                    <div className="flex items-baseline gap-1 justify-center mt-1">
                      <span className="font-display text-2xl text-white/50">R$</span>
                      <span className="font-display text-7xl font-bold">12,90</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    {["Preparação e Desenvolvimento","Técnica e Combate","Performance e Aulas","150 Dinâmicas de Boxe"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowUpsell(true)}
                    data-testid="btn-basico"
                    className="block w-full text-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-display font-bold text-lg uppercase tracking-widest py-4 rounded-xl transition-all duration-300"
                  >
                    Quero o Plano Básico
                  </button>
                </div>
              </PendulumCard>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="md:scale-105 z-10 relative"
            >
              <PendulumCard delay={2.5}>
                <div
                  className="rounded-2xl p-8 md:p-12 relative"
                  style={{
                    background: "linear-gradient(135deg,#111 0%,#1a1500 100%)",
                    border: "2px solid hsl(46 65% 52%)",
                    boxShadow: "0 0 50px rgba(212,175,55,0.18), inset 0 0 40px rgba(212,175,55,0.04)"
                  }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-black font-display font-bold uppercase tracking-widest text-sm px-6 py-2 rounded-full whitespace-nowrap"
                    style={{ boxShadow: "0 0 20px rgba(212,175,55,0.5)" }}>
                    ⭐ Mais Escolhido
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase mb-1 text-center text-accent">Plano Premium</h3>
                  <p className="text-white/50 mb-6 text-center text-sm">A experiência completa com bônus exclusivos.</p>
                  <div className="text-center mb-8">
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Por apenas</span>
                    <div className="flex items-baseline gap-1 justify-center mt-1 text-accent">
                      <span className="font-display text-2xl">R$</span>
                      <span className="font-display text-7xl font-bold" style={{ textShadow: "0 0 30px rgba(212,175,55,0.4)" }}>22,90</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-white/80 font-semibold">Tudo do Plano Básico</span>
                    </div>
                    <div className="h-px bg-white/10 my-3" />
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-accent font-semibold">100 Combinações de Golpes (Bônus)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-accent font-semibold">Cronômetro de Treinos + Protocolos (Bônus)</span>
                    </div>
                    <div className="h-px bg-white/10 my-3" />
                    <div className="flex items-center gap-3 bg-accent/10 rounded-lg px-3 py-2">
                      <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-accent font-bold text-sm">Garantia de 7 dias — 100% reembolso</span>
                    </div>
                    <div className="flex items-center gap-3 bg-accent/5 rounded-lg px-3 py-2">
                      <Star className="w-5 h-5 text-accent flex-shrink-0 fill-accent" />
                      <span className="text-accent font-bold text-sm">280 Dinâmicas no total</span>
                    </div>
                  </div>
                  <a href={CHECKOUT_URL_PREMIUM} data-testid="btn-premium"
                    className="block text-center font-display font-bold text-xl uppercase tracking-widest py-5 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#d4af37,#f0d060,#d4af37)", color: "#000", boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}>
                    Quero o Premium
                  </a>
                  <p className="text-center text-accent/50 text-xs font-bold mt-4 uppercase tracking-widest">Melhor Custo-Benefício</p>
                </div>
              </PendulumCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Como você recebe ── */}
      <section className="bg-background py-14 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 flex gap-5 items-start">
              <div className="bg-primary/10 p-4 rounded-xl text-primary flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Como Você Recebe</h3>
                <p className="text-white/55 leading-relaxed">
                  <strong className="text-white">Receba diretamente no seu e-mail</strong> — Após a confirmação do pagamento você receberá acesso imediato aos materiais.
                </p>
              </div>
            </div>
            <div className="flex gap-8 text-white/35">
              {[{ Icon: Smartphone, label: "Celular" }, { Icon: Monitor, label: "Computador" }, { Icon: Tablet, label: "Tablet" }].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="w-7 h-7" />
                  <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials (dynamic multi-card) ── */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              O Que Dizem <span className="text-primary" style={{ textShadow: glowRed }}>Nossos Alunos</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={glowLine} />
          </motion.div>
          <AutoCarousel />
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg,#111,#0f0f0f)", border: "1px solid rgba(225,6,0,0.2)", boxShadow: "0 0 60px rgba(225,6,0,0.07)" }}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 bg-primary flex flex-col items-center justify-center py-10 px-6 text-center flex-shrink-0">
                <ShieldCheck className="w-14 h-14 text-white mb-3" />
                <p className="font-display text-5xl font-bold text-white leading-none">7</p>
                <p className="font-display text-sm font-bold text-white/80 uppercase tracking-widest mt-1">Dias de<br />Garantia</p>
              </div>
              <div className="flex-1 p-8 md:p-12 text-center md:text-left flex flex-col justify-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">Garantia Incondicional de 7 Dias</h2>
                <p className="text-white/55 text-lg leading-relaxed mb-6">
                  Se por qualquer motivo o material não atender às suas expectativas, basta entrar em contato dentro de 7 dias e você recebe <strong className="text-white">100% do seu dinheiro de volta</strong>. Sem burocracia, sem perguntas.
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 8px rgba(225,6,0,0.8)" }} />
                  <span className="font-bold text-primary uppercase tracking-widest text-sm">Risco zero para você</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Perguntas <span className="text-primary" style={{ textShadow: glowRed }}>Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={glowLine} />
          </motion.div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              { q: "O acesso é imediato?", a: "Sim! Após a confirmação do pagamento você receberá o acesso imediatamente no seu e-mail." },
              { q: "Posso acessar pelo celular?", a: "Sim! O material é acessível em qualquer dispositivo: celular, computador ou tablet." },
              { q: "Serve para iniciantes?", a: "Com certeza! O conteúdo é desenvolvido para todos os níveis, do iniciante ao avançado." },
              { q: "Recebo por e-mail?", a: "Sim! Todo o material é enviado diretamente para o e-mail cadastrado no momento da compra." },
              { q: "Os bônus fazem parte de qual plano?", a: "Os bônus (100 Combinações de Golpes e Cronômetro de Treinos) são exclusivos do Plano Premium." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="font-display text-lg font-bold uppercase tracking-wide py-5 hover:no-underline hover:text-primary transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/55 text-base pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Oferta Especial (above footer) ── */}
      <section id="oferta" className="py-20 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block bg-primary/10 text-primary border border-primary/30 font-display font-bold uppercase tracking-widest px-5 py-2 rounded-full text-sm mb-10 animate-pulse">
            Oferta Especial Por Tempo Limitado
          </div>

          {/* Big timer */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {(() => {
              return <BigTimerInline />;
            })()}
          </div>

          <p className="text-white/35 font-medium text-sm mb-10">Após o término da oferta os valores poderão ser alterados sem aviso prévio.</p>

          <a href={CHECKOUT_URL_PREMIUM} data-testid="urgency-cta"
            className="inline-block font-display font-bold text-2xl uppercase tracking-widest px-14 py-5 rounded-xl transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#e10600,#c00000)", color: "#fff", boxShadow: "0 0 50px rgba(225,6,0,0.4), 0 0 100px rgba(225,6,0,0.15)" }}>
            Comprar Agora
          </a>
          <p className="text-white/25 text-sm mt-4">Acesso imediato por e-mail após a confirmação</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-card py-10">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-2xl font-bold tracking-tight">
            BOX<span className="text-primary" style={{ textShadow: "0 0 15px rgba(225,6,0,0.5)" }}>LAB</span>
          </div>
          <p className="text-white/25 text-sm">© 2025 BOXLAB. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-white/25">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

/* Inline big timer (avoids duplicate useCountdown in same render) */
function BigTimerInline() {
  const t = useCountdown();
  const m = Math.floor(t / 60).toString().padStart(2, "0");
  const s = (t % 60).toString().padStart(2, "0");
  return (
    <div className="flex items-center gap-3">
      {[{ val: m, label: "min" }, { val: s, label: "seg" }].map(({ val, label }, i) => (
        <div key={label} className="flex flex-col items-center">
          <div className="bg-black/60 border border-white/10 rounded-xl px-6 py-4 min-w-[90px] text-center"
            style={{ boxShadow: "0 0 30px rgba(225,6,0,0.25)" }}>
            <span className="font-display font-bold text-6xl md:text-7xl text-white tabular-nums leading-none">{val}</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-semibold">{label}</span>
          {i === 0 && <span className="font-display font-bold text-5xl text-primary absolute pointer-events-none" style={{ marginTop: "-.5rem", marginLeft: "7rem" }}>:</span>}
        </div>
      ))}
    </div>
  );
}
