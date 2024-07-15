import { NextResponse } from "next/server";
import { retrieveAiData } from "../../../lib/ai-data";

export async function GET() {
  try {
    const aiData = await retrieveAiData();
    return NextResponse.json(aiData);
  } catch (error) {
    console.log("[AI_DATA_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
