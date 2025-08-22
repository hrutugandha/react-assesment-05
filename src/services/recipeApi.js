// For demo purposes, we'll use localStorage to simulate a backend
// In a real application, you would make actual API calls using axios or fetch

// Get all recipes
export const getRecipes = async () => {
  try {
    // For demo: get from localStorage or return mock data
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      return JSON.parse(savedRecipes);
    }
    
    // Return some initial mock data
    const mockRecipes = [
      {
        id: '1',
        title: 'Classic Chocolate Chip Cookies',
        category: 'Dessert',
        prepTime: 15,
        cookTime: 12,
        servings: 24,
        ingredients: [
          '2 1/4 cups all-purpose flour',
          '1 teaspoon baking soda',
          '1 teaspoon salt',
          '1 cup butter, softened',
          '3/4 cup granulated sugar',
          '3/4 cup packed brown sugar',
          '2 large eggs',
          '2 teaspoons vanilla extract',
          '2 cups chocolate chips'
        ],
        instructions: [
          'Preheat oven to 375°F (190°C).',
          'Combine flour, baking soda, and salt in small bowl.',
          'Beat butter, granulated sugar, brown sugar, and vanilla in large mixer bowl.',
          'Add eggs one at a time, beating well after each addition.',
          'Gradually beat in flour mixture.',
          'Stir in chocolate chips.',
          'Drop by rounded tablespoon onto ungreased baking sheets.',
          'Bake for 9 to 11 minutes or until golden brown.',
          'Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.'
        ],
        image: null
      },
      {
        id: '2',
        title: 'Vegetable Stir Fry',
        category: 'Main Course',
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        ingredients: [
          '2 tablespoons vegetable oil',
          '1 onion, sliced',
          '2 bell peppers, sliced',
          '2 carrots, julienned',
          '2 cups broccoli florets',
          '3 cloves garlic, minced',
          '1 tablespoon ginger, grated',
          '1/4 cup soy sauce',
          '2 tablespoons honey',
          '1 teaspoon sesame oil'
        ],
        instructions: [
          'Heat oil in a large wok or skillet over high heat.',
          'Add onion and stir-fry for 2 minutes.',
          'Add bell peppers, carrots, and broccoli. Stir-fry for 3-4 minutes.',
          'Add garlic and ginger, cook for 1 minute.',
          'In a small bowl, mix soy sauce, honey, and sesame oil.',
          'Pour sauce over vegetables and toss to coat.',
          'Cook for 2 more minutes until vegetables are crisp-tender.',
          'Serve immediately with rice or noodles.'
        ],
        image: "https://images.themodernproper.com/production/posts/VegetableStirFry_9.jpg?w=800&q=82&auto=format&fit=crop&dm=1703377301&s=fec7d0fbeb1b2b6b56acf09df106e7ad"
      }
    ];
    
    localStorage.setItem('recipes', JSON.stringify(mockRecipes));
    return mockRecipes;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};

// Get recipe by ID
export const getRecipeById = async (id) => {
  try {
    const recipes = await getRecipes();
    const recipe = recipes.find(recipe => recipe.id === id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return recipe;
  } catch (error) {
    throw new Error('Failed to fetch recipe');
  }
};

// Add new recipe
export const addRecipe = async (recipeData) => {
  try {
    const recipes = await getRecipes();
    const newRecipe = {
      id: Date.now().toString(),
      ...recipeData,
      createdAt: new Date().toISOString()
    };
    
    const updatedRecipes = [...recipes, newRecipe];
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return newRecipe;
  } catch (error) {
    throw new Error('Failed to add recipe');
  }
};

// Update recipe
export const updateRecipe = async (id, recipeData) => {
  try {
    const recipes = await getRecipes();
    const updatedRecipes = recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...recipeData } : recipe
    );
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return updatedRecipes.find(recipe => recipe.id === id);
  } catch (error) {
    throw new Error('Failed to update recipe');
  }
};

// Delete recipe
export const deleteRecipe = async (id) => {
  try {
    const recipes = await getRecipes();
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return true;
  } catch (error) {
    throw new Error('Failed to delete recipe');
  }
};
