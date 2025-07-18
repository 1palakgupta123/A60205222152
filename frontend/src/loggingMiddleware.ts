
type LogEntry = { timestamp: string; event: string; details?: any };
const logs: LogEntry[] = [];
export function log(event: string, details?: any) {
  logs.push({ timestamp: new Date().toISOString(), event, details });
}
export function getLogs() { return logs; }
