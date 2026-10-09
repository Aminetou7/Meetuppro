import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "registrations.json");
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

const REQUIRED = ["name", "email", "phone", "organization", "job", "sector", "goal"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 300;

function readRegistrations() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeRegistrations(list) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

function validate(body) {
  const errors = {};
  const clean = {};
  for (const field of REQUIRED) {
    const raw = body?.[field];
    const val = typeof raw === "string" ? raw.trim() : "";
    if (!val) {
      errors[field] = "This field is required.";
    } else if (val.length > MAX_LEN) {
      errors[field] = `Must be ${MAX_LEN} characters or fewer.`;
    } else {
      clean[field] = val;
    }
  }
  if (clean.email && !EMAIL_RE.test(clean.email)) errors.email = "Enter a valid email address.";
  return { clean, errors, ok: Object.keys(errors).length === 0 };
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "meetup-pro-api" });
});

app.post("/api/register", (req, res) => {
  const { clean, errors, ok } = validate(req.body);
  if (!ok) return res.status(400).json({ error: "Please fix the highlighted fields.", fields: errors });

  const record = { ...clean, pass: "professional", submittedAt: new Date().toISOString() };
  try {
    const list = readRegistrations();
    list.push(record);
    writeRegistrations(list);
  } catch (err) {
    console.error("Failed to persist registration:", err);
    return res.status(500).json({ error: "Could not save your registration. Please try again." });
  }

  console.log(`[register] ${record.name} <${record.email}> — ${record.organization}`);
  res.status(201).json({ ok: true, message: "Registration received." });
});

app.get("/api/registrations", (req, res) => {
  res.json(readRegistrations());
});

// Serve the built React app in production (npm run build in ../client)
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`MeetUp Pro API listening on http://localhost:${PORT}`);
  if (!fs.existsSync(CLIENT_DIST)) {
    console.log("(client build not found — serving API only; run the Vite dev server for the site)");
  }
});
