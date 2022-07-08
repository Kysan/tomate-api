const { Router } = require("express");
const express = require("express");



const app = express()

// app.use(require("cors"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  try {
    console.log(`${req.method} ${req.url}`)
    next()
  } catch (error) {
    res.json({ error: "unknow" })
  }
})


// * route non protégé
app.post("/login", require("./routes/login"));
app.post("/register", require("./routes/register"));


// * routes protégés
const authRouter = new Router()
authRouter.use(require("./middleware/jwtAuth"))

authRouter.get("/profile", require("./routes/getProfile"));
authRouter.post('/completeTask', require("./routes/completeTask"))

app.use(authRouter)



app.listen(1337, () => {
  console.log("started listening on http://127.0.0.1:1337");
});

const mongoose = require("mongoose")
const config = require("./config.json");
mongoose.connect(config.mongodbUrl).then(() => console.log("connected to db"))