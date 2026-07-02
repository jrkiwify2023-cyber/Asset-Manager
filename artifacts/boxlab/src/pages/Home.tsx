import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
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
  Trophy
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
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const savedTime = localStorage.getItem("boxlab_timer");
    const savedTimestamp = localStorage.getItem("boxlab_timestamp");
    if (savedTime && savedTimestamp) {
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
      const remaining = parseInt(savedTime, 10) - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 15 * 60);
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev <= 1 ? 15 * 60 : prev - 1;
        localStorage.setItem("boxlab_timer", next.toString());
        localStorage.setItem("boxlab_timestamp", Date.now().toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col items-center">
        <div className="bg-black/60 border border-white/10 rounded-xl px-6 py-4 min-w-[90px] text-center"
          style={{ boxShadow: "0 0 30px rgba(225,6,0,0.25)" }}>
          <span className="font-display font-bold text-6xl md:text-7xl text-white tabular-nums leading-none">
            {minutes.toString().padStart(2, "0")}
          </span>
        </div>
        <span className="text-xs uppercase tracking-widest text-white/50 mt-2 font-semibold">min</span>
      </div>
      <span className="font-display font-bold text-5xl text-primary mb-5">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-black/60 border border-white/10 rounded-xl px-6 py-4 min-w-[90px] text-center"
          style={{ boxShadow: "0 0 30px rgba(225,6,0,0.25)" }}>
          <span className="font-display font-bold text-6xl md:text-7xl text-white tabular-nums leading-none">
            {seconds.toString().padStart(2, "0")}
          </span>
        </div>
        <span className="text-xs uppercase tracking-widest text-white/50 mt-2 font-semibold">seg</span>
      </div>
    </div>
  );
};

const testimonials = [
  { text: "Material excelente! Minhas aulas ficaram muito mais dinâmicas e criativas. Recomendo para todos os professores.", author: "Carlos M.", role: "Professor de Boxe" },
  { text: "Valeu cada centavo. O premium ainda vem com bônus incríveis! Minha academia evoluiu muito.", author: "Fernanda R.", role: "Personal Trainer" },
  { text: "Treino em casa e adorei. Conteúdo para todos os níveis, do iniciante ao avançado!", author: "Juliana P.", role: "Aluna" },
  { text: "Conteúdo muito organizado e fácil de aplicar nas aulas. Acabei comprando o premium também.", author: "Rodrigo S.", role: "Professor" },
  { text: "Meus alunos adoraram as novas dinâmicas. Nunca mais ficamos repetindo o mesmo treino.", author: "Tiago L.", role: "Dono de Academia" },
];

const AutoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    startTimer();
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-card border border-border p-8 md:p-10 rounded-2xl text-center"
            style={{ boxShadow: "0 0 40px rgba(225,6,0,0.07)" }}
          >
            <div className="flex gap-1 justify-center mb-6">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90 font-medium italic">
              "{testimonials[current].text}"
            </p>
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-widest text-white">
                {testimonials[current].author}
              </p>
              <p className="text-primary text-sm font-semibold mt-1">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
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
              data-testid={`carousel-dot-${i}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
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

const contentTabs = [
  {
    icon: Zap,
    label: "Preparação",
    title: "Preparação e Desenvolvimento",
    desc: "Aquecimentos específicos para boxe, rotinas de mobilidade articular, exercícios de condicionamento físico e mentais para preparar atletas e alunos no nível correto.",
    items: ["Aquecimentos dinâmicos", "Mobilidade articular", "Condicionamento progressivo", "Exercícios de coordenação", "Ativação muscular específica"]
  },
  {
    icon: Target,
    label: "Técnica",
    title: "Técnica e Combate",
    desc: "Fundamentos técnicos avançados, combinações de golpes planejadas, técnicas de defesa, drills de sparring e simulações reais de combate para todos os níveis.",
    items: ["Jab, direto, gancho, uppercut", "Técnicas de esquiva e defesa", "Combinações táticas", "Drills de sparring controlado", "Leitura e reação ao adversário"]
  },
  {
    icon: Trophy,
    label: "Performance",
    title: "Performance e Aulas",
    desc: "Treinos funcionais de alta intensidade, circuitos metabólicos e estruturas completas de planos de aula para academias, projetos sociais e aulas individuais.",
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
              data-testid={`content-tab-${i}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                active === i
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-white/60 hover:text-white hover:border-primary/50"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12"
          style={{ boxShadow: "0 0 60px rgba(225,6,0,0.08)" }}
        >
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-3 mb-4">
                {(() => { const Icon = contentTabs[active].icon; return <Icon className="w-7 h-7 text-primary" />; })()}
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
                  {contentTabs[active].title}
                </h3>
              </div>
              <p className="text-white/60 leading-relaxed text-lg">
                {contentTabs[active].desc}
              </p>
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
          <div className="font-display text-3xl font-extrabold tracking-tight flex items-center gap-1">
            <span className="text-white">BOX</span>
            <span className="text-primary" style={{ textShadow: "0 0 20px rgba(225,6,0,0.6)" }}>LAB</span>
          </div>
          <button
            data-testid="header-cta"
            onClick={() => scrollToSection("planos")}
            className="bg-primary hover:bg-primary/90 text-white font-display font-bold px-6 py-2.5 rounded-lg transition-all text-sm uppercase tracking-widest"
            style={{ boxShadow: "0 0 20px rgba(225,6,0,0.3)" }}
          >
            Comprar Agora
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-10" />
          {heroBg && (
            <img src={heroBg} alt="Boxing Training" className="w-full h-full object-cover object-center opacity-50" />
          )}
        </div>

        <div className="container mx-auto px-4 relative z-20 max-w-5xl w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeIn} className="inline-block bg-primary/20 text-primary border border-primary/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-8 uppercase">
              Material Exclusivo para Professores de Boxe
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-none tracking-tight mb-6"
            >
              150 Dinâmicas<br />
              <span className="text-primary" style={{ textShadow: "0 0 60px rgba(225,6,0,0.5), 0 0 120px rgba(225,6,0,0.2)" }}>
                Para Aulas de Boxe
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto font-medium"
            >
              Transforme seus treinos com uma biblioteca completa de dinâmicas prontas para professores, academias e pessoas que desejam aprender Boxe em casa.
            </motion.p>
            <motion.div variants={fadeIn}>
              <button
                data-testid="hero-cta"
                onClick={() => scrollToSection("planos")}
                className="bg-primary hover:bg-primary/90 text-white font-display text-xl font-bold px-12 py-5 rounded-xl transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest shadow-2xl"
                style={{ boxShadow: "0 0 50px rgba(225,6,0,0.4), 0 0 100px rgba(225,6,0,0.15)" }}
              >
                Quero Meu Acesso Agora
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Por Que <span className="text-primary" style={{ textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>BoxLab?</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={{ boxShadow: "0 0 10px rgba(225,6,0,0.8)" }} />
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              "Economize horas planejando treinos",
              "Nunca mais repita os mesmos exercícios",
              "Aulas mais organizadas e profissionais",
              "Mais criatividade em cada treino",
              "Conteúdo para todos os níveis",
              "Material profissional e completo"
            ].map((benefit, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-background border border-border p-7 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <p className="font-bold text-lg leading-tight pt-1 text-white/90">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Para Quem É */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Para Quem É O <span className="text-primary" style={{ textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>BoxLab?</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={{ boxShadow: "0 0 10px rgba(225,6,0,0.8)" }} />
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {[
              "Professores de Boxe",
              "Personal Trainers",
              "Academias",
              "Projetos Sociais",
              "Pessoas que treinam em casa",
              "Iniciantes"
            ].map((audience, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-card border border-border p-5 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="font-bold text-lg">{audience}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* O Que Você Recebe — Interactive Tabs */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              O Que Você <span className="text-primary" style={{ textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>Recebe</span>
            </h2>
            <p className="text-white/50 mt-4 text-lg">Selecione um módulo para explorar o conteúdo</p>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={{ boxShadow: "0 0 10px rgba(225,6,0,0.8)" }} />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <ContentTabs />
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="planos" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Escolha Seu <span className="text-primary" style={{ textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>Plano</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={{ boxShadow: "0 0 10px rgba(225,6,0,0.8)" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Básico */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setHoveredPlan(0)}
              onHoverEnd={() => setHoveredPlan(null)}
              className="bg-card border rounded-2xl p-8 md:p-10 relative cursor-default transition-all duration-300"
              style={{
                borderColor: hoveredPlan === 0 ? "rgba(225,6,0,0.6)" : "rgba(255,255,255,0.1)",
                boxShadow: hoveredPlan === 0 ? "0 0 40px rgba(225,6,0,0.15)" : "none"
              }}
            >
              <h3 className="font-display text-3xl font-bold uppercase mb-2 text-center">Plano Básico</h3>
              <p className="text-white/50 mb-6 text-center">O essencial para transformar suas aulas.</p>

              <div className="text-center mb-8">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Por apenas</span>
                <div className="flex items-baseline gap-1 justify-center mt-1">
                  <span className="font-display text-2xl text-white/60">R$</span>
                  <span className="font-display text-7xl font-bold">12,90</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {["Preparação e Desenvolvimento", "Técnica e Combate", "Performance e Aulas", "150 Dinâmicas de Boxe"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={CHECKOUT_URL}
                data-testid="btn-basico"
                className="block text-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-display font-bold text-lg uppercase tracking-widest py-4 rounded-xl transition-all duration-300"
              >
                Quero o Plano Básico
              </a>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onHoverStart={() => setHoveredPlan(1)}
              onHoverEnd={() => setHoveredPlan(null)}
              className="rounded-2xl p-8 md:p-12 relative z-10 md:scale-105 cursor-default transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #111 0%, #1a1500 100%)",
                border: "2px solid hsl(46 65% 52%)",
                boxShadow: hoveredPlan === 1
                  ? "0 0 80px rgba(212,175,55,0.3), 0 0 160px rgba(212,175,55,0.1), inset 0 0 60px rgba(212,175,55,0.05)"
                  : "0 0 40px rgba(212,175,55,0.15), inset 0 0 40px rgba(212,175,55,0.03)"
              }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-black font-display font-bold uppercase tracking-widest text-sm px-6 py-2 rounded-full shadow-lg whitespace-nowrap"
                style={{ boxShadow: "0 0 20px rgba(212,175,55,0.5)" }}>
                ⭐ Mais Escolhido
              </div>

              <h3 className="font-display text-3xl font-bold uppercase mb-1 text-center text-accent">Plano Premium</h3>
              <p className="text-white/50 mb-6 text-center">A experiência completa com bônus exclusivos.</p>

              <div className="text-center mb-8">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Por apenas</span>
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
              </div>

              <a
                href={CHECKOUT_URL_PREMIUM}
                data-testid="btn-premium"
                className="block text-center font-display font-bold text-xl uppercase tracking-widest py-5 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f0d060, #d4af37)",
                  color: "#000",
                  boxShadow: "0 0 30px rgba(212,175,55,0.4)"
                }}
              >
                Quero o Premium
              </a>

              <p className="text-center text-accent/60 text-sm font-semibold mt-4 uppercase tracking-widest">Melhor Custo-Benefício</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como você recebe */}
      <section className="bg-card py-16 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 flex gap-5 items-start">
              <div className="bg-primary/10 p-4 rounded-xl text-primary flex-shrink-0">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Como Você Recebe</h3>
                <p className="text-white/60 leading-relaxed">
                  <strong className="text-white">Receba diretamente no seu e-mail</strong> — Após a confirmação do pagamento você receberá acesso imediato aos materiais para download.
                </p>
              </div>
            </div>
            <div className="flex gap-8 text-white/40">
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

      {/* Testimonials — Auto Carousel */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              O Que Dizem <span className="text-primary" style={{ textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>Nossos Alunos</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={{ boxShadow: "0 0 10px rgba(225,6,0,0.8)" }} />
          </motion.div>

          <AutoCarousel />
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #111 0%, #0f0f0f 100%)",
              border: "1px solid rgba(225,6,0,0.2)",
              boxShadow: "0 0 60px rgba(225,6,0,0.08)"
            }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 bg-primary flex flex-col items-center justify-center py-10 px-6 text-center flex-shrink-0">
                <ShieldCheck className="w-14 h-14 text-white mb-3" />
                <p className="font-display text-5xl font-bold text-white leading-none">7</p>
                <p className="font-display text-sm font-bold text-white/80 uppercase tracking-widest mt-1">Dias de<br/>Garantia</p>
              </div>
              <div className="flex-1 p-8 md:p-12 text-center md:text-left flex flex-col justify-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
                  Garantia Incondicional de 7 Dias
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Compre com total confiança. Se por qualquer motivo o material não atender às suas expectativas, basta entrar em contato dentro de 7 dias e você recebe <strong className="text-white">100% do seu dinheiro de volta</strong>. Sem burocracia, sem perguntas.
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

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Perguntas <span className="text-primary" style={{ textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" style={{ boxShadow: "0 0 10px rgba(225,6,0,0.8)" }} />
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              { q: "O acesso é imediato?", a: "Sim! Após a confirmação do pagamento você receberá o acesso imediatamente no seu e-mail." },
              { q: "Posso acessar pelo celular?", a: "Sim! O material é acessível em qualquer dispositivo: celular, computador ou tablet." },
              { q: "Serve para iniciantes?", a: "Com certeza! O conteúdo é desenvolvido para todos os níveis, do iniciante ao avançado." },
              { q: "Recebo por e-mail?", a: "Sim! Todo o material é enviado diretamente para o e-mail cadastrado no momento da compra." },
              { q: "Os bônus fazem parte de qual plano?", a: "Os bônus (100 Combinações de Golpes e Cronômetro de Treinos) são exclusivos do Plano Premium." },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="font-display text-lg font-bold uppercase tracking-wide py-5 hover:no-underline hover:text-primary transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-base pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Urgency / Oferta Especial — above footer */}
      <section id="oferta" className="py-16 border-t border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block bg-primary/10 text-primary border border-primary/30 font-display font-bold uppercase tracking-widest px-5 py-2 rounded-full text-sm mb-8 animate-pulse">
            Oferta Especial Por Tempo Limitado
          </div>

          <CountdownTimer />

          <p className="mt-6 text-white/40 font-medium text-sm">
            Após o término da oferta os valores poderão ser alterados sem aviso prévio.
          </p>

          <div className="mt-10">
            <a
              href={CHECKOUT_URL_PREMIUM}
              data-testid="urgency-cta"
              className="inline-block font-display font-bold text-2xl uppercase tracking-widest px-14 py-5 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #e10600, #c00000)",
                color: "#fff",
                boxShadow: "0 0 50px rgba(225,6,0,0.4), 0 0 100px rgba(225,6,0,0.15)"
              }}
            >
              Comprar Agora
            </a>
            <p className="text-white/30 text-sm mt-4">Acesso imediato por e-mail após a confirmação</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-10 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-2xl font-bold tracking-tight">
            BOX<span className="text-primary" style={{ textShadow: "0 0 15px rgba(225,6,0,0.5)" }}>LAB</span>
          </div>
          <p className="text-white/30 text-sm">© 2025 BOXLAB. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
