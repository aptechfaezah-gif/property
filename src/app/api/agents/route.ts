import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Agent } from "@/models/Agent";
import { MOCK_AGENTS } from "@/lib/mock-data";
import { withLocalAgentAvatars } from "@/lib/agent-avatars";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ agents: MOCK_AGENTS });
    }

    const agents = await Agent.find().lean();
    const normalized = agents.map((a) => ({ ...a, _id: a._id.toString() }));
    const withAvatars =
      normalized.length > 0
        ? withLocalAgentAvatars(normalized)
        : MOCK_AGENTS;

    return NextResponse.json({ agents: withAvatars });
  } catch (error) {
    console.error("Agents GET error:", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}
