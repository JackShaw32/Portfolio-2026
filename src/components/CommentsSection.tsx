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
  const translateCountRef = useRef({ count: 0, reset: Date.now() + 60_000 });
  const [page, setPage] = useState(0);

  const pageSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 3;
  const totalPages = Math.ceil(comments.length / pageSize);
  const visibleComments = comments.slice(page * pageSize, (page + 1) * pageSize);

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

  useEffect(() => {
    const handler = () => {
      fetch("/api/comments")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setComments(data);
          } else if (data.comments) {
            setComments(data.comments);
          }
        })
        .catch(() => {});
    };
    window.addEventListener("comment-submitted", handler);
    return () => window.removeEventListener("comment-submitted", handler);
  }, []);

  const translateComment = async (index: number, text: string) => {
    if (translationsMap[index]?.text) {
      setTranslationsMap(prev => { const next = { ...prev }; delete next[index]; return next; });
      return;
    }
    const now = Date.now();
    if (now > translateCountRef.current.reset) {
      translateCountRef.current = { count: 0, reset: now + 60_000 };
    }
    if (translateCountRef.current.count >= 10) {
      setTranslationsMap(prev => ({ ...prev, [index]: { text: lang === 'en' ? 'Wait a minute to translate again.' : 'Esperá un minuto para traducir de nuevo.', loading: false } }));
      return;
    }
    translateCountRef.current.count++;
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
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-foreground to-pink-500 max-w-2xl mx-auto font-medium text-sm sm:text-base md:text-lg text-center mt-3">
            {t.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="flex flex-col p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full animate-pulse" />
                    <div className="h-3 bg-muted rounded w-4/5 animate-pulse" />
                    <div className="h-3 bg-muted rounded w-3/5 animate-pulse" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-1.5">
                        <div className="h-3 bg-muted rounded w-20 animate-pulse" />
                        <div className="h-2.5 bg-muted rounded w-14 animate-pulse" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, j) => (
                        <div key={j} className="h-4 w-4 bg-muted rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground">{t.empty}</p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleComments.map((comment, i) => {
                const globalIndex = page * pageSize + i;
                return (
                  <div
                    key={globalIndex}
                    className="rounded-2xl bg-card border border-border overflow-hidden"
                  >
                    <div className="flex flex-col p-6 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {translationsMap[globalIndex]?.text || comment.message}
                      </p>

                      <button
                        onClick={() => translateComment(globalIndex, comment.message)}
                        disabled={translationsMap[globalIndex]?.loading}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
                      >
                        <Languages size={14} />
                        {translationsMap[globalIndex]?.loading
                          ? (lang === 'en' ? 'Translating...' : 'Traduciendo...')
                          : translationsMap[globalIndex]?.text
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
              );
            })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-muted/30 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ←
                </button>
                <span className="text-sm text-muted-foreground">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-muted/30 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
