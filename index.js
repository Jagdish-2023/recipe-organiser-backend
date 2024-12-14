const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const Recipe = require("./models/recipe.model");
const initializeDB = require("./db/db.connect");

initializeDB();

// const seedRecipes = async () => {
//   const jsonData = fs.readFileSync("recipes.json");
//   const recipesData = JSON.parse(jsonData);
//   try {
//     for (let recipe of recipesData) {
//       const newRecipe = new Recipe(recipe);
//       await newRecipe.save();
//     }
//   } catch (error) {
//     console.log("Error occured while seeding Recipes.", error);
//   }
// };

// seedRecipes();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
    console.log(error);
  }
});

app.get("/recipes/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const recipeInfo = await Recipe.findById(recipeId);
    if (recipeInfo) {
      res.status(200).json(recipeInfo);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

app.post("/recipes", async (req, res) => {
  try {
    const recipeData = req.body;
    if (recipeData) {
      const newData = new Recipe(recipeData);
      const savedRecipe = await newData.save();
      if (savedRecipe) {
        res
          .status(201)
          .json({ message: "Recipe added successfully.", savedRecipe });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

app.delete("/recipes/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (deletedRecipe) {
      res
        .status(200)
        .json({ message: "Recipe deleted successfully.", deletedRecipe });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server has started running on Port ", PORT);
});
