import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Server started");
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})