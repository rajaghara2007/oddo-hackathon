import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`🚀 Tripora backend running on port ${PORT}`);
});
