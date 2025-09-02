import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import { pool } from "../../../lib/db";

export const config = { api: { bodyParser: false } };

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public", "schoolImages"),
    filename: (_, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const handler = nextConnect();

handler.get(async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
  );
  res.json(rows);
});

handler.use(upload.single("image"));

handler.post(async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  if (!req.file) return res.status(400).json({ error: "Image required" });

  const imagePath = "/schoolImages/" + req.file.filename;

  await pool.query(
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, address, city, state, contact, imagePath, email_id]
  );

  res.status(201).json({ success: true });
});

export default handler;
