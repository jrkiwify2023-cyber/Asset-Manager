import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Shuffle, LayoutList, Lightbulb, TrendingUp, Medal, 
  Check, Dumbbell, Target, Zap, Mail, Smartphone, Monitor, Tablet, 
  Star, ShieldCheck, Plus, X, Lock
} from 'lucide-react';

const CHECKOUT_URL = "#"; // TODO: Replace with your actual checkout URL
const COUNTDOWN_MINUTES = 25; // Session duration in minutes

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

function FaqItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button 
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-lg text-white group-hover:text-primary transition-colors pr-8">{q}</span>
        <div className="text-muted-foreground shrink-0 transition-transform duration-300">
          {open ? <X size={24} className="text-primary" /> : <Plus size={24} />}
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
            <p className="pb-6 text-gray-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const STORAGE_KEY = "boxlab_offer_end";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Persist timer across page loads using localStorage
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

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    { icon: Clock, title: "Economize horas", desc: "planejando treinos" },
    { icon: Shuffle, title: "Nunca mais repita", desc: "os mesmos exercícios" },
    { icon: LayoutList, title: "Aulas mais", desc: "organizadas" },
    { icon: Lightbulb, title: "Mais criatividade", desc: "para seus alunos" },
    { icon: TrendingUp, title: "Conteúdo para", desc: "todos os níveis" },
    { icon: Medal, title: "Material", desc: "profissional" },
  ];

  const targets = [
    "Professores de Boxe", "Personal Trainers", "Academias", 
    "Projetos Sociais", "Pessoas que treinam em casa", "Iniciantes"
  ];

  const faqs = [
    { q: "O acesso é imediato?", a: "Sim! Em até 5 minutos após a confirmação do pagamento você recebe o acesso completo por e-mail." },
    { q: "Posso acessar pelo celular?", a: "Sim, todo o material é otimizado para celular, tablet e computador." },
    { q: "Serve para iniciantes?", a: "Sim, o conteúdo cobre desde o nível iniciante até o avançado." },
    { q: "Recebo por e-mail?", a: "Sim, o acesso é enviado automaticamente para o e-mail usado na compra." },
    { q: "Os bônus fazem parte de qual plano?", a: "Os bônus (Cronômetro de Treinos e Certificado do Boxe) são exclusivos do Plano Premium." }
  ];

  const testimonials = [
    { name: "Carlos M.", role: "Professor de Boxe", text: "Uso o material há 2 meses e já economizei fácil umas 6 horas por semana só de planejamento de aula. Meus alunos notaram a diferença na variedade dos treinos." },
    { name: "Fernanda R.", role: "Personal Trainer", text: "Comprei o Premium e os bônus (cronômetro e certificado) elevaram o nível da minha academia. Recuperei o investimento na primeira semana com um aluno novo." },
    { name: "Juliana P.", role: "Aluna", text: "Treino boxe em casa há 1 mês usando o material e nunca fiquei sem saber o que fazer. Tem dinâmica pra todo nível, do zero ao avançado." },
    { name: "Rodrigo S.", role: "Personal Trainer", text: "Conteúdo muito organizado, direto ao ponto. Aplicando com meus alunos desde o primeiro dia — a qualidade do material impressiona." },
    { name: "Tiago L.", role: "Professor de Boxe", text: "Os alunos adoraram as dinâmicas em dupla. O nível de engajamento da turma subiu muito e o planejamento ficou muito mais rápido." }
  ];

  return (
    <div className="bg-noise min-h-screen">
      
      {/* 1. Header / Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden border-b border-border">
        {/* Client swap: Hero Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop" 
            alt="Boxer training" 
            className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-display text-2xl md:text-3xl tracking-widest mb-6">BOXLAB</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-white mb-6 leading-[0.9] uppercase drop-shadow-2xl">
              150 Dinâmicas <br/>
              <span className="text-primary">para Aulas de Boxe</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transforme seus treinos com uma biblioteca completa de dinâmicas prontas para professores, academias e pessoas que desejam aprender Boxe em casa.
            </p>
            
            <a 
              href="#planos" 
              onClick={scrollToPricing}
              className="inline-block bg-primary hover:bg-primary/90 text-white font-display text-3xl px-12 py-6 rounded-md uppercase tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(225,6,0,0.5)]"
            >
              QUERO MEU ACESSO AGORA
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Benefits */}
      <section className="py-24 px-4 bg-background relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card/50 backdrop-blur-sm border border-card-border p-8 rounded-2xl flex items-start gap-5 hover:border-primary/50 hover:bg-card transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary">
                    <b.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">{b.title}</h3>
                    <p className="text-muted-foreground text-lg">{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Para Quem É */}
      <section className="py-20 px-4 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-10">Para Quem É o BoxLab?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {targets.map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border hover:border-primary/50 transition-colors px-6 py-4 rounded-full shadow-sm">
                  <Check className="text-primary shrink-0" size={24} strokeWidth={3} />
                  <span className="text-white font-semibold text-lg">{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. O Que Você Recebe */}
      <section className="py-32 px-4 bg-background relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-6xl text-white mb-4">O Que Você Recebe</h2>
              <p className="text-muted-foreground text-xl">Um arsenal completo de treinos divididos em 3 pilares</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Central Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center justify-center w-40 h-40 bg-primary text-white font-display text-3xl leading-none text-center rounded-full border-8 border-background shadow-[0_0_40px_rgba(225,6,0,0.4)]">
              <span>150</span>
              <span className="text-lg mt-1 tracking-wider">DINÂMICAS</span>
            </div>

            {[
              { title: "Preparação e Desenvolvimento", icon: Dumbbell, img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop" },
              { title: "Técnica e Combate", icon: Target, img: "https://images.unsplash.com/photo-1591504770054-c9b2ccab72f5?q=80&w=800&auto=format&fit=crop" },
              { title: "Performance e Aulas", icon: Zap, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-card rounded-3xl overflow-hidden border border-border group shadow-xl">
                  {/* Client swap: Category Images */}
                  <div className="h-64 relative overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 group-hover:via-black/40 transition-colors"></div>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
                    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                      <div className="bg-primary p-3 rounded-lg text-white">
                        <item.icon size={28} />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-3xl text-white tracking-wide">{item.title}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Offer + Countdown Timer */}
      <section className="bg-primary py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-multiply bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-left">
            <h3 className="font-display text-4xl text-white mb-2 uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl">🔥</span> Oferta Especial
            </h3>
            <p className="text-white/90 font-medium text-lg">Após o término da oferta os valores poderão ser alterados.</p>
          </div>
          
          <div className="bg-black/40 px-8 py-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="text-sm text-white/70 font-bold uppercase tracking-widest text-center mb-1">Encerra em</div>
            <div className="font-display text-6xl text-white tracking-widest tabular-nums leading-none">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Planos (Pricing) */}
      <section id="planos" className="py-32 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-7xl text-white mb-4">Escolha seu Plano</h2>
              <p className="text-muted-foreground text-xl">Acesso imediato a todo o material após a confirmação</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Basic Plan */}
            <FadeIn delay={0.1}>
              <div className="h-full bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-10 hover:border-primary/30 transition-all flex flex-col">
                <div className="mb-8">
                  <h3 className="font-display text-4xl text-white mb-2">Plano Básico</h3>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider font-bold mb-4">Acesso Padrão</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl text-gray-400 font-bold">R$</span>
                    <span className="text-6xl font-bold text-white">12,90</span>
                  </div>
                </div>
                
                <ul className="space-y-5 mb-10 flex-1">
                  {["Preparação e Desenvolvimento", "Técnica e Combate", "Performance e Aulas"].map((li, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-300 text-lg">
                      <Check size={24} className="text-primary shrink-0 mt-0.5" />
                      <span>{li}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-4 text-gray-300 text-lg">
                    <Check size={24} className="text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-white">150 Dinâmicas completas</strong> para seus treinos</span>
                  </li>
                </ul>
                
                <a href={CHECKOUT_URL} className="block w-full text-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-display text-2xl py-6 rounded-xl uppercase tracking-wider transition-colors">
                  QUERO O PLANO BÁSICO
                </a>
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span className="flex items-center gap-2 text-gray-400 text-sm"><Lock size={14} className="text-green-400" /><span>Compra 100% segura via Pix ou cartão</span></span>
                  <span className="text-gray-500 text-xs">Garantia de 7 dias — risco zero</span>
                </div>
              </div>
            </FadeIn>

            {/* Premium Plan */}
            <FadeIn delay={0.2}>
              <div className="h-full bg-gradient-to-b from-[#1a1608] to-card border-2 border-secondary rounded-3xl p-10 relative gold-glow transform md:-translate-y-4 shadow-2xl flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground font-bold px-6 py-2 rounded-full text-sm uppercase tracking-widest flex items-center gap-2 shadow-lg whitespace-nowrap">
                  ⭐ Mais Escolhido
                </div>
                
                <div className="mb-8 mt-2">
                  <h3 className="font-display text-5xl text-white mb-2 gold-text-gradient">Plano Premium</h3>
                  <div className="text-secondary font-bold text-sm uppercase tracking-wider mb-4">Melhor Custo-Benefício</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl text-secondary/70 font-bold">R$</span>
                    <span className="text-7xl font-bold text-white">22,90</span>
                  </div>
                </div>
                
                <ul className="space-y-5 mb-10 flex-1">
                  {["Preparação e Desenvolvimento", "Técnica e Combate", "Performance e Aulas"].map((li, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-200 text-lg">
                      <Check size={24} className="text-secondary shrink-0 mt-0.5" />
                      <span>{li}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-4 text-gray-200 text-lg">
                    <Check size={24} className="text-secondary shrink-0 mt-0.5" />
                    <span>As mesmas <strong className="text-white">150 dinâmicas do Básico</strong></span>
                  </li>
                  
                  <li className="list-none pt-4 pb-0">
                    <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-3">+ Bônus Exclusivos do Premium</div>
                  </li>
                  <li className="flex items-start gap-4 text-white font-bold bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-2xl shrink-0 mt-0.5">🎁</span>
                    <span className="text-lg">+250 Dinâmicas exclusivas <span className="text-secondary font-bold">(400+ no total)</span></span>
                  </li>
                  <li className="flex items-start gap-4 text-white font-bold bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-2xl shrink-0 mt-0.5">🎁</span>
                    <span className="text-lg">100 Combinações de Golpes (+ de 30 páginas extras)</span>
                  </li>
                  <li className="flex items-start gap-4 text-white font-bold bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-2xl shrink-0 mt-0.5">🎁</span>
                    <span className="text-lg">Cronômetro de Treinos + Protocolos de combate</span>
                  </li>
                </ul>
                
                <a href={CHECKOUT_URL} className="block w-full text-center bg-secondary hover:bg-[#ebd06b] hover:scale-[1.02] active:scale-[0.98] text-secondary-foreground font-display text-3xl py-6 rounded-xl uppercase tracking-wide transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                  QUERO O PREMIUM
                </a>
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span className="flex items-center gap-2 text-gray-400 text-sm"><Lock size={14} className="text-green-400" /><span>Compra 100% segura via Pix ou cartão</span></span>
                  <span className="text-gray-500 text-xs">Garantia de 7 dias — risco zero</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. Como Você Recebe */}
      <section className="py-16 bg-card/60 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="bg-primary/10 p-5 rounded-2xl mb-8 border border-primary/20">
            <Mail className="text-primary" size={48} />
          </div>
          <h3 className="font-display text-4xl text-white mb-6">📩 Receba diretamente no seu e-mail</h3>
          <p className="text-muted-foreground text-xl mb-12 max-w-3xl leading-relaxed">
            Após a confirmação do pagamento você receberá acesso imediato aos materiais para download em formato PDF e área de membros.
          </p>
          <div className="flex flex-wrap gap-12 justify-center text-gray-400">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-background p-4 rounded-full border border-border"><Smartphone size={32} /></div>
              <span className="font-semibold uppercase tracking-wider text-sm">Celular</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-background p-4 rounded-full border border-border"><Monitor size={32} /></div>
              <span className="font-semibold uppercase tracking-wider text-sm">Computador</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-background p-4 rounded-full border border-border"><Tablet size={32} /></div>
              <span className="font-semibold uppercase tracking-wider text-sm">Tablet</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Depoimentos */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl md:text-6xl text-white mb-4">O que dizem sobre nós</h2>
              <p className="text-muted-foreground text-xl">Profissionais que já transformaram suas aulas</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                {/* Screenshot-style testimonial card */}
                <div className="h-full flex flex-col bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  {/* Fake app header bar */}
                  <div className="bg-[#111] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
                    <span className="ml-2 text-xs text-gray-600 tracking-wide">Avaliação verificada</span>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold font-display text-lg shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-bold leading-tight">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex text-secondary mb-4 gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed flex-1">"{t.text}"</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Garantia */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-background to-primary/10 border-y border-primary/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
          <div className="text-primary shrink-0 bg-primary/10 p-8 rounded-full border border-primary/20">
            <ShieldCheck size={80} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-display text-5xl text-white mb-6">🛡 Garantia de 7 Dias</h3>
            <p className="text-gray-300 text-xl leading-relaxed">
              Temos tanta confiança na qualidade do material que oferecemos 7 dias de garantia incondicional. 
              Se o material não atender às suas expectativas, você poderá solicitar o reembolso integral dentro do prazo previsto pela plataforma. Risco zero para você.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-5xl md:text-6xl text-center text-white mb-16">Perguntas Frequentes</h2>
          </FadeIn>
          <div className="bg-card/30 border border-border rounded-3xl p-6 md:p-10">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA + Footer */}
      <section className="py-32 px-4 border-t border-border relative overflow-hidden bg-black">
        {/* Client swap: Footer Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop" 
            alt="Boxer ring" 
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity grayscale"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="font-display text-6xl md:text-7xl text-white mb-12 drop-shadow-xl uppercase leading-[0.9]">
              Comece hoje mesmo <br/><span className="text-primary">a transformar seus treinos.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href={CHECKOUT_URL} className="flex-1 max-w-sm mx-auto sm:mx-0 flex items-center justify-center gap-3 bg-transparent border-2 border-primary hover:bg-primary text-white font-display text-2xl py-6 px-8 rounded-xl uppercase tracking-wider transition-all">
                <span className="text-3xl">🥊</span> Básico
              </a>
              <a href={CHECKOUT_URL} className="flex-1 max-w-sm mx-auto sm:mx-0 flex items-center justify-center gap-3 bg-secondary hover:bg-[#ebd06b] hover:scale-105 active:scale-95 text-secondary-foreground font-display text-2xl py-6 px-8 rounded-xl uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                <span className="text-3xl">🏆</span> Premium
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-[#050505] py-12 text-center border-t border-white/5 relative z-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl text-white/30 tracking-widest">BOXLAB</h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. 
            Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} BoxLab. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-gray-500 mt-4">
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-wider font-semibold">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-wider font-semibold">Termos de Uso</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
