import { addAiData } from "@/lib/models/AiData";
import { transformPayload } from "@/utils/constants";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const formData = await req.formData();

    const prompt = formData.get("prompt") as string;
    const promptType = formData.get("promptType") as string;
    const modelName1 = formData.get("modelName1") as string;
    const text1 = formData.get("text1") as string;
    const image1 = formData.get("image1") as File;
    const modelName2 = formData.get("modelName2") as string;
    const text2 = formData.get("text2") as string;
    const image2 = formData.get("image2") as File;
    const modelName3 = formData.get("modelName3") as string;
    const text3 = formData.get("text3") as string;
    const image3 = formData.get("image3") as File;
    const modelName4 = formData.get("modelName4") as string;
    const text4 = formData.get("text4") as string;
    const image4 = formData.get("image4") as File;

    const body: any = {
      prompt,
      promptType,
      modelName1,
      text1,
      image1,
      modelName2,
      text2,
      image2,
      modelName3,
      text3,
      image3,
      modelName4,
      text4,
      image4,
    };

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Form data is required", { status: 400 });
    }

    const payload = await transformPayload(body);

    await addAiData(payload);

    return new NextResponse("New AI Data is added", { status: 201 });
  } catch (error) {
    console.log("[SUBMIT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
