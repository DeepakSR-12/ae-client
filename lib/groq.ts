import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export const retrieveGroqText = async (prompt: string, modelName: string) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: modelName,
    });
    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("[GROQ_ERROR]", error);
    throw error;
  }
};
