// ANALYTICS
export interface InteractionLog {
  ip:       string;
  question: string;
  lang:     string;
  date:     string;
}

// In-memory log (last 100 entries) — replace with a real DB for persistence
const interactionLogs: InteractionLog[] = [];

export async function logInteraction(data: InteractionLog) {
  interactionLogs.push(data);
  if (interactionLogs.length > 100) interactionLogs.shift();
  if (import.meta.env.DEV) {
    console.log('[EduBot Analytics]', JSON.stringify(data));
  }
}
