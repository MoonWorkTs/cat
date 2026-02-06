import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import cors from "cors";
import { validateFields } from "./utils/validate-fields.js";
import TelegramBot from "node-telegram-bot-api";
import { normalizePhone } from "./utils/normalize-phone.js";
import rateLimit from "express-rate-limit";
import { escapeMarkdown } from "./utils/escape-markdown.js";
import { sanitize } from "./utils/sanitize.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8082;

const lrserver = livereload.createServer();
lrserver.watch(path.join(__dirname, "../public"));

const allowedOrigins = [process.env.CORS_ORIGIN];

app.use(connectLivereload());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 20, // 20 запросов с IP
});

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/privacy-policy", (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "privacy-policy.html"));
});

app.get("/user-agreement", (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "user-agreement.html"));
});

app.post("/api/form", formLimiter, async (req, res) => {
  try {
    if (req.headers.origin !== allowedOrigins[0]) {
      return res.status(403).json({ message: "Доступ запрещен" });
    }

    const isValidateFields = validateFields(req.body);

    if (!isValidateFields)
      return res.status(400).json({ message: "Ошибка валидации данных" });
    if (req.body.comment > 1000) {
      return res.status(400).json({ message: "Слишком длинный комментарий" });
    }

    const name = escapeMarkdown(sanitize(req.body.name));
    const surname = escapeMarkdown(sanitize(req.body.surname || ""));
    const lastname = escapeMarkdown(sanitize(req.body.lastname || ""));
    const email = escapeMarkdown(sanitize(req.body.email || "-"));
    const comment = escapeMarkdown(
      sanitize(req.body.comment || "(Отсутствует)"),
    );
    const phone = escapeMarkdown(normalizePhone(req.body.phone));

    const botText = [
      "📩 *Новое обращение*:",
      `👤 ФИО: ${surname}${name ? " " + name : ""}${lastname ? " " + lastname : ""}`,
      `✉️ Почта: ${email}`,
      `📞 Телефон: ${phone}`,
      `💬 Комментарий: ${comment}`,
    ].join("\n");

    const chatIds = String(process.env.TELEGRAM_CHAT_IDS).split(";");

    for (const chatId of chatIds) {
      await bot.sendMessage(chatId, botText, {
        parse_mode: "MarkdownV2",
      });
    }

    return res.status(200).json({ message: "Успешно отправлено" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
