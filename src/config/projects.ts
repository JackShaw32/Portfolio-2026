export const projectsStaticData = [
  {
    slug: "uncuartodemilla",
    images: ["/projects/14milla.webp", "/projects/14milla-2.webp", "/projects/14milla-3.webp", "/projects/14milla-4.webp"],
    image: "/projects/14milla.webp",
    year: "2023",
    number: "01",
    tags: [
      "React", "Node.js", "Express", "MongoDB", "JavaScript",
      "CSS3", "Bootstrap", "JWT", "Cloudinary", "Framer Motion",
      "MercadoPago API", "Meta Pixel", "Meta Conversions API", "Netlify", "Render",
    ],
    link: "https://uncuartodemilla.com/",
    repo: "https://github.com/jackshaw32",
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
    accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    slug: "expresoomega",
    images: ["/projects/omega.webp", "/projects/omega-2.webp", "/projects/omega-3.webp"],
    image: "/projects/omega.webp",
    year: "2022",
    number: "02",
    tags: [
      "HTML5", "CSS3", "JavaScript", "Bootstrap",
      "SEO Optimization", "Web Hosting", "Responsive Design",
    ],
    link: "https://www.expresoomega.com/",
    repo: "https://github.com/jackshaw32",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
] as const;

export type ProjectSlug = typeof projectsStaticData[number]["slug"];
