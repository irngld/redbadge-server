require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6001;

const userController = require("./controllers/user.controller");
const database = require("./db");
const authenticate = require("./middleware/authSession");

app.use(require("./middleware/headers"));

app.use("/user", userController);

app.use(authenticate); // any app.use() beneath this will need to authenticate

database.sync({ alter: true }); // connects database, "alter: true" => automatically adjusts tables (columns, etc) when there are changes made

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
