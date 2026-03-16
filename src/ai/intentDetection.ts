const SHOW_INTENTS: Array<{ pattern: RegExp; tool: string }> = [
  { pattern: /mostrame.*(?:skill|tech|tecnolog|stack)|show.*(?:skill|tech|stack)|ver.*(?:skill|tech|stack)/i, tool: 'showSkills' },
  { pattern: /mostrame.*(?:experiencia|experience|trayectoria|historial)|show.*(?:experience|career)/i, tool: 'showExperience' },
  { pattern: /mostrame.*(?:contacto|contact)|datos de contacto|c[oó]mo.*contact[ao]|how.*contact|c[oó]mo.*contratar|how.*hire/i, tool: 'showContact' },
  { pattern: /está disponible|is he available|cuándo puede empezar|está buscando trabajo|open to opportunities/i, tool: 'showAvailability' },
];

const PROJECT_OVERRIDE = /(?:mostrame|show me|ver|muéstrame|muestrame|quiero ver|puedo ver|dejame ver|podés mostrarme|can you show|show me)\s+(?:el\s+)?(?:proyecto|project)?\s*(?:de\s+)?/i;
const PROJECT_BY_NAME  = /(?:uncuartodemilla|1\/4\s*mile|milla|omega|expresoomega|alfyvivi|alfy)/i;
const SKILLS_OVERRIDE   = /(?:mostrame|show me|ver).*(?:skill|tech|tecnolog|stack|conocimiento)/i;
const EXP_OVERRIDE      = /(?:mostrame|show me|ver).*(?:experiencia|experience|trayectoria|historial)/i;
const CONTACT_OVERRIDE  = /(?:mostrame|show me|ver).*(?:contacto|contact|linkedin)|c[oó]mo.*contact[ao]|how.*contact/i;
const AVAILABILITY_OVERRIDE = /(?:disponib|available|busca trabajo|buscando trabajo)/i;

const SEND_MESSAGE_PATTERN = /envi[aá](rle|le|r)?\s+un\s+mensaje|mandar(le)?\s+un\s+mensaje|escribir(le)?|send.*message|contact.*him|write.*to|quiero.*mensaje|mensaje.*a\s+edu/i;

const TEXT_ONLY_PATTERN = /impacto|impactos|m[eé]trica[s]?|\bkpi\b|logros|achievements|n[uú]meros\s+(de|del)|cuántos\s+proyectos|how\s+many\s+projects|n[uú]mero\s+de\s+proyectos/i;

const ALL_PROJECTS_PATTERN = /todos|all|ambos|both|los proyectos|the projects|show.*projects|projec.*all|ver todos|mostrame todos/i;

export function detectForcedTool(msg: string): string | null {
  if (TEXT_ONLY_PATTERN.test(msg)) return 'showImpact';
  if (SEND_MESSAGE_PATTERN.test(msg)) return null;
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
