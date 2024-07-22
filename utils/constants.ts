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

export const modelTypes: Record<string, string> = {
  "llama3-8b-8192": "Llama 3 8B 8192",
  "llama3-70b-8192": "Llama 3 70B 8192",
  "mixtral-8x7b-32768": "Mixtral 8x7B 32768",
  "gemma-7b-it": "Gemma 7B IT",
  "gemma2-9b-it": "Gemma 2 9B IT",
  "gemini-1.5-pro": "Gemini 1.5 Pro",
  "gemini-1.5-flash": "Gemini 1.5 Flash",
  "gemini-1.0-pro": "Gemini 1.0 Pro",
  "gpt-4o": "GPT-4o",
  "gpt-4o-mini": "GPT-4o Mini",
  "dall-e-3": "Dall·E V3",
  "dall-e-2": "Dall·E V2",
  "3Guofeng3_v34.safetensors [50f420de]": "3 Guofeng3 V3.4",
  "absolutereality_V16.safetensors [37db0fc3]": "Absolute Reality V1.6",
  "absolutereality_v181.safetensors [3d9d4d2b]": "Absolute Reality V1.8.1",
  "amIReal_V41.safetensors [0a8a2e61]": "Am I Real V4.1",
  "analog-diffusion-1.0.ckpt [9ca13f02]": "Analog V1",
  "aniverse_v30.safetensors [579e6f85]": "Aniverse V3",
  "anythingv3_0-pruned.ckpt [2700c435]": "Anything V3",
  "anything-v4.5-pruned.ckpt [65745d25]": "Anything V4.5",
  "anythingV5_PrtRE.safetensors [893e49b9]": "Anything V5",
  "AOM3A3_orangemixs.safetensors [9600da17]": "AbyssOrangeMix V3",
  "blazing_drive_v10g.safetensors [ca1c1eab]": "Blazing Drive V10g",
  "breakdomain_I2428.safetensors [43cc7d2f]": "BreakDomain I2428",
  "breakdomain_M2150.safetensors [15f7afca]": "BreakDomain M2150",
  "cetusMix_Version35.safetensors [de2f2560]": "CetusMix Version35",
  "childrensStories_v13D.safetensors [9dfaabcb]": "Children's Stories V1 3D",
  "childrensStories_v1SemiReal.safetensors [a1c56dbb]":
    "Children's Stories V1 SemiReal",
  "childrensStories_v1ToonAnime.safetensors [2ec7b88b]":
    "Children's Stories V1 Toon-Anime",
  "Counterfeit_v30.safetensors [9e2a8f19]": "Counterfeit V3.0",
  "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]":
    "CuteYukimix MidChapter3",
  "cyberrealistic_v33.safetensors [82b0d085]": "CyberRealistic V3.3",
  "dalcefo_v4.safetensors [425952fe]": "Dalcefo V4",
  "deliberate_v2.safetensors [10ec4b29]": "Deliberate V2",
  "deliberate_v3.safetensors [afd9d2d4]": "Deliberate V3",
  "dreamlike-anime-1.0.safetensors [4520e090]": "Dreamlike Anime V1",
  "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]": "Dreamlike Diffusion V1",
  "dreamlike-photoreal-2.0.safetensors [fdcf65e7]": "Dreamlike Photoreal V2",
  "dreamshaper_6BakedVae.safetensors [114c8abb]": "Dreamshaper 6 baked vae",
  "dreamshaper_7.safetensors [5cf5ae06]": "Dreamshaper 7",
  "dreamshaper_8.safetensors [9d40847d]": "Dreamshaper 8",
  "edgeOfRealism_eorV20.safetensors [3ed5de15]": "Edge of Realism EOR V2.0",
  "EimisAnimeDiffusion_V1.ckpt [4f828a15]": "Eimis Anime Diffusion V1.0",
  "elldreths-vivid-mix.safetensors [342d9d26]": "Elldreth's Vivid",
  "epicphotogasm_xPlusPlus.safetensors [1a8f6d35]": "epiCPhotoGasm X Plus Plus",
  "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]":
    "EpiCRealism Natural Sin RC1",
  "epicrealism_pureEvolutionV3.safetensors [42c8440c]":
    "EpiCRealism Pure Evolution V3",
  "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]":
    "I Cant Believe Its Not Photography Seco",
  "indigoFurryMix_v75Hybrid.safetensors [91208cbb]":
    "Indigo Furry Mix V7.5 Hybrid",
  "juggernaut_aftermath.safetensors [5e20c455]": "Juggernaut Aftermath",
  "lofi_v4.safetensors [ccc204d6]": "Lofi V4",
  "lyriel_v16.safetensors [68fceea2]": "Lyriel V1.6",
  "majicmixRealistic_v4.safetensors [29d0de58]": "MajicMix Realistic V4",
  "mechamix_v10.safetensors [ee685731]": "MechaMix V1.0",
  "meinamix_meinaV9.safetensors [2ec66ab0]": "MeinaMix Meina V9",
  "meinamix_meinaV11.safetensors [b56ce717]": "MeinaMix Meina V11",
  "neverendingDream_v122.safetensors [f964ceeb]": "Neverending Dream V1.22",
  "openjourney_V4.ckpt [ca2f377f]": "Openjourney V4",
  "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]": "Pastel-Mix",
  "portraitplus_V1.0.safetensors [1400e684]": "Portrait+ V1",
  "protogenx34.safetensors [5896f8d5]": "Protogen x3.4",
  "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]":
    "Realistic Vision V1.4",
  "Realistic_Vision_V2.0.safetensors [79587710]": "Realistic Vision V2.0",
  "Realistic_Vision_V4.0.safetensors [29a7afaa]": "Realistic Vision V4.0",
  "Realistic_Vision_V5.0.safetensors [614d1063]": "Realistic Vision V5.0",
  "Realistic_Vision_V5.1.safetensors [a0f13c83]": "Realistic Vision V5.1",
  "redshift_diffusion-V10.safetensors [1400e684]": "Redshift Diffusion V1.0",
  "revAnimated_v122.safetensors [3f4fefd9]": "ReV Animated V1.2.2",
  "rundiffusionFX25D_v10.safetensors [cd12b0ee]": "RunDiffusion FX 2.5D V1.0",
  "rundiffusionFX_v10.safetensors [cd4e694d]":
    "RunDiffusion FX Photorealistic V1.0",
  "sdv1_4.ckpt [7460a6fa]": "SD V1.4",
  "v1-5-pruned-emaonly.safetensors [d7049739]": "SD V1.5",
  "v1-5-inpainting.safetensors [21c7ab71]": "SD V1.5 Inpainting",
  "shoninsBeautiful_v10.safetensors [25d8c546]":
    "Shonin's Beautiful People V1.0",
  "theallys-mix-ii-churned.safetensors [5d9225a4]": "TheAlly's Mix II",
  "timeless-1.0.ckpt [7c4971d4]": "Timeless V1",
  "toonyou_beta6.safetensors [980f6b15]": "ToonYou Beta 6",
  // "animagineXLV3_v30.safetensors [75f2f05b]": "Animagine XL V3",
  // "devlishphotorealism_sdxl15.safetensors [77cba69f]":
  //   "Devlish Photorealism SDXL 1.5",
  // "dreamshaperXL10_alpha2.safetensors [c8afe2ef]": "Dreamshaper XL 10 Alpha 2",
  // "dynavisionXL_0411.safetensors [c39cc051]": "Dynavision XL 0411",
  // "juggernautXL_v45.safetensors [e75f5471]": "Juggernaut XL V4.5",
  // "realismEngineSDXL_v10.safetensors [af771c3f]": "Realism Engine SDXL V1.0",
  // "realvisxlV40.safetensors [f7fdcb51]": "Realvis XL V4.0",
  // "sd_xl_base_1.0.safetensors [be9edd61]": "SD XL Base 1.0",
  // "sd_xl_base_1.0_inpainting_0.1.safetensors [5679a81a]":
  //   "SD XL Base 1.0 Inpainting 0.1",
  // "turbovisionXL_v431.safetensors [78890989]": "Turbovision XL V4.31",
};

export const gptModels = ["gpt-4o", "gpt-4o-mini"];
export const geminiModels = [
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.0-pro",
];

export const grokModels = [
  "llama3-8b-8192",
  "llama3-70b-8192",
  "mixtral-8x7b-32768",
  "gemma-7b-it",
  "gemma2-9b-it",
];

export const dalleModels = ["dall-e-3", "dall-e-2"];

export const prodiaModels = [
  "3Guofeng3_v34.safetensors [50f420de]",
  "absolutereality_V16.safetensors [37db0fc3]",
  "absolutereality_v181.safetensors [3d9d4d2b]",
  "amIReal_V41.safetensors [0a8a2e61]",
  "analog-diffusion-1.0.ckpt [9ca13f02]",
  "aniverse_v30.safetensors [579e6f85]",
  "anythingv3_0-pruned.ckpt [2700c435]",
  "anything-v4.5-pruned.ckpt [65745d25]",
  "anythingV5_PrtRE.safetensors [893e49b9]",
  "AOM3A3_orangemixs.safetensors [9600da17]",
  "blazing_drive_v10g.safetensors [ca1c1eab]",
  "breakdomain_I2428.safetensors [43cc7d2f]",
  "breakdomain_M2150.safetensors [15f7afca]",
  "cetusMix_Version35.safetensors [de2f2560]",
  "childrensStories_v13D.safetensors [9dfaabcb]",
  "childrensStories_v1SemiReal.safetensors [a1c56dbb]",
  "childrensStories_v1ToonAnime.safetensors [2ec7b88b]",
  "Counterfeit_v30.safetensors [9e2a8f19]",
  "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]",
  "cyberrealistic_v33.safetensors [82b0d085]",
  "dalcefo_v4.safetensors [425952fe]",
  "deliberate_v2.safetensors [10ec4b29]",
  "deliberate_v3.safetensors [afd9d2d4]",
  "dreamlike-anime-1.0.safetensors [4520e090]",
  "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]",
  "dreamlike-photoreal-2.0.safetensors [fdcf65e7]",
  "dreamshaper_6BakedVae.safetensors [114c8abb]",
  "dreamshaper_7.safetensors [5cf5ae06]",
  "dreamshaper_8.safetensors [9d40847d]",
  "edgeOfRealism_eorV20.safetensors [3ed5de15]",
  "EimisAnimeDiffusion_V1.ckpt [4f828a15]",
  "elldreths-vivid-mix.safetensors [342d9d26]",
  "epicphotogasm_xPlusPlus.safetensors [1a8f6d35]",
  "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]",
  "epicrealism_pureEvolutionV3.safetensors [42c8440c]",
  "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]",
  "indigoFurryMix_v75Hybrid.safetensors [91208cbb]",
  "juggernaut_aftermath.safetensors [5e20c455]",
  "lofi_v4.safetensors [ccc204d6]",
  "lyriel_v16.safetensors [68fceea2]",
  "majicmixRealistic_v4.safetensors [29d0de58]",
  "mechamix_v10.safetensors [ee685731]",
  "meinamix_meinaV9.safetensors [2ec66ab0]",
  "meinamix_meinaV11.safetensors [b56ce717]",
  "neverendingDream_v122.safetensors [f964ceeb]",
  "openjourney_V4.ckpt [ca2f377f]",
  "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]",
  "portraitplus_V1.0.safetensors [1400e684]",
  "protogenx34.safetensors [5896f8d5]",
  "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]",
  "Realistic_Vision_V2.0.safetensors [79587710]",
  "Realistic_Vision_V4.0.safetensors [29a7afaa]",
  "Realistic_Vision_V5.0.safetensors [614d1063]",
  "Realistic_Vision_V5.1.safetensors [a0f13c83]",
  "redshift_diffusion-V10.safetensors [1400e684]",
  "revAnimated_v122.safetensors [3f4fefd9]",
  "rundiffusionFX25D_v10.safetensors [cd12b0ee]",
  "rundiffusionFX_v10.safetensors [cd4e694d]",
  "sdv1_4.ckpt [7460a6fa]",
  "v1-5-pruned-emaonly.safetensors [d7049739]",
  "v1-5-inpainting.safetensors [21c7ab71]",
  "shoninsBeautiful_v10.safetensors [25d8c546]",
  "theallys-mix-ii-churned.safetensors [5d9225a4]",
  "timeless-1.0.ckpt [7c4971d4]",
  "toonyou_beta6.safetensors [980f6b15]",
  // "animagineXLV3_v30.safetensors [75f2f05b]",
  // "devlishphotorealism_sdxl15.safetensors [77cba69f]",
  // "dreamshaperXL10_alpha2.safetensors [c8afe2ef]",
  // "dynavisionXL_0411.safetensors [c39cc051]",
  // "juggernautXL_v45.safetensors [e75f5471]",
  // "realismEngineSDXL_v10.safetensors [af771c3f]",
  // "realvisxlV40.safetensors [f7fdcb51]",
  // "sd_xl_base_1.0.safetensors [be9edd61]",
  // "sd_xl_base_1.0_inpainting_0.1.safetensors [5679a81a]",
  // "turbovisionXL_v431.safetensors [78890989]",
];

export interface LabelValue {
  value: string;
  label: string;
}

export const textModelsLabelValue: LabelValue[] = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  { value: "gemini-1.0-pro", label: "Gemini 1.0 Pro" },
  { value: "llama3-8b-8192", label: "Llama 3 8B 8192" },
  { value: "llama3-70b-8192", label: "Llama 3 70B 8192" },
  { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B 32768" },
  { value: "gemma-7b-it", label: "Gemma 7B IT" },
  { value: "gemma2-9b-it", label: "Gemma 2 9B IT" },
];

export const imageModelsLabelValue: LabelValue[] = [
  { value: "dall-e-3", label: "Dall·E V3" },
  { value: "dall-e-2", label: "Dall·E V2" },
  { value: "3Guofeng3_v34.safetensors [50f420de]", label: "3 Guofeng3 V3.4" },
  {
    value: "absolutereality_V16.safetensors [37db0fc3]",
    label: "Absolute Reality V1.6",
  },
  {
    value: "absolutereality_v181.safetensors [3d9d4d2b]",
    label: "Absolute Reality V1.8.1",
  },
  { value: "amIReal_V41.safetensors [0a8a2e61]", label: "Am I Real V4.1" },
  { value: "analog-diffusion-1.0.ckpt [9ca13f02]", label: "Analog V1" },
  { value: "aniverse_v30.safetensors [579e6f85]", label: "Aniverse V3" },
  { value: "anythingv3_0-pruned.ckpt [2700c435]", label: "Anything V3" },
  { value: "anything-v4.5-pruned.ckpt [65745d25]", label: "Anything V4.5" },
  { value: "anythingV5_PrtRE.safetensors [893e49b9]", label: "Anything V5" },
  {
    value: "AOM3A3_orangemixs.safetensors [9600da17]",
    label: "AbyssOrangeMix V3",
  },
  {
    value: "blazing_drive_v10g.safetensors [ca1c1eab]",
    label: "Blazing Drive V10g",
  },
  {
    value: "breakdomain_I2428.safetensors [43cc7d2f]",
    label: "BreakDomain I2428",
  },
  {
    value: "breakdomain_M2150.safetensors [15f7afca]",
    label: "BreakDomain M2150",
  },
  {
    value: "cetusMix_Version35.safetensors [de2f2560]",
    label: "CetusMix Version35",
  },
  {
    value: "childrensStories_v13D.safetensors [9dfaabcb]",
    label: "Children's Stories V1 3D",
  },
  {
    value: "childrensStories_v1SemiReal.safetensors [a1c56dbb]",
    label: "Children's Stories V1 SemiReal",
  },
  {
    value: "childrensStories_v1ToonAnime.safetensors [2ec7b88b]",
    label: "Children's Stories V1 Toon-Anime",
  },
  {
    value: "Counterfeit_v30.safetensors [9e2a8f19]",
    label: "Counterfeit V3.0",
  },
  {
    value: "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]",
    label: "CuteYukimix MidChapter3",
  },
  {
    value: "cyberrealistic_v33.safetensors [82b0d085]",
    label: "CyberRealistic V3.3",
  },
  { value: "dalcefo_v4.safetensors [425952fe]", label: "Dalcefo V4" },
  { value: "deliberate_v2.safetensors [10ec4b29]", label: "Deliberate V2" },
  { value: "deliberate_v3.safetensors [afd9d2d4]", label: "Deliberate V3" },
  {
    value: "dreamlike-anime-1.0.safetensors [4520e090]",
    label: "Dreamlike Anime V1",
  },
  {
    value: "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]",
    label: "Dreamlike Diffusion V1",
  },
  {
    value: "dreamlike-photoreal-2.0.safetensors [fdcf65e7]",
    label: "Dreamlike Photoreal V2",
  },
  {
    value: "dreamshaper_6BakedVae.safetensors [114c8abb]",
    label: "Dreamshaper 6 baked vae",
  },
  { value: "dreamshaper_7.safetensors [5cf5ae06]", label: "Dreamshaper 7" },
  { value: "dreamshaper_8.safetensors [9d40847d]", label: "Dreamshaper 8" },
  {
    value: "edgeOfRealism_eorV20.safetensors [3ed5de15]",
    label: "Edge of Realism EOR V2.0",
  },
  {
    value: "EimisAnimeDiffusion_V1.ckpt [4f828a15]",
    label: "Eimis Anime Diffusion V1.0",
  },
  {
    value: "elldreths-vivid-mix.safetensors [342d9d26]",
    label: "Elldreth's Vivid",
  },
  {
    value: "epicphotogasm_xPlusPlus.safetensors [1a8f6d35]",
    label: "epiCPhotoGasm X Plus Plus",
  },
  {
    value: "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]",
    label: "EpiCRealism Natural Sin RC1",
  },
  {
    value: "epicrealism_pureEvolutionV3.safetensors [42c8440c]",
    label: "EpiCRealism Pure Evolution V3",
  },
  {
    value: "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]",
    label: "I Cant Believe Its Not Photography Seco",
  },
  {
    value: "indigoFurryMix_v75Hybrid.safetensors [91208cbb]",
    label: "Indigo Furry Mix V7.5 Hybrid",
  },
  {
    value: "juggernaut_aftermath.safetensors [5e20c455]",
    label: "Juggernaut Aftermath",
  },
  { value: "lofi_v4.safetensors [ccc204d6]", label: "Lofi V4" },
  { value: "lyriel_v16.safetensors [68fceea2]", label: "Lyriel V1.6" },
  {
    value: "majicmixRealistic_v4.safetensors [29d0de58]",
    label: "MajicMix Realistic V4",
  },
  { value: "mechamix_v10.safetensors [ee685731]", label: "MechaMix V1.0" },
  {
    value: "meinamix_meinaV9.safetensors [2ec66ab0]",
    label: "MeinaMix Meina V9",
  },
  {
    value: "meinamix_meinaV11.safetensors [b56ce717]",
    label: "MeinaMix Meina V11",
  },
  {
    value: "neverendingDream_v122.safetensors [f964ceeb]",
    label: "Neverending Dream V1.22",
  },
  { value: "openjourney_V4.ckpt [ca2f377f]", label: "Openjourney V4" },
  {
    value: "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]",
    label: "Pastel-Mix",
  },
  { value: "portraitplus_V1.0.safetensors [1400e684]", label: "Portrait+ V1" },
  { value: "protogenx34.safetensors [5896f8d5]", label: "Protogen x3.4" },
  {
    value: "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]",
    label: "Realistic Vision V1.4",
  },
  {
    value: "Realistic_Vision_V2.0.safetensors [79587710]",
    label: "Realistic Vision V2.0",
  },
  {
    value: "Realistic_Vision_V4.0.safetensors [29a7afaa]",
    label: "Realistic Vision V4.0",
  },
  {
    value: "Realistic_Vision_V5.0.safetensors [614d1063]",
    label: "Realistic Vision V5.0",
  },
  {
    value: "Realistic_Vision_V5.1.safetensors [a0f13c83]",
    label: "Realistic Vision V5.1",
  },
  {
    value: "redshift_diffusion-V10.safetensors [1400e684]",
    label: "Redshift Diffusion V1.0",
  },
  {
    value: "revAnimated_v122.safetensors [3f4fefd9]",
    label: "ReV Animated V1.2.2",
  },
  {
    value: "rundiffusionFX25D_v10.safetensors [cd12b0ee]",
    label: "RunDiffusion FX 2.5D V1.0",
  },
  {
    value: "rundiffusionFX_v10.safetensors [cd4e694d]",
    label: "RunDiffusion FX Photorealistic V1.0",
  },
  { value: "sdv1_4.ckpt [7460a6fa]", label: "SD V1.4" },
  { value: "v1-5-pruned-emaonly.safetensors [d7049739]", label: "SD V1.5" },
  {
    value: "v1-5-inpainting.safetensors [21c7ab71]",
    label: "SD V1.5 Inpainting",
  },
  {
    value: "shoninsBeautiful_v10.safetensors [25d8c546]",
    label: "Shonin's Beautiful People V1.0",
  },
  {
    value: "theallys-mix-ii-churned.safetensors [5d9225a4]",
    label: "TheAlly's Mix II",
  },
  { value: "timeless-1.0.ckpt [7c4971d4]", label: "Timeless V1" },
  { value: "toonyou_beta6.safetensors [980f6b15]", label: "ToonYou Beta 6" },
  // {
  //   value: "animagineXLV3_v30.safetensors [75f2f05b]",
  //   label: "Animagine XL V3",
  // },
  // {
  //   value: "devlishphotorealism_sdxl15.safetensors [77cba69f]",
  //   label: "Devlish Photorealism SDXL 1.5",
  // },
  // {
  //   value: "dreamshaperXL10_alpha2.safetensors [c8afe2ef]",
  //   label: "Dreamshaper XL 10 Alpha 2",
  // },
  // {
  //   value: "dynavisionXL_0411.safetensors [c39cc051]",
  //   label: "Dynavision XL 0411",
  // },
  // {
  //   value: "juggernautXL_v45.safetensors [e75f5471]",
  //   label: "Juggernaut XL V4.5",
  // },
  // {
  //   value: "realismEngineSDXL_v10.safetensors [af771c3f]",
  //   label: "Realism Engine SDXL V1.0",
  // },
  // { value: "realvisxlV40.safetensors [f7fdcb51]", label: "Realvis XL V4.0" },
  // { value: "sd_xl_base_1.0.safetensors [be9edd61]", label: "SD XL Base 1.0" },
  // {
  //   value: "sd_xl_base_1.0_inpainting_0.1.safetensors [5679a81a]",
  //   label: "SD XL Base 1.0 Inpainting 0.1",
  // },
  // {
  //   value: "turbovisionXL_v431.safetensors [78890989]",
  //   label: "Turbovision XL V4.31",
  // },
];

export const cardBackgroundColors = ["#F3EDFF", "#FAFFDE", "#FFF0E8", "#FFF"];

export const promptTypeOptions = [
  { value: "text", label: "Text" },
  { value: "image", label: "Image" },
];

export async function urlToFile(
  url: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}

export async function base64ToFile(
  base64: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });
}

interface FileData {
  [key: string]: string;
}

interface FileObject {
  [key: string]: File;
}

export async function convertUrlsToFiles(data: FileData): Promise<FileObject> {
  const filePromises = Object.entries(data).map(async ([key, value]) => {
    let file: File;
    const filename = `${key}.png`;
    const mimeType = "image/png";

    if (value.startsWith("data:")) {
      file = await base64ToFile(value, filename, mimeType);
    } else {
      file = await urlToFile(value, filename, mimeType);
    }

    return { key, file };
  });

  const files = await Promise.all(filePromises);
  return files.reduce((acc, { key, file }) => {
    acc[key] = file;
    return acc;
  }, {} as FileObject);
}
