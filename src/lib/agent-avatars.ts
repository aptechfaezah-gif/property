import { MOCK_AGENTS } from "./mock-data";
import type { Agent } from "@/types";

export const HOUSE_AGENT_AVATARS = [
  "/clients/client1.png",
  "/clients/client2.png",
  "/clients/client3.png",
] as const;

/** Always use local HOUSE agent photos (DB may still have old Unsplash URLs). */
export function withLocalAgentAvatars<T extends Partial<Agent>>(
  agents: T[],
): (T & { avatar: string })[] {
  return agents.map((agent, index) => {
    const mock =
      MOCK_AGENTS.find((m) => m._id === agent._id) ??
      MOCK_AGENTS.find((m) => m.name === agent.name) ??
      MOCK_AGENTS[index];

    const avatar =
      mock?.avatar ??
      (agent.avatar?.startsWith("/clients/") ? agent.avatar : null) ??
      HOUSE_AGENT_AVATARS[index % HOUSE_AGENT_AVATARS.length];

    return { ...agent, avatar };
  });
}
