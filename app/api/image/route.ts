import { retrieveDalleImageUrl } from "@/lib/dalle";
import { retrieveProdiaImageUrl } from "@/lib/prodia";
import { dalleModels, prodiaModels } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt, modelName } = body;

  if (!prompt) {
    return new NextResponse("Prompt is required", { status: 400 });
  }

  if (!modelName) {
    return new NextResponse("Model Name is required", { status: 400 });
  }

  let imageUrl = "";
  if (dalleModels.includes(modelName)) {
    imageUrl = await retrieveDalleImageUrl(prompt, modelName);
  } else if (prodiaModels.includes(modelName)) {
    imageUrl = await retrieveProdiaImageUrl(prompt, modelName);
  } else {
    return new NextResponse("Model Name Error", { status: 400 });
  }

  return NextResponse.json({ imageUrl });
}
