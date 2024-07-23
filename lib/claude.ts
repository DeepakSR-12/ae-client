import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export const retrieveClaudeModelsText = async (
  prompt: string,
  modelName: string
) => {
  try {
    const chatCompletion = await anthropic.completions.create({
      model: modelName,
      max_tokens_to_sample: 1024,
      prompt: `${Anthropic.HUMAN_PROMPT} ${prompt}${Anthropic.AI_PROMPT}`,
    });
    return chatCompletion.completion || "";
  } catch (error) {
    console.error("[CLAUDE_ERROR]", error);
    throw error;
  }
};
