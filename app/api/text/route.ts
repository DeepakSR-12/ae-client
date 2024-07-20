import { retrieveText } from "@/lib/gpt4o";
import { modelTypes } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, modelName } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!modelName) {
      return new NextResponse("Model Name is required", { status: 400 });
    }

    let text;
    if (modelName === modelTypes?.["gpt-4o"]) {
      text = await retrieveText(prompt);
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("[POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
