import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const retrieveGptText = async (prompt: string, modelName: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: modelName,
    });

    return completion?.choices[0]?.message?.content;
  } catch (error) {
    console.error("[GPT4o_ERROR]", error);
    throw error;
  }
};
