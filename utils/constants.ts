import { uploadImageToFirebase } from "@/lib/firebase";

export const transformPayload = async (body: any) => {
  const {
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
  } = body;

  const uploadTasks = [
    image1
      ? uploadImageToFirebase(image1).catch((e) => {
          console.error(e);
          return undefined;
        })
      : Promise.resolve(undefined),
    image2
      ? uploadImageToFirebase(image2).catch((e) => {
          console.error(e);
          return undefined;
        })
      : Promise.resolve(undefined),
    image3
      ? uploadImageToFirebase(image3).catch((e) => {
          console.error(e);
          return undefined;
        })
      : Promise.resolve(undefined),
    image4
      ? uploadImageToFirebase(image4).catch((e) => {
          console.error(e);
          return undefined;
        })
      : Promise.resolve(undefined),
  ];

  const imageUrls = await Promise.all(uploadTasks);

  const items = [
    { model: modelName1, text: text1, image: imageUrls[0] },
    { model: modelName2, text: text2, image: imageUrls[1] },
    { model: modelName3, text: text3, image: imageUrls[2] },
    { model: modelName4, text: text4, image: imageUrls[3] },
  ]
    .map((item) => {
      if (item.text) {
        return { model: item.model, text: item.text };
      } else if (item.image) {
        return { model: item.model, src: item.image };
      }
      return null;
    })
    .filter((item) => item !== null);

  return {
    prompt,
    promptType,
    items,
  };
};

export const prodiaModels = [];

export const modelTypes: Record<string, string> = {
  "gpt-4o": "GPT-4o",
  claude: "Claude 3.5 Sonnet",
  llama: "llama",
  gemini: "gemini",
  prodia: "prodia",
  dalle: "dall-e-3",
  midjourney: "midjourney",
};

export const textModels = [
  { value: "gpt-4o", label: "GPT-4o" },
  // { value: "claude", label: "Claude 3.5 Sonnet" },
];

export const cardBackgroundColors = ["#F3EDFF", "#FAFFDE", "#FFF0E8", "#FFF"];

export const promptTypeOptions = [
  { value: "text", label: "Text" },
  // { value: "image", label: "Image" },
];
