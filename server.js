const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/calc", (req, res) => {
  const { a, b, op } = req.body;

  const x = Number(a);
  const y = Number(b);

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return res.status(400).json({ error: "Inputs must be valid numbers." });
  }

  let result;
  switch (op) {
    case "+": result = x + y; break;
    case "-": result = x - y; break;
    case "*": result = x * y; break;
    case "/":
      if (y === 0) return res.status(400).json({ error: "Division by zero." });
      result = x / y;
      break;
    default:
      return res.status(400).json({ error: "Invalid operator." });
  }

  res.json({ a: x, b: y, op, result });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
