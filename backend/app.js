require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://saaam485.github.io",
            "https://where-s-waldo-frontend.netlify.app",
        ],
    })
);

const dataRoutes = require("./routes/dataRouter");
app.use("/api/data", dataRoutes);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});
