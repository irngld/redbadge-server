require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));