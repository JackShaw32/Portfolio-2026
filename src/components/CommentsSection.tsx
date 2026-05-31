import { useState, useEffect, useRef } from "react";
import { Star, BadgeCheck, Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

interface Comment {
  name: string;
  stars: number;
  message: string;
  date: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-red-500",
  "bg-amber-500",
];

export default function CommentsSection() {
  const ref = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].comments;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [translationsMap, setTranslationsMap] = useState<Record<number, { text: string; loading: boolean }>>({});

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        } else if (data.comments) {
          setComments(data.comments);
        }
      })
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, []);

  const translateComment = async (index: number, text: string) => {
    if (translationsMap[index]?.text) {
      setTranslationsMap(prev => { const next = { ...prev }; delete next[index]; return next; });
      return;
    }
    setTranslationsMap(prev => ({ ...prev, [index]: { text: '', loading: true } }));
    try {
      const targetLang = lang === 'en' ? 'es' : 'en';
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=${targetLang === 'es' ? 'en|es' : 'es|en'}`);
      const data = await res.json();
      setTranslationsMap(prev => ({ ...prev, [index]: { text: data.responseData?.translatedText || text, loading: false } }));
    } catch {
      setTranslationsMap(prev => ({ ...prev, [index]: { text, loading: false } }));
    }
  };

  return (
    <section ref={ref} id="comments" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
            {t.title}{" "}
            <span className="text-primary">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg text-center mt-3">
            {t.subtitle}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">{t.loading}</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground">{t.empty}</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comments.map((comment, i) => (
              <div
                key={i}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                <div className="flex flex-col p-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {translationsMap[i]?.text || comment.message}
                  </p>

                  <button
                    onClick={() => translateComment(i, comment.message)}
                    disabled={translationsMap[i]?.loading}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
                  >
                    <Languages size={14} />
                    {translationsMap[i]?.loading
                      ? (lang === 'en' ? 'Translating...' : 'Traduciendo...')
                      : translationsMap[i]?.text
                        ? (lang === 'en' ? 'Show original' : 'Ver original')
                        : (lang === 'en' ? 'Translate' : 'Traducir')
                    }
                  </button>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-semibold ${avatarColors[i % avatarColors.length]}`}
                      >
                        {getInitials(comment.name)}
                      </span>
                      <div>
                        <p className="font-semibold text-sm">{comment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.date).toLocaleDateString(
                            lang === "en" ? "en-US" : "es-AR",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star
                          key={j}
                          size={16}
                          className={
                            j < comment.stars
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <BadgeCheck size={16} />
                    {t.verified}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
