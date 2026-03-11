import { useState, useRef } from "react";
import { Send, Mail, Linkedin, Github, MapPin, CheckCircle, Lock } from "lucide-react";
import { useReveal } from "./hooks/useReveal";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLanguage();
  const t = translations[lang];
  const ct = t.contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(ct.errorText);
      }
    } catch {
      setError(ct.errorText);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "jackshaw@live.com.ar", href: "mailto:jackshaw@live.com.ar" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/raul-eduardo-cabral", href: "https://linkedin.com/in/raul-eduardo-cabral" },
    { icon: Github, label: "GitHub", value: "github.com/JackShaw32", href: "https://github.com/JackShaw32" },
    { icon: MapPin, label: ct.locationLabel, value: ct.locationValue, href: null },
  ];

  return (
    <section ref={ref} id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span>{ct.sectionTitle}</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6 reveal delay-150">
            <div className="glass rounded-3xl p-8 hover:border-foreground/20 transition-all duration-500">
              <h3 className="font-bold text-foreground mb-8 text-xl tracking-tight">{ct.findMe}</h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-foreground">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border-border/50 hover:border-foreground/20 transition-all duration-500">
              <div className="flex items-center gap-3 text-foreground text-sm font-medium mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                {ct.available}
              </div>
              <p className="text-muted-foreground text-sm font-light">
                {ct.availableText}
              </p>
            </div>
          </div>

          <div className="md:col-span-3 reveal delay-250">
            <div className="glass rounded-3xl p-8 hover:border-foreground/20 transition-all duration-500">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center reveal active">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{ct.successTitle}</h3>
                  <p className="text-muted-foreground font-light">
                    {ct.successTextLong}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-8 text-sm font-medium text-primary hover:text-foreground transition-colors"
                  >
                    {ct.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                        {ct.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={ct.namePlaceholder}
                        className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                        {ct.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={ct.emailPlaceholder}
                        className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                      {ct.messageLabel}
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={ct.messagePlaceholder}
                      rows={5}
                      className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <Lock className="w-3 h-3" />
                      <span>SSL secured</span>
                    </div>
                    {error && (
                      <p className="text-xs text-red-500 font-medium">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 font-medium px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 transition-all duration-300 group"
                    >
                      {isLoading ? ct.sendingBtn : ct.sendBtn}
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
