import { useState } from "react";

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  return { sessions, setSessions };
};
