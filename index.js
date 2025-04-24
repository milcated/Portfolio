import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

app.set('view engine', 'ejs');  // This tells Express to use EJS


app.use(express.static('public'));

app.get("/cocktail", async (req, res) => {
    try {
        const result = await axios.get(API_URL)
    if (result.data.drinks && result.data.drinks.length > 0) {
        const cocktail = result.data.drinks[0];

        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }

    res.render ('index.ejs' , {
        image: cocktail.strDrinkThumb,
        name: cocktail.strDrink,
        instructions: cocktail.strInstructions,
        category: cocktail.strCategory,
        alcoholic: cocktail.strAlcoholic,
        ingredients: ingredients,

        });
    } else {
        res.status(404).send('No cocktail found');
    }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to find cocktail');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  