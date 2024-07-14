import mongoose, { Schema, Document, models, model } from "mongoose";

interface IAiData extends Document {
  prompt: string;
  promptType: string;
  modelName1: string;
  text1?: string;
  image1?: string;
  modelName2: string;
  text2?: string;
  image2?: string;
  modelName3: string;
  text3?: string;
  image3?: string;
  modelName4: string;
  text4?: string;
  image4?: string;
}

const AiDataSchema: Schema = new Schema({
  prompt: { type: String, required: true },
  promptType: { type: String, required: true },
  modelName1: { type: String, required: true },
  text1: { type: String },
  image1: { type: String },
  modelName2: { type: String, required: true },
  text2: { type: String },
  image2: { type: String },
  modelName3: { type: String, required: true },
  text3: { type: String },
  image3: { type: String },
  modelName4: { type: String, required: true },
  text4: { type: String },
  image4: { type: String },
});

export const AiDataModel =
  models.AiData || model<IAiData>("AiData", AiDataSchema);

export const addAiData = (data: any): Promise<IAiData> =>
  AiDataModel.create(data);

export default models.AiData || model<IAiData>("AiData", AiDataSchema);
