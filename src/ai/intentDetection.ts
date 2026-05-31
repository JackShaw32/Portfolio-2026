const SHOW_INTENTS: Array<{ pattern: RegExp; tool: string }> = [
  { pattern: /mostrame.*(?:skill|tech|tecnolog|stack)|show.*(?:skill|tech|stack)|ver.*(?:skill|tech|stack)/i, tool: 'showSkills' },
  { pattern: /mostrame.*(?:experiencia|experience|trayectoria|historial)|show.*(?:experience|career)/i, tool: 'showExperience' },
  { pattern: /mostrame.*(?:contacto|contact)|datos de contacto|c[oó]mo.*contact[ao]|how.*contact|c[oó]mo.*contratar|how.*hire/i, tool: 'showContact' },
  { pattern: /está disponible|is he available|cuándo puede empezar|está buscando trabajo|open to opportunities/i, tool: 'showAvailability' },
  { pattern: /(?:perfil|profile|quien\s*eres|qui[eé]n\s*es\s*[eé]l|contame\s+sobre\s+vos|about\s*(?:you|him|eduardo)|qu[eé]\s*sab[eé](?:s|)\s*hacer|what\s*(?:can|does)\s*(?:he|eduardo)\s*do|tell\s*me\s*about\s*(?:yourself|him|eduardo))/i, tool: 'showProfile' },
  { pattern: /(?:d[oó]nde\s*(?:estudia|estudi[oó]|curs[oó])|educaci[oó]n|formaci[oó]n|studies|education|background|training|carrera|certificaciones|certifications)/i, tool: 'showExperience' },
  { pattern: /(?:d[oó]nde\s*(?:vive|viv[eé]s|est[aá]|trabaja|queda)|locaci[oó]n|ubicaci[oó]n|location|based|radica|reside|zona)/i, tool: 'showContact' },
  { pattern: /(?:por\s*qu[eé]\s*contratar|why\s*(?:should\s*I\s*)?hire|recomi[eé]ndame|recomendaci[oó]n|would\s*(?:you\s*)?recommend|es\s*bueno\s*para|is\s*(?:he|eduardo)\s*a\s*good\s*fit|qu[eé]\s*opinas|what\s*do\s*you\s*think|lo\s*recomiendas|recomiendo|hiring|contratarlo)/i, tool: 'showRecommendation' },
  { pattern: /(?:arquitectur|architectur|diagrama|diagram|flujo|flow\s*(?:de|of|del)|c[oó]mo\s*(?:est[aá]|estructur)|how\s*(?:is|does)\s*(?:it|the)\s*(?:structured|connected|built)|stack\s*diagram|componentes\s*del\s*sistema|system\s*architecture)/i, tool: 'showArchitecture' },
  { pattern: /(?:impacto|impact|m[eé]trica|metrics?|logros|achievements|resultados|results|lighthouse)/i, tool: 'showImpact' },
  { pattern: /(?:comentar|comment|dejar.*comentario|leave.*comment|review|rese[ñn]a|testimonio|testimonial|valorar|rate|opini[oó]n|feedback)/i, tool: 'showCommentForm' },
];

const PROJECT_OVERRIDE = /(?:mostrame|show me|ver|muéstrame|muestrame|quiero ver|puedo ver|dejame ver|podés mostrarme|can you show|show me|dame)\s+(?:el\s+)?(?:proyecto|project)?\s*(?:de\s+)?/i;
const PROJECT_BY_NAME  = /(?:uncuartodemilla|1\/4\s*mile|milla|omega|expresoomega)/i;
const SKILLS_OVERRIDE   = /(?:mostrame|show me|ver|qu[eé]\s*tecnolog[ií]as|what\s*tech|tecnolog[ií]as\s*que\s*usa|lenguajes\s*que\s*domina).*(?:skill|tech|tecnolog|stack|conocimiento|lenguaje|lenguajes|herramientas|tools)/i;
const EXP_OVERRIDE      = /(?:mostrame|show me|ver).*(?:experiencia|experience|trayectoria|historial)/i;
const CONTACT_OVERRIDE  = /(?:mostrame|show me|ver).*(?:contacto|contact|linkedin)|c[oó]mo.*contact[ao]|how.*contact/i;
const AVAILABILITY_OVERRIDE = /(?:disponib|available|busca trabajo|buscando trabajo|contratar|hire|empleo|job|vacante|oportunidad)/i;

const RECOMMENDATION_OVERRIDE = /(?:recomi[eé]ndame|recomendaci[oó]n|lo\s*recomiendas|recomiendo|would\s*(?:you\s*)?recommend|es\s*bueno\s*para|is\s*(?:he|eduardo)\s*a\s*good\s*fit|qu[eé]\s*opinas\s*(?:de|sobre)|what\s*do\s*you\s*think\s*(?:about|of)|why\s*(?:should\s*(?:i|we|you)\s*)?hire|por\s*qu[eé]\s*(?:lo\s*)?(?:contratar[ií]a|contratarías|contratar))/i;

const SEND_MESSAGE_PATTERN = /envi[aá](rle|le|r)?\s+un\s+mensaje|mandar(le)?\s+un\s+mensaje|escribir(le)?|send.*message|contact.*him|write.*to|quiero.*mensaje|mensaje.*a\s+edu|dejar(le)?\s+un\s+(mensaje|recado)/i;

const TEXT_ONLY_PATTERN = /impacto|impactos|m[eé]trica[s]?|\bkpi\b|logros|achievements|n[uú]meros\s+(de|del)|cuántos\s+proyectos|how\s+many\s+projects|n[uú]mero\s+de\s+proyectos|resultados|results|lighthouse|scores|impact\s+metrics|metrics\b/i;

const ALL_PROJECTS_PATTERN = /todos|all|ambos|both|los proyectos|the projects|show.*projects|projec.*all|ver todos|mostrame todos|tus proyectos|your projects|qu[eé]\s*proyectos/i;

export function detectForcedTool(msg: string): string | null {
  if (TEXT_ONLY_PATTERN.test(msg)) return 'showImpact';
  if (SEND_MESSAGE_PATTERN.test(msg)) return null;
  if (RECOMMENDATION_OVERRIDE.test(msg)) return 'showRecommendation';
  if (SKILLS_OVERRIDE.test(msg))       return 'showSkills';
  if (EXP_OVERRIDE.test(msg))          return 'showExperience';
  if (CONTACT_OVERRIDE.test(msg))      return 'showContact';
  if (AVAILABILITY_OVERRIDE.test(msg)) return 'showAvailability';
  if (
    PROJECT_OVERRIDE.test(msg) ||
    (PROJECT_BY_NAME.test(msg) && /mostrame|show|ver|muéstrame|quiero|puedo|dejame/i.test(msg))
  ) {
    return 'showProject';
  }
  for (const { pattern, tool } of SHOW_INTENTS) {
    if (pattern.test(msg)) return tool;
  }
  return null;
}

export function wantsAllProjects(msg: string): boolean {
  return ALL_PROJECTS_PATTERN.test(msg);
}

export function isSendMessageIntent(msg: string): boolean {
  return SEND_MESSAGE_PATTERN.test(msg);
}

export function isTextOnlyIntent(msg: string): boolean {
  return TEXT_ONLY_PATTERN.test(msg);
}
