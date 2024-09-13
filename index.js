import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.send("Server started");
})

//api
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})