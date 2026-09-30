import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // مهم لـ ملفات الـ FormData
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "/public/uploads"); // مجلد التخزين
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Upload failed" });
    }

    const file = files.file as formidable.File;
    return res.status(200).json({ filename: file.newFilename, path: `/uploads/${file.newFilename}` });
  });
}