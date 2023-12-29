import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

const recipeFilePath = "./recipe.json";
let recipeJson;

if (fs.existsSync(recipeFilePath)) {
  const jsonData = fs.readFileSync(recipeFilePath, "utf-8");
  recipeJson = JSON.parse(jsonData);
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
