import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const retrieveDalleImageUrl = async (
  prompt: string,
  modelName: string
) => {
  try {
    const response = await openai.images.generate({
      model: modelName,
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const imageUrl = response?.data?.[0].b64_json;

    return imageUrl ?? "";
  } catch (error) {
    console.error("[DALLE_ERROR]", error);
    throw error;
  }
};
