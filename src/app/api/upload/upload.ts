import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), "public/uploads"),
    keepExtensions: true,
    multiples: false,
  });

  try {
    const [, files] = await form.parse(req);
    const file = files.file?.[0] ?? files.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileInfo = file as formidable.File;

    return res.status(200).json({
      filename: fileInfo.newFilename,
      path: `/uploads/${fileInfo.newFilename}`,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
}