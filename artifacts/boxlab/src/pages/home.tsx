import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Shuffle, LayoutList, Lightbulb, TrendingUp, Medal, 
  Check, Dumbbell, Target, Zap, Mail, Smartphone, Monitor, Tablet, 
  Star, ShieldCheck, Plus, X, Lock,
  Play, Pause, Volume2, VolumeX
} from 'lucide-react';

// ── Checkout URLs ──────────────────────────────────────────────────
const CHECKOUT_BASIC   = "https://pay.wiapy.com/z5wXj6DSZ5i";
const CHECKOUT_PREMIUM = "https://pay.wiapy.com/Rs06p4bonnE";
const CHECKOUT_SPECIAL = "https://pay.wiapy.com/Mz09YCSscIRi";

const COUNTDOWN_MINUTES = 25;
const STORAGE_KEY = "boxlab_offer_end";

// ── Animation wrapper ──────────────────────────────────────────────
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// ── Section heading helper ─────────────────────────────────────────
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <span className="eyebrow">{eyebrow}</span>
      <div className="section-accent" />
      <h2 className="font-display text-5xl md:text-6xl text-white mb-4 leading-none">{title}</h2>
      {sub && <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

// ── FAQ item ───────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-lg text-white group-hover:text-primary transition-colors pr-8 leading-snug">
          {q}
        </span>
        <div className="shrink-0 w-8 h-8 rounded-full border border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
          {open ? <X size={16} className="text-primary" /> : <Plus size={16} className="text-muted-foreground" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-[1.7] text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Scoreboard digit block ─────────────────────────────────────────
function DigitBlock({ value }: { value: string }) {
  return (
    <div className="w-14 h-16 sm:w-20 sm:h-[5.5rem] bg-black border border-white/15 rounded-xl flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/6" />
      <span className="font-display text-4xl sm:text-5xl text-white tabular-nums leading-none relative z-10">{value}</span>
    </div>
  );
}

function Scoreboard({ seconds, compact = false }: { seconds: number; compact?: boolean }) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  if (compact) {
    return (
      <span className="font-display text-sm sm:text-base text-white tabular-nums tracking-widest">
        {m}:{s}
      </span>
    );
  }
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex gap-1.5">
        <DigitBlock value={m[0]} />
        <DigitBlock value={m[1]} />
      </div>
      <span className="font-display text-4xl sm:text-5xl text-white/40 pb-1 leading-none select-none">:</span>
      <div className="flex gap-1.5">
        <DigitBlock value={s[0]} />
        <DigitBlock value={s[1]} />
      </div>
    </div>
  );
}

// ── Upsell Modal ───────────────────────────────────────────────────
function UpsellModal({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const premiumItems = [
    { text: "150 Dinâmicas do Plano Básico", highlight: false },
    { text: "+250 Dinâmicas exclusivas (400+ no total)", highlight: true },
    { text: "100 Combinações de Golpes (30+ páginas extras)", highlight: true },
    { text: "Cronômetro de Treinos + Protocolos de combate", highlight: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onDecline}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1c1808] to-[#0f0f0f] border-2 border-secondary rounded-3xl p-7 sm:p-10 shadow-[0_0_80px_rgba(212,175,55,0.3)] gold-glow overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onDecline}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="bg-secondary text-secondary-foreground font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-full flex items-center gap-2 shadow-lg">
            ⭐ Oferta Especial Exclusiva
          </span>
        </div>

        <h3 className="font-display text-3xl sm:text-4xl text-white text-center mb-2 leading-tight">
          Espera! Antes de finalizar…
        </h3>
        <p className="text-gray-300 text-center text-base leading-relaxed mb-6">
          Leve <strong className="text-white">tudo do Plano Premium</strong> por apenas:
        </p>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-2 mb-6">
          <span className="text-secondary/70 text-2xl font-bold">R$</span>
          <span className="text-7xl font-extrabold text-white tracking-tight gold-text-gradient">16,90</span>
          <div className="flex flex-col text-left ml-2">
            <span className="text-gray-500 text-xs line-through">R$ 22,90</span>
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Economia!</span>
          </div>
        </div>

        {/* Items */}
        <ul className="space-y-3 mb-8">
          {premiumItems.map((item, i) => (
            <li key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 ${item.highlight ? 'bg-white/5 border border-secondary/20' : 'bg-white/3'}`}>
              <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${item.highlight ? 'bg-secondary/20 border border-secondary/40' : 'bg-primary/15 border border-primary/30'}`}>
                <Check size={11} className={item.highlight ? 'text-secondary' : 'text-primary'} strokeWidth={3} />
              </span>
              <span className={`text-sm leading-snug ${item.highlight ? 'text-white font-semibold' : 'text-gray-300'}`}>
                {item.highlight && <span className="text-secondary mr-1">🎁</span>}
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Accept CTA */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); onAccept(); }}
          className="block w-full text-center bg-secondary hover:bg-[#ebd06b] text-secondary-foreground font-display text-2xl py-5 rounded-2xl uppercase tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_32px_rgba(212,175,55,0.35)] mb-4"
        >
          SIM! QUERO POR R$ 16,90
        </a>

        {/* Decline */}
        <button
          onClick={onDecline}
          className="w-full text-center text-gray-500 hover:text-gray-300 text-sm transition-colors py-2 underline underline-offset-4"
        >
          Não obrigado, quero apenas o Básico por R$ 12,90
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── VSL Player ─────────────────────────────────────────────────────
function VSLPlayer({ checkoutUrl }: { checkoutUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [progress, setProgress] = useState(0);

  // React doesn't sync `muted` JSX prop to DOM reliably — drive it via effect
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const unlock = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setMuted(false);           // triggers the effect above
    v.play().then(() => {
      setPlaying(true);
      setUnlocked(true);
    }).catch(() => {
      // Autoplay blocked — still show unlocked UI so user can retry
      setUnlocked(true);
      setPlaying(false);
    });
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!unlocked) { unlock(); return; }
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [unlocked, unlock]);

  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !unlocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }, [unlocked]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ── Video container ── */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto vsl-glow-ring rounded-2xl overflow-hidden bg-black"
           style={{ aspectRatio: '9/16' }}>

        {/* Animated glow border (rendered via ::before in CSS) */}

        <video
          ref={videoRef}
          src="/vsl.mp4"
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
        />

        {/* Unlock overlay — shown until user clicks */}
        <AnimatePresence>
          {!unlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 cursor-pointer bg-black/65 backdrop-blur-[2px]"
              onClick={unlock}
            >
              {/* Pulsing play ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping scale-125" />
                <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(225,6,0,0.8)]">
                  <Play size={34} className="text-white ml-1.5" fill="white" />
                </div>
              </div>
              {/* Unlock label */}
              <div className="bg-black/70 border border-primary/40 rounded-xl px-5 py-3 text-center">
                <p className="font-display text-white text-xl tracking-widest uppercase leading-tight">
                  🔓 Clique para desbloquear
                </p>
                <p className="text-gray-400 text-xs mt-1 tracking-wide">assista antes de comprar</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap-to-toggle play (after unlock) */}
        {unlocked && (
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay}>
            <AnimatePresence>
              {!playing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
                    <Play size={28} className="text-white ml-1" fill="white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Controls bar */}
        {unlocked && (
          <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-8 bg-gradient-to-t from-black/80 to-transparent">
            {/* Progress bar */}
            <div
              className="w-full h-1 bg-white/20 rounded-full mb-2 cursor-pointer overflow-hidden"
              onClick={seek}
            >
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Buttons row */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {playing
                  ? <Pause size={14} className="text-white" fill="white" />
                  : <Play  size={14} className="text-white ml-0.5" fill="white" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {muted
                  ? <VolumeX size={14} className="text-white" />
                  : <Volume2 size={14} className="text-white" />}
              </button>
              <div className="flex-1 text-right">
                <span className="text-white/50 text-[10px] uppercase tracking-wider">BOXLAB</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CTA below video ── */}
      <div className="w-full max-w-[380px] mx-auto flex flex-col items-center gap-3">
        <a
          href="#planos"
          onClick={e => { e.preventDefault(); document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="cta-pulse block w-full text-center bg-primary hover:bg-[#c50500] text-white font-display text-2xl py-5 rounded-2xl uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_30px_rgba(225,6,0,0.4)]"
        >
          VER PLANOS E PREÇOS
        </a>
        <span className="flex items-center gap-2 text-gray-400 text-sm">
          <Lock size={13} className="text-green-400" />
          Compra 100% segura via Pix ou cartão
        </span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function Home() {
  const [upsellOpen, setUpsellOpen] = useState(false);

  const openUpsell = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setUpsellOpen(true);
  };

  const handleUpsellAccept = () => {
    setUpsellOpen(false);
    window.location.href = CHECKOUT_SPECIAL;
  };

  const handleUpsellDecline = () => {
    setUpsellOpen(false);
    window.location.href = CHECKOUT_BASIC;
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const remaining = Math.floor((parseInt(stored, 10) - Date.now()) / 1000);
      if (remaining > 0) return remaining;
    }
    const endTime = Date.now() + COUNTDOWN_MINUTES * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(endTime));
    return COUNTDOWN_MINUTES * 60;
  });

  useEffect(() => {
    document.title = "BOXLAB — 150 Dinâmicas para Aulas de Boxe";
    const stored = localStorage.getItem(STORAGE_KEY);
    const endTime = stored ? parseInt(stored, 10) : Date.now();

    const timer = setInterval(() => {
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      if (remaining <= 0) { clearInterval(timer); setTimeLeft(0); }
      else setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    { icon: Clock,      title: "Economize horas",    desc: "planejando treinos" },
    { icon: Shuffle,    title: "Nunca mais repita",   desc: "os mesmos exercícios" },
    { icon: LayoutList, title: "Aulas mais",          desc: "organizadas" },
    { icon: Lightbulb,  title: "Mais criatividade",   desc: "para seus alunos" },
    { icon: TrendingUp, title: "Conteúdo para",       desc: "todos os níveis" },
    { icon: Medal,      title: "Material",            desc: "profissional" },
  ];

  const targets = [
    "Professores de Boxe", "Personal Trainers", "Academias",
    "Projetos Sociais", "Pessoas que treinam em casa", "Iniciantes",
  ];

  const faqs = [
    { q: "O acesso é imediato?",               a: "Sim! Em até 5 minutos após a confirmação do pagamento você recebe o acesso completo por e-mail." },
    { q: "Posso acessar pelo celular?",         a: "Sim, todo o material é otimizado para celular, tablet e computador." },
    { q: "Serve para iniciantes?",              a: "Sim, o conteúdo cobre desde o nível iniciante até o avançado." },
    { q: "Recebo por e-mail?",                  a: "Sim, o acesso é enviado automaticamente para o e-mail usado na compra." },
    { q: "Os bônus fazem parte de qual plano?", a: "Os bônus (Cronômetro de Treinos e Certificado do Boxe) são exclusivos do Plano Premium." },
  ];

  const testimonials = [
    { name: "Carlos M.",  role: "Professor de Boxe", text: "Uso o material há 2 meses e já economizei fácil umas 6 horas por semana só de planejamento de aula. Meus alunos notaram a diferença na variedade dos treinos." },
    { name: "Fernanda R.", role: "Personal Trainer",  text: "Comprei o Premium e os bônus (cronômetro e certificado) elevaram o nível da minha academia. Recuperei o investimento na primeira semana com um aluno novo." },
    { name: "Juliana P.", role: "Aluna",              text: "Treino boxe em casa há 1 mês usando o material e nunca fiquei sem saber o que fazer. Tem dinâmica pra todo nível, do zero ao avançado." },
    { name: "Rodrigo S.", role: "Personal Trainer",   text: "Conteúdo muito organizado, direto ao ponto. Aplicando com meus alunos desde o primeiro dia — a qualidade do material impressiona." },
    { name: "Tiago L.",  role: "Professor de Boxe",  text: "Os alunos adoraram as dinâmicas em dupla. O nível de engajamento da turma subiu muito e o planejamento ficou muito mais rápido." },
  ];

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="bg-noise min-h-screen">

      {/* ─── ANNOUNCEMENT BAR ────────────────────────────────────── */}
      <a
        href={CHECKOUT_SPECIAL}
        className="announcement-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 sm:gap-5 px-4 py-3 cursor-pointer"
      >
        {/* left glow pulse */}
        <span className="hidden sm:block w-2 h-2 rounded-full bg-white animate-ping opacity-80" />
        <span className="font-display text-white text-xl sm:text-2xl md:text-3xl uppercase tracking-wide leading-none text-center">
          🔥 Oferta especial — encerra em{' '}
          <span className="text-white underline decoration-white/40 underline-offset-4">
            <Scoreboard seconds={timeLeft} compact />
          </span>
        </span>
        <span className="hidden sm:block w-2 h-2 rounded-full bg-white animate-ping opacity-80" />
      </a>

      {/* ─── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-40 pb-20 px-5 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 bg-black">
          <img
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop"
            alt="Boxer training"
            className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow justify-center">BOXLAB</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-display text-white mb-6 leading-[0.95] uppercase drop-shadow-2xl">
              Chega de Ficar<br />
              <span className="text-primary">Sem Ideia Pro</span><br />
              Treino de Boxe
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-[1.65]">
              150 dinâmicas prontas, organizadas e fáceis de aplicar. Pra quem ensina boxe ou quer aprender sozinho, em casa.
            </p>

            {/* Pulse CTA */}
            <a
              href="#planos"
              onClick={scrollToPricing}
              className="cta-pulse inline-block bg-primary hover:bg-[#c50500] text-white font-display text-2xl sm:text-3xl px-10 sm:px-14 py-5 sm:py-7 rounded-2xl uppercase tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(225,6,0,0.45)]"
            >
              QUERO MEU ACESSO AGORA
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── VSL ─────────────────────────────────────────────────── */}
      <section className="py-16 px-5 bg-background relative z-10">
        <div className="max-w-lg mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="eyebrow justify-center mb-4">Assista antes de comprar</span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[0.92] uppercase tracking-tight">
                Veja como<br />
                <span className="text-primary">funciona</span>
              </h2>
              <p className="text-gray-400 text-base mt-4 leading-relaxed max-w-sm mx-auto">
                Em menos de alguns minutos você entende tudo sobre o material.
              </p>
            </div>
            <VSLPlayer checkoutUrl={CHECKOUT_SPECIAL} />
          </FadeIn>
        </div>
      </section>

      {/* ─── 6. PLANOS ───────────────────────────────────────────── */}
      <section id="planos" className="py-32 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionHead
              eyebrow="Investimento"
              title={<>Escolha seu Plano</>}
              sub="Acesso imediato a todo o material após a confirmação"
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

            {/* ── Básico ── */}
            <FadeIn delay={0.1}>
              <div className="h-full bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-10 hover:border-primary/30 transition-all flex flex-col shadow-xl">
                <div className="mb-8">
                  <h3 className="font-display text-4xl text-white mb-1">Plano Básico</h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-5">Acesso Padrão</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl text-gray-400 font-bold">R$</span>
                    <span className="text-6xl font-extrabold text-white tracking-tight">12,90</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {["Preparação e Desenvolvimento", "Técnica e Combate", "Performance e Aulas"].map((li, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-gray-300 text-base md:text-lg">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                        <Check size={11} className="text-primary" strokeWidth={3} />
                      </span>
                      <span>{li}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3.5 text-gray-300 text-base md:text-lg">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Check size={11} className="text-primary" strokeWidth={3} />
                    </span>
                    <span><strong className="text-white">150 Dinâmicas completas</strong> para seus treinos</span>
                  </li>
                </ul>

                <a
                  href={CHECKOUT_BASIC}
                  onClick={openUpsell}
                  className="block w-full text-center bg-primary hover:bg-[#c50500] hover:scale-[1.02] active:scale-[0.98] text-white font-display text-2xl py-5 rounded-2xl uppercase tracking-wider transition-all shadow-[0_8px_28px_rgba(225,6,0,0.32)] hover:shadow-[0_12px_36px_rgba(225,6,0,0.48)]"
                >
                  QUERO ESTE AQUI!
                </a>
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  <span className="flex items-center gap-2 text-gray-400 text-sm">
                    <Lock size={13} className="text-green-400" />
                    <span>Compra 100% segura via Pix ou cartão</span>
                  </span>
                  <span className="text-gray-600 text-xs">Garantia de 7 dias — risco zero</span>
                </div>
              </div>
            </FadeIn>

            {/* ── Premium ── */}
            <FadeIn delay={0.2}>
              <div className="h-full bg-gradient-to-b from-[#1c1808] to-card border-2 border-secondary rounded-3xl p-6 sm:p-10 relative gold-glow md:-translate-y-4 shadow-2xl flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground font-bold px-6 py-2 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg whitespace-nowrap">
                  ⭐ Mais Escolhido
                </div>

                <div className="mb-8 mt-2">
                  <h3 className="font-display text-5xl text-white mb-1 gold-text-gradient">Plano Premium</h3>
                  <p className="text-secondary text-xs uppercase tracking-widest font-bold mb-5">Melhor Custo-Benefício</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl text-secondary/70 font-bold">R$</span>
                    <span className="text-7xl font-extrabold text-white tracking-tight">22,90</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {["Preparação e Desenvolvimento", "Técnica e Combate", "Performance e Aulas"].map((li, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-gray-200 text-base md:text-lg">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center">
                        <Check size={11} className="text-secondary" strokeWidth={3} />
                      </span>
                      <span>{li}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3.5 text-gray-200 text-base md:text-lg">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center">
                      <Check size={11} className="text-secondary" strokeWidth={3} />
                    </span>
                    <span>As mesmas <strong className="text-white">150 dinâmicas do Básico</strong></span>
                  </li>

                  <li className="list-none pt-3 pb-0">
                    <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 flex items-center gap-2">
                      <span className="flex-1 h-px bg-secondary/25" />
                      + Bônus Exclusivos do Premium
                      <span className="flex-1 h-px bg-secondary/25" />
                    </div>
                  </li>
                  {[
                    "+250 Dinâmicas exclusivas (400+ no total)",
                    "100 Combinações de Golpes (+ de 30 páginas extras)",
                    "Cronômetro de Treinos + Protocolos de combate",
                  ].map((bonus, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-white font-semibold bg-white/5 p-4 rounded-2xl border border-white/8">
                      <span className="text-xl shrink-0 mt-0.5">🎁</span>
                      <span className="text-base leading-snug">
                        {i === 0
                          ? <><strong>+250 Dinâmicas exclusivas</strong> <span className="text-secondary font-bold">(400+ no total)</span></>
                          : bonus}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CHECKOUT_PREMIUM}
                  className="block w-full text-center bg-secondary hover:bg-[#ebd06b] hover:scale-[1.02] active:scale-[0.98] text-secondary-foreground font-display text-2xl py-5 rounded-2xl uppercase tracking-wide transition-all shadow-[0_10px_32px_rgba(212,175,55,0.32)] hover:shadow-[0_14px_44px_rgba(212,175,55,0.5)]"
                >
                  QUERO ESTE AQUI!
                </a>
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  <span className="flex items-center gap-2 text-gray-400 text-sm">
                    <Lock size={13} className="text-green-400" />
                    <span>Compra 100% segura via Pix ou cartão</span>
                  </span>
                  <span className="text-gray-600 text-xs">Garantia de 7 dias — risco zero</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 7. COMO VOCÊ RECEBE ─────────────────────────────────── */}
      <section className="py-24 bg-card/60 border-y border-border">
        <div className="max-w-5xl mx-auto px-5 text-center flex flex-col items-center">
          <div className="bg-primary/10 p-5 rounded-2xl mb-8 border border-primary/20 shadow-lg">
            <Mail className="text-primary" size={44} strokeWidth={1.8} />
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-white mb-5">📩 Receba diretamente no seu e-mail</h3>
          <p className="text-muted-foreground text-lg md:text-xl mb-14 max-w-3xl leading-[1.65]">
            Após a confirmação do pagamento você receberá acesso imediato aos materiais para download em formato PDF e área de membros.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-14 justify-center text-gray-400">
            {[{ icon: Smartphone, label: "Celular" }, { icon: Monitor, label: "Computador" }, { icon: Tablet, label: "Tablet" }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="bg-background p-4 rounded-full border border-border shadow-md hover:border-primary/30 transition-colors">
                  <Icon size={30} strokeWidth={1.6} />
                </div>
                <span className="font-semibold uppercase tracking-wider text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. DEPOIMENTOS ──────────────────────────────────────── */}
      <section className="py-32 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionHead
              eyebrow="Avaliações"
              title="O que dizem sobre nós"
              sub="Profissionais que já transformaram suas aulas"
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card-lift h-full flex flex-col bg-[#161616] rounded-2xl overflow-hidden border border-white/8 shadow-xl">
                  {/* Fake review chrome */}
                  <div className="bg-[#0f0f0f] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-auto text-xs text-gray-600 tracking-wide">Avaliação verificada</span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Stars */}
                    <div className="flex text-secondary mb-3 gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={15} fill="currentColor" />)}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-300 text-base leading-[1.7] flex-1 mb-5">
                      <span className="font-display text-4xl text-primary/40 leading-none align-bottom mr-1">"</span>
                      {t.text}
                      <span className="font-display text-4xl text-primary/40 leading-none align-top ml-1">"</span>
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center text-primary font-bold font-display text-lg shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm leading-tight">{t.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. GARANTIA ─────────────────────────────────────────── */}
      <section className="py-24 px-5 bg-gradient-to-r from-primary/10 via-background to-primary/10 border-y border-primary/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          {/* Shield badge */}
          <div className="shrink-0">
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-primary/25 to-primary/8 border-4 border-primary/35 flex items-center justify-center shadow-[0_0_60px_rgba(225,6,0,0.22)]">
              {/* Outer ring */}
              <div className="absolute inset-[-8px] rounded-full border border-primary/15 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={60} className="text-primary" strokeWidth={1.4} />
                <span className="font-display text-white text-2xl leading-none tracking-wide">7 DIAS</span>
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Garantia</span>
              </div>
            </div>
          </div>

          <div>
            <span className="eyebrow">Sem Risco</span>
            <h3 className="font-display text-5xl md:text-6xl text-white mb-5 leading-none">🛡 Garantia de 7 Dias</h3>
            <p className="text-gray-300 text-lg md:text-xl leading-[1.65]">
              Temos tanta confiança na qualidade do material que oferecemos 7 dias de garantia incondicional.
              Se o material não atender às suas expectativas, você poderá solicitar o reembolso integral dentro do prazo previsto pela plataforma. Risco zero para você.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─────────────────────────────────────────────── */}
      <section className="py-32 px-5 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <SectionHead eyebrow="Dúvidas" title="Perguntas Frequentes" />
          </FadeIn>
          <div className="bg-card/30 border border-border rounded-3xl p-6 md:p-12 divide-y divide-border">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CTA ───────────────────────────────────────── */}
      <section className="py-32 px-5 border-t border-border relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop"
            alt="Boxer ring"
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity grayscale"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-14 drop-shadow-xl uppercase leading-[0.9]">
              Comece hoje mesmo <br />
              <span className="text-primary">a transformar seus treinos.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-2xl mx-auto">
              <a
                href={CHECKOUT_BASIC}
                onClick={openUpsell}
                className="flex-1 flex items-center justify-center gap-3 bg-transparent border-2 border-primary hover:bg-primary text-white font-display text-2xl py-6 px-8 rounded-2xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 hover:shadow-[0_10px_28px_rgba(225,6,0,0.38)]"
              >
                <span className="text-2xl">🥊</span> Básico
              </a>
              <a
                href={CHECKOUT_PREMIUM}
                className="flex-1 flex items-center justify-center gap-3 bg-secondary hover:bg-[#ebd06b] hover:scale-105 active:scale-95 text-secondary-foreground font-display text-2xl py-6 px-8 rounded-2xl uppercase tracking-wider transition-all shadow-[0_10px_32px_rgba(212,175,55,0.3)] hover:shadow-[0_14px_44px_rgba(212,175,55,0.48)]"
              >
                <span className="text-2xl">🏆</span> Premium
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[#040404] py-14 text-center border-t border-white/5 relative z-20">
        <div className="max-w-6xl mx-auto px-5 flex flex-col items-center gap-5">
          <h2 className="font-display text-3xl text-white/20 tracking-[0.3em]">BOXLAB</h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.
            Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
          <p className="text-sm text-gray-700">&copy; {new Date().getFullYear()} BoxLab. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-xs text-gray-600 mt-2">
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest font-semibold">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest font-semibold">Termos de Uso</a>
          </div>
        </div>
      </footer>

      {/* ─── UPSELL MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {upsellOpen && (
          <UpsellModal onAccept={handleUpsellAccept} onDecline={handleUpsellDecline} />
        )}
      </AnimatePresence>

    </div>
  );
}
