import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const __fileName = fileURLToPath(import.meta.url);
const __dirPath = path.resolve(__fileName, "../");

app.set("views", path.join(__dirPath, "/views"));

const recipeFilePath = "./recipe.json";
let recipeJson;
let dataRecipe;

if (fs.existsSync(recipeFilePath)) {
  const jsonData = fs.readFileSync(recipeFilePath, "utf-8");
  recipeJson = JSON.parse(jsonData);
}


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs",  { recipe: dataRecipe });
});


app.post("/recipe", (req, res) => {
  const requestedRecipe = req.body.choice;
  
  switch (requestedRecipe) {
    case "chicken":
      dataRecipe = recipeJson[0];
      break;
    case "beef":
      dataRecipe = recipeJson[1];
      break;
    case "fish":
      dataRecipe = recipeJson[2];
      break;
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
