import { fetchAiDataFirebase } from "./models/AiData";
import { getFileDownloadURL } from "./firebase";
import { DocumentData } from "firebase/firestore";

export const retrieveAiData = async () => {
  try {
    // Todo: Mongo
    // const aiData = await fetchAiData();
    // const fetchedData = await Promise.all(
    //   aiData.map(async (item) => {
    //     if (item.promptType === "image") {
    //       item.items = await Promise.all(
    //         item.items.map(async (imageItem) => {
    //           const src = await getFileDownloadURL(imageItem.src!);
    //           return { ...imageItem, src };
    //         })
    //       );
    //     }
    //     return item;
    //   })
    // );

    const aiData = await fetchAiDataFirebase();

    let fetchedData: DocumentData[] = [];
    if (!!aiData.length) {
      fetchedData = await Promise.all(
        aiData.map(async (item) => {
          if (item.promptType === "image") {
            item.items = await Promise.all(
              item.items.map(async (imageItem: { src: string }) => {
                const src = await getFileDownloadURL(imageItem.src!);
                return { ...imageItem, src };
              })
            );
          }
          return item;
        })
      );
    }

    return fetchedData;
  } catch (error) {
    console.error("[AI_DATA_ERROR]", error);
    throw error;
  }
};
