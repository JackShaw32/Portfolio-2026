import { useState, useEffect } from "react";
import { X, Mail, Linkedin, Github, CheckCircle, Lock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLanguage();
  const t = translations[lang];
  const ct = t.contact;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = lang === "es" ? "El nombre es obligatorio" : "Name is required";
    if (!form.email.trim()) {
      newErrors.email = lang === "es" ? "El correo es obligatorio" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = lang === "es" ? "Correo inválido" : "Invalid email";
    }
    if (!form.message.trim()) newErrors.message = lang === "es" ? "El mensaje es obligatorio" : "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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

  const reset = () => {
    setSubmitted(false);
    setError("");
    setErrors({});
    setForm({ name: "", email: "", message: "" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="absolute -inset-[1px] rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute modal-border-conic animate-[border-spin_5s_linear_infinite]"
          />
        </div>

        <div className="relative bg-background rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">{ct.modalTitle}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-200"
              aria-label={ct.closeBtn}
            >
              <X className="w-4 h-4 text-foreground/70" />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">{ct.successTitle}</h3>
              <p className="text-muted-foreground text-sm font-light mb-8">
                {ct.successText}
              </p>
              <button
                onClick={reset}
                className="text-sm font-medium text-primary hover:text-foreground transition-colors"
              >
                {ct.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    {ct.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={form.name}

                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                    placeholder={ct.namePlaceholder}
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    {ct.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={form.email}

                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                    placeholder={ct.emailPlaceholder}
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  {ct.messageLabel}
                </label>
                <textarea
                  value={form.message}

                  onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
                  placeholder={ct.messagePlaceholder}
                  rows={4}
                  className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
              </div>

              <div className="flex items-center gap-3 pt-1">
                <a href="mailto:jackshaw@live.com.ar" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
                <span className="text-foreground/20">·</span>
                <a href="https://linkedin.com/in/raul-eduardo-cabral" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <span className="text-foreground/20">·</span>
                <a href="https://github.com/JackShaw32" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                  <Lock className="w-3 h-3" />
                  <span>SSL secured</span>
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn bg-foreground text-background hover:opacity-85 disabled:opacity-60 font-medium px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  {isLoading ? ct.sendingBtn : ct.sendBtn}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
