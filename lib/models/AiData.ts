import { Schema, Document, models, model } from "mongoose";
import dbConnect from "../db";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface IAiDataItem {
  model: string;
  text?: string;
  src?: string;
}

interface IAiData extends Document {
  prompt: string;
  promptType: string;
  items: IAiDataItem[];
}

const AiDataItemSchema: Schema = new Schema({
  model: { type: String, required: true },
  text: { type: String },
  src: { type: String },
});

const AiDataSchema: Schema = new Schema({
  prompt: { type: String, required: true },
  promptType: { type: String, required: true },
  items: { type: [AiDataItemSchema], required: true },
});

const AiDataModel =
  models.AiData || model<IAiData>("AiData", AiDataSchema, "ai-data");

export default AiDataModel;
export const addAiData = async (data: any): Promise<IAiData> => {
  await dbConnect();
  return AiDataModel.create(data);
};

export const fetchAiData = async (): Promise<IAiData[]> => {
  await dbConnect();
  return AiDataModel.find().exec();
};

// Todo: Mongo: remove this
export const fetchAiDataFirebase = async () => {
  const aiDataCol = collection(db, "ai-data");
  const aiDataSnapshot = await getDocs(aiDataCol);
  const aiDataList = aiDataSnapshot.docs.map((doc) => doc.data());
  return aiDataList;
};

export const addAiDataFirebase = async (aiData: any) => {
  try {
    const aiDataCol = collection(db, "ai-data");

    // Add the new ai data document to the "ai-data" collection
    await addDoc(aiDataCol, aiData);
    return { message: "AI data added successfully" };
  } catch (error) {
    console.error("Error adding AI data: ", error);
    return { error };
  }
};
