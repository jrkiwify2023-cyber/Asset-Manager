import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Dumbbell, 
  Mail, 
  Monitor, 
  Smartphone, 
  Star, 
  Tablet, 
  ShieldCheck, 
  Play, 
  Gift
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
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        setTimeLeft(15 * 60);
      }
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.setItem("boxlab_timer", (15 * 60).toString());
          localStorage.setItem("boxlab_timestamp", Date.now().toString());
          return 15 * 60;
        }
        localStorage.setItem("boxlab_timer", (prev - 1).toString());
        localStorage.setItem("boxlab_timestamp", Date.now().toString());
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="font-display font-bold text-5xl md:text-7xl tracking-tighter text-white tabular-nums">
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* 1. Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
          <div className="font-display text-3xl font-extrabold tracking-tight flex items-center gap-1">
            <span className="text-white">BOX</span>
            <span className="text-primary">LAB</span>
          </div>
          <button 
            onClick={() => scrollToSection("planos")}
            className="bg-primary hover:bg-primary/90 text-white font-display font-semibold px-6 py-2.5 rounded-sm transition-colors text-sm uppercase tracking-wide"
          >
            Comprar Agora
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          {heroBg ? (
            <img src={heroBg} alt="Boxing Training" className="w-full h-full object-cover object-center opacity-60" />
          ) : (
            <div className="w-full h-full bg-zinc-900"></div>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-20 max-w-6xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-6 uppercase">
              Material Exclusivo
            </motion.div>
            <motion.h1 
              variants={fadeIn}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[1.05] tracking-tight mb-6"
            >
              150 Dinâmicas<br />
              <span className="text-primary">Para Aulas de Boxe</span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-medium"
            >
              Transforme seus treinos com uma biblioteca completa de dinâmicas prontas para professores, academias e pessoas que desejam aprender Boxe em casa.
            </motion.p>
            <motion.div variants={fadeIn}>
              <button 
                onClick={() => scrollToSection("planos")}
                className="bg-primary hover:bg-primary/90 text-white font-display text-xl font-bold px-10 py-5 rounded-sm transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider w-full md:w-auto shadow-[0_0_40px_rgba(225,6,0,0.3)]"
              >
                Quero Meu Acesso Agora
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Benefits Section */}
      <section className="py-24 bg-card relative border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">Por Que <span className="text-primary">BoxLab?</span></h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="bg-background border border-border p-8 rounded-lg flex items-start gap-4 hover:border-primary/50 transition-colors group"
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <p className="font-semibold text-lg leading-tight pt-1">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. "Para Quem É" Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:w-1/3"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
                Para Quem É O <span className="text-primary border-b-4 border-primary pb-1">BoxLab?</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg">
                Desenvolvido para atender desde o profissional que busca otimizar seu tempo até o praticante apaixonado pelo esporte.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
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
                  className="bg-card border border-border p-5 rounded flex items-center gap-4"
                >
                  <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                  <span className="font-semibold text-lg">{audience}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. "O Que Você Recebe" Section */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">O Que Você <span className="text-primary">Recebe</span></h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </motion.div>

          <div className="relative">
            {/* Center Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center justify-center w-48 h-48 rounded-full bg-background border-4 border-primary shadow-[0_0_50px_rgba(225,6,0,0.4)]">
              <span className="font-display font-bold text-5xl text-primary leading-none">150</span>
              <span className="font-display font-bold text-sm uppercase tracking-widest text-center mt-1">Dinâmicas<br/>de Boxe</span>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {[
                { title: "Preparação e Desenvolvimento", desc: "Aquecimentos específicos, rotinas de mobilidade e exercícios de condicionamento para preparar o corpo." },
                { title: "Técnica e Combate", desc: "Fundamentos, combinações de golpes, técnicas de defesa avançada, drills de sparring e simulação de combate." },
                { title: "Performance e Aulas", desc: "Treinos funcionais para lutadores, circuitos de alta intensidade e estruturas de planos de aula completos." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  className="bg-card p-8 rounded-lg border border-border hover:border-primary/40 transition-all flex flex-col h-full relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <Play className="text-primary w-10 h-10 mb-6" />
                  <h3 className="font-display text-2xl font-bold uppercase mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Badge */}
          <div className="mt-12 flex lg:hidden justify-center">
            <div className="flex flex-col items-center justify-center w-48 h-48 rounded-full bg-background border-4 border-primary shadow-[0_0_30px_rgba(225,6,0,0.3)]">
              <span className="font-display font-bold text-5xl text-primary leading-none">150</span>
              <span className="font-display font-bold text-sm uppercase tracking-widest text-center mt-1">Dinâmicas<br/>de Boxe</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Urgency Section */}
      <section id="oferta" className="py-16 bg-primary/10 border-y border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block bg-primary text-white font-display font-bold uppercase tracking-widest px-4 py-1.5 rounded text-sm mb-8 animate-pulse">
            🔥 Oferta Especial Por Tempo Limitado
          </div>
          
          <CountdownTimer />
          
          <p className="mt-6 text-muted-foreground font-medium">
            Após o término da oferta os valores poderão ser alterados sem aviso prévio.
          </p>
        </div>
      </section>

      {/* 7. Pricing Plans Section */}
      <section id="planos" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">Escolha Seu <span className="text-primary">Plano</span></h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Básico Plan */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border p-8 md:p-10 rounded-xl relative"
            >
              <h3 className="font-display text-3xl font-bold uppercase mb-2">Plano Básico</h3>
              <p className="text-muted-foreground mb-6">O essencial para transformar suas aulas.</p>
              
              <div className="mb-8">
                <span className="text-sm font-bold text-muted-foreground">Por apenas</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl">R$</span>
                  <span className="font-display text-6xl font-bold">12,90</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  "Preparação e Desenvolvimento",
                  "Técnica e Combate",
                  "Performance e Aulas",
                  "150 Dinâmicas de Boxe"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href={CHECKOUT_URL}
                className="block text-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-display font-bold text-lg uppercase tracking-wider py-4 rounded transition-all"
              >
                Quero o Plano Básico
              </a>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border-2 border-accent p-8 md:p-12 rounded-xl relative shadow-[0_0_40px_rgba(212,175,55,0.15)] md:scale-105 z-10"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground font-display font-bold uppercase tracking-widest text-sm px-6 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                ⭐ Mais Escolhido
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-3xl font-bold uppercase text-accent">Plano Premium</h3>
                <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded uppercase">Melhor Custo-Benefício</span>
              </div>
              
              <p className="text-muted-foreground mb-6">A experiência completa com bônus exclusivos.</p>
              
              <div className="mb-8">
                <span className="text-sm font-bold text-muted-foreground">Por apenas</span>
                <div className="flex items-baseline gap-2 text-accent">
                  <span className="font-display text-2xl">R$</span>
                  <span className="font-display text-7xl font-bold">22,90</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Tudo do Plano Básico</span>
                </div>
                <div className="h-px bg-border my-4"></div>
                <div className="flex items-center gap-3 font-semibold text-accent">
                  <Gift className="w-5 h-5 flex-shrink-0" />
                  <span>100 Combinações de Golpes (Bônus)</span>
                </div>
                <div className="flex items-center gap-3 font-semibold text-accent">
                  <Gift className="w-5 h-5 flex-shrink-0" />
                  <span>Cronômetro de Treinos + Protocolos (Bônus)</span>
                </div>
              </div>

              <a 
                href={CHECKOUT_URL_PREMIUM}
                className="block text-center bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold text-xl uppercase tracking-wider py-5 rounded transition-all transform hover:scale-105 shadow-lg"
              >
                Quero o Premium
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. Delivery Section */}
      <section className="bg-card py-16 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 flex gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-full text-primary flex-shrink-0">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Como Você Recebe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-white">Receba diretamente no seu e-mail</strong> — Após a confirmação do pagamento você receberá acesso imediato aos materiais para download.
                </p>
              </div>
            </div>
            <div className="flex gap-8 text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <Smartphone className="w-8 h-8" />
                <span className="text-sm font-semibold uppercase tracking-wider">Celular</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Monitor className="w-8 h-8" />
                <span className="text-sm font-semibold uppercase tracking-wider">Computador</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Tablet className="w-8 h-8" />
                <span className="text-sm font-semibold uppercase tracking-wider">Tablet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">O Que Dizem <span className="text-primary">Nossos Alunos</span></h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { text: "Material excelente! Minhas aulas ficaram muito mais dinâmicas e criativas.", author: "Carlos M.", role: "Professor de Boxe" },
              { text: "Valeu cada centavo. O premium ainda vem com bônus incríveis!", author: "Fernanda R.", role: "Personal Trainer" },
              { text: "Treino em casa e adorei. Conteúdo para todos os níveis!", author: "Juliana P.", role: "Aluna" },
              { text: "Conteúdo muito organizado e fácil de aplicar nas aulas.", author: "Rodrigo S.", role: "Professor" },
              { text: "Meus alunos adoraram as novas dinâmicas. Recomendo!", author: "Tiago L.", role: "Dono de Academia" },
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="bg-card border border-border p-6 rounded-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="italic text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold font-display uppercase tracking-wide">{testimonial.author}</p>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. Guarantee Section */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center p-6 bg-card rounded-full mb-8 border border-border shadow-xl">
            <ShieldCheck className="w-16 h-16 text-primary" />
          </div>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-6">Garantia Incondicional</h2>
          <p className="text-xl leading-relaxed mb-4">
            <strong className="text-white">Garantia de 7 Dias</strong> — Se o material não atender às suas expectativas, você poderá solicitar o reembolso integral dentro do prazo previsto pela plataforma.
          </p>
          <p className="text-primary font-bold text-lg uppercase tracking-widest">
            Compre com total segurança e confiança.
          </p>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">Perguntas <span className="text-primary">Frequentes</span></h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "O acesso é imediato?", a: "Sim! Após a confirmação do pagamento você receberá o acesso imediatamente no seu e-mail." },
              { q: "Posso acessar pelo celular?", a: "Sim! O material é acessível em qualquer dispositivo: celular, computador ou tablet." },
              { q: "Serve para iniciantes?", a: "Com certeza! O conteúdo é desenvolvido para todos os níveis, do iniciante ao avançado." },
              { q: "Recebo por e-mail?", a: "Sim! Todo o material é enviado diretamente para o e-mail cadastrado no momento da compra." },
              { q: "Os bônus fazem parte de qual plano?", a: "Os bônus (100 Combinações de Golpes e Cronômetro de Treinos) são exclusivos do Plano Premium." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="font-display text-xl font-bold uppercase tracking-wide py-6 hover:no-underline hover:text-primary transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 12. Final CTA Section */}
      <section className="py-24 bg-card border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tight leading-tight mb-12">
            Comece Hoje Mesmo A Transformar Seus <span className="text-primary">Treinos De Boxe.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href={CHECKOUT_URL}
              className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-display font-bold text-xl px-8 py-5 rounded transition-all uppercase tracking-wider flex items-center justify-center gap-3"
            >
              <span>🥊</span> Quero o Plano Básico
            </a>
            <a 
              href={CHECKOUT_URL_PREMIUM}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold text-xl px-8 py-5 rounded transition-all transform hover:scale-105 uppercase tracking-wider shadow-lg flex items-center justify-center gap-3"
            >
              <span>🏆</span> Quero o Premium
            </a>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-background py-10 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-2xl font-bold tracking-tight">
            BOX<span className="text-primary">LAB</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 BOXLAB. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
