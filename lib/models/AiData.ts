import { Schema, Document, models, model } from "mongoose";
import dbConnect from "../db";

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
