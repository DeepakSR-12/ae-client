// import connect from "@/lib/db";
import { auth } from "@clerk/nextjs";
// import multer from "multer";
// import { NextApiRequest, NextApiResponse } from "next";
// import nextConnect from "next-connect";

import { NextResponse } from "next/server";
// import { GridFSBucket, ObjectId } from "mongodb";
// import { Readable } from "stream";
// import mongoose from "mongoose";
// import AiData from "@/lib/models/AiData";

// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// // @ts-ignore
// const apiRoute = nextConnect<NextApiRequest, NextApiResponse>();

// apiRoute.use(
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//   ])
// );

// apiRoute.post(async (req: NextApiRequest & { files: { [fieldname: string]: Express.Multer.File[] } }, res: NextApiResponse) => {
//   await connect();

//   try {
//     const {
//       prompt,
//       promptType,
//       modelName1,
//       text1,
//       modelName2,
//       text2,
//       modelName3,
//       text3,
//       modelName4,
//       text4,
//     } = req.body;
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] };

//     // Initialize GridFS
//     const db = mongoose.connection.db;
//     const bucket = new GridFSBucket(db, {
//       bucketName: "uploads",
//     });

//     const uploadFile = (file: Express.Multer.File) => {
//       return new Promise((resolve, reject) => {
//         const stream = Readable.from(file.buffer);
//         const uploadStream = bucket.openUploadStream(file.originalname);
//         stream
//           .pipe(uploadStream)
//           .on("error", reject)
//           .on("finish", () => resolve(uploadStream.id));
//       });
//     };

//     const image1Id = files.image1 ? await uploadFile(files.image1[0]) : null;
//     const image2Id = files.image2 ? await uploadFile(files.image2[0]) : null;
//     const image3Id = files.image3 ? await uploadFile(files.image3[0]) : null;
//     const image4Id = files.image4 ? await uploadFile(files.image4[0]) : null;

//     const newAiData = new AiData({
//       prompt,
//       promptType,
//       modelName1,
//       text1,
//       // @ts-ignore
//       image1: image1Id ? new ObjectId(image1Id) : null,
//       modelName2,
//       text2,
//       // @ts-ignore
//       image2: image2Id ? new ObjectId(image2Id) : null,
//       modelName3,
//       text3,
//       // @ts-ignore
//       image3: image3Id ? new ObjectId(image3Id) : null,
//       modelName4,
//       text4,
//       // @ts-ignore
//       image4: image4Id ? new ObjectId(image4Id) : null,
//     });

//     await newAiData.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Data submitted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error", error });
//   }
// });

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { body } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Form data is required", { status: 400 });
    }

    console.log({ body });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
