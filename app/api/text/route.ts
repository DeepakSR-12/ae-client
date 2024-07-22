import { retrieveGeminiText } from "@/lib/gemini";
import { retrieveGptText } from "@/lib/gpt4o";
import { retrieveGroqText } from "@/lib/groq";
import { geminiModels, gptModels, grokModels } from "@/utils/constants";
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
    if (gptModels.includes(modelName)) {
      text = await retrieveGptText(prompt, modelName);
    } else if (geminiModels.includes(modelName)) {
      text = await retrieveGeminiText(prompt, modelName);
    } else if (grokModels.includes(modelName)) {
      text = await retrieveGroqText(prompt, modelName);
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("[POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
