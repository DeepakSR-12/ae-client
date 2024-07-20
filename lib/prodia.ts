import { createProdia } from "prodia";

const prodia = createProdia({
  apiKey: process.env.PRODIA_API_KEY!,
});

export const retrieveProdiaImageUrl = async (
  prompt: string,
  modelName: string
) => {
  try {
    const job = await prodia.generate({
      prompt,
      model: modelName,
    });

    const { imageUrl, status } = await prodia.wait(job);

    if (status === "failed") {
      throw "Failed to generate image";
    }

    return imageUrl;
  } catch (error) {
    console.error("[PRODIA_ERROR]", error);
    throw error;
  }
};
