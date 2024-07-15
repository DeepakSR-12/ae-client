// import { fetchAiData } from "./models/AiData";

// export const retrieveAiData = async () => {
//   try {
//     const aiData = await fetchAiData();
//     return aiData;
//   } catch (error) {
//     console.log("[AI_DATA_ERROR]", error);
//   }
// };

import { fetchAiData } from "./models/AiData";
import { getFileDownloadURL } from "./firebase";

export const retrieveAiData = async () => {
  try {
    const aiData = await fetchAiData();

    const fetchedData = await Promise.all(
      aiData.map(async (item) => {
        if (item.promptType === "image") {
          item.items = await Promise.all(
            item.items.map(async (imageItem) => {
              const src = await getFileDownloadURL(imageItem.src!);
              return { ...imageItem, src };
            })
          );
        }
        return item;
      })
    );

    return fetchedData;
    // return aiData;
  } catch (error) {
    console.error("[AI_DATA_ERROR]", error);
    throw error;
  }
};
