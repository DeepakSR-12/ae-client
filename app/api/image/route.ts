import { retrieveProdiaImageUrl } from "@/lib/prodia";
import { modelTypes } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt, modelName, modelType } = body;

  if (!prompt) {
    return new NextResponse("Prompt is required", { status: 400 });
  }

  if (!modelName) {
    return new NextResponse("Model Name is required", { status: 400 });
  }

  if (!modelType) {
    return new NextResponse("Model Type is required", { status: 400 });
  }

  let imageUrl = "";
  if (modelType === modelTypes.prodia) {
    imageUrl = await retrieveProdiaImageUrl(prompt, modelName);
  }

  return NextResponse.json(imageUrl);
}
