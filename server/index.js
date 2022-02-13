const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/UserRoute");
const PostRouter = require("./Routes/PostRouter");
const adminRouter = require("./Routes/AdminRouter");
const cors = require("cors");
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//on n'ecrit pas le parametre path dans le config car le .env est de meme niveau que le index(entry point)
dotenv.config();
//midelware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/auth", userRoute);
app.use("/post", PostRouter);
app.use("/admin", adminRouter);

//----------deployment
const root = require("path").join(__dirname, "../client", "build");
/* const __dirname1 = path.resolve(); */
app.use(express.static(root));
if ((process.env.NODE_ENV = "production")) {
  /* app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname1, "../client", "build", "index.html")
    );
  }); */
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
} else {
  app.get("/", (request, response) => {
    response.send("API is running successfully");
  });
}

//----------deployment

const port = process.env.PORT ||9000 ;

mongoose.connect(process.env.URL, (error) => {
  if (error) {
    console.log("connexion failed ");
  } else {
    console.log("database is connected");
  }
});
app.listen(port, (error) => {
  if (error) console.log("failed to run ");
  console.log(`server is running on port ${port}`);
});
