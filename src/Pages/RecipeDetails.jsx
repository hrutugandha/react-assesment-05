import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../services/recipeApi';

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="loading">Loading recipe details...</div>;
  if (error) return <div className="error">Error loading recipe: {error.message}</div>;
  if (!recipe) return <div className="not-found">Recipe not found</div>;

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <p className="recipe-category">{recipe.category}</p>
      </div>

      <div className="recipe-content">
        <div className="recipe-image">
          {recipe.image ? (
            <img src={recipe.image} alt={recipe.title} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="recipe-info">
          <div className="recipe-meta">
            <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
            <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
