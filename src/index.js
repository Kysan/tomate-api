const { Router } = require("express");
const express = require("express");



const app = express()

// app.use(require("cors"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*")
  // res.header()
  // res.header("Cross-Origin-Embedder-Policy", "*");
  // res.header("Referrer-Policy", "no-referrer");
  next();
})
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
authRouter.get("/users/all", require("./routes/getAllUsers"))

app.use(authRouter)



// * we connect the database and then start the server
const config = require("./config.json");


// database connection
const mongoose = require("mongoose")

mongoose.connect(config.mongodbUrl).then(() => {
  console.log(`connected to ${config.mongodbUrl}`)

  app.listen(config.port, config.hostname, () => {
    console.log(`server started on http://${config.hostname}:${config.port}`);
  })

}).catch(() => console.error("failed to connect to the database"))