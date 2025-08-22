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
    
    // Return some initial mock data with proper image URLs
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
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop"
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
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop"
      },
      {
        id: '3',
        title: 'Creamy Mushroom Pasta',
        category: 'Main Course',
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        ingredients: [
          '12 oz pasta (fettuccine or linguine)',
          '2 tbsp olive oil',
          '1 lb mushrooms, sliced',
          '4 cloves garlic, minced',
          '1 cup heavy cream',
          '1/2 cup grated parmesan cheese',
          '2 tbsp fresh parsley, chopped',
          'Salt and pepper to taste'
        ],
        instructions: [
          'Cook pasta according to package directions.',
          'Heat olive oil in a large skillet over medium heat.',
          'Add mushrooms and cook until golden brown, about 8 minutes.',
          'Add garlic and cook for 1 minute until fragrant.',
          'Pour in heavy cream and bring to a simmer.',
          'Stir in parmesan cheese until melted and creamy.',
          'Add cooked pasta to the sauce and toss to coat.',
          'Season with salt, pepper, and fresh parsley.',
          'Serve immediately.'
        ],
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop"
      },
      {
        id: '4',
        title: 'Fresh Garden Salad',
        category: 'Salad',
        prepTime: 15,
        cookTime: 0,
        servings: 4,
        ingredients: [
          '4 cups mixed greens',
          '1 cucumber, sliced',
          '2 tomatoes, chopped',
          '1/2 red onion, thinly sliced',
          '1/4 cup feta cheese, crumbled',
          '2 tbsp olive oil',
          '1 tbsp lemon juice',
          '1 tsp honey',
          'Salt and pepper to taste'
        ],
        instructions: [
          'Wash and dry the mixed greens.',
          'Combine greens, cucumber, tomatoes, and red onion in a large bowl.',
          'In a small bowl, whisk together olive oil, lemon juice, honey, salt, and pepper.',
          'Pour dressing over salad and toss gently.',
          'Top with crumbled feta cheese.',
          'Serve immediately.'
        ],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
      },
      {
        id: '5',
        title: 'Berry Smoothie Bowl',
        category: 'Breakfast',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        ingredients: [
          '2 cups frozen mixed berries',
          '1 banana',
          '1/2 cup Greek yogurt',
          '1/4 cup milk or almond milk',
          '2 tbsp honey',
          'Toppings: granola, fresh berries, chia seeds, coconut flakes'
        ],
        instructions: [
          'Combine frozen berries, banana, Greek yogurt, milk, and honey in a blender.',
          'Blend until smooth and creamy.',
          'Pour into bowls and add desired toppings.',
          'Serve immediately.'
        ],
        image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&h=300&fit=crop"
      },
      {
        id: '6',
        title: 'Grilled Chicken Breast',
        category: 'Main Course',
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        ingredients: [
          '4 boneless, skinless chicken breasts',
          '2 tbsp olive oil',
          '2 cloves garlic, minced',
          '1 tsp paprika',
          '1 tsp dried oregano',
          'Salt and pepper to taste',
          'Lemon wedges for serving'
        ],
        instructions: [
          'Preheat grill to medium-high heat.',
          'Pat chicken breasts dry and brush with olive oil.',
          'Mix garlic, paprika, oregano, salt, and pepper in a small bowl.',
          'Rub seasoning mixture onto both sides of chicken.',
          'Grill chicken for 6-7 minutes per side, until internal temperature reaches 165°F.',
          'Let rest for 5 minutes before slicing.',
          'Serve with lemon wedges.'
        ],
        image: "https://images.unsplash.com/photo-1603360946369-dc9bbd814503?w=400&h=300&fit=crop"
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

// Search recipes by title
export const searchRecipes = async (searchTerm) => {
  try {
    const recipes = await getRecipes();
    if (!searchTerm || searchTerm.trim() === '') {
      return recipes;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(term) ||
      recipe.category.toLowerCase().includes(term) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(term))
    );
  } catch (error) {
    throw new Error('Failed to search recipes');
  }
};
