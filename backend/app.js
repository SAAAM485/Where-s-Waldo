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
            "https://taggingapp.netlify.app",
        ],
    })
);

const dataRoutes = require("./routes/dataRouter");
app.use("/api/", dataRoutes);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at port http://localhost:${port}/`);
    });
}

module.exports = app; // Export the app for testing purposes
