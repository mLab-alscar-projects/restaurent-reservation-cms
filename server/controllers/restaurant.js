import Recipe from "../models/recipe.js";




// GET RECIPE  BY ID

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS


//  UPDATE  RECIPE BY ID

const updateRecipeById = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  // Return the updated document
            runValidators: true  // Ensure the update follows schema validation rules
        });

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS


// DELETE RECIPE BY ID
const deleteRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS

