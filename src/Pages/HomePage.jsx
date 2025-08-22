import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../services/recipeApi';

const HomePage = () => {
  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  if (isLoading) return <div className="loading">Loading recipes...</div>;
  if (error) return <div className="error">Error loading recipes: {error.message}</div>;

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Recipe Book</h1>
        <p>Discover and share your favorite recipes</p>
      </div>

      <div className="recipes-grid">
        {recipes?.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <div className="recipe-image">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-category">{recipe.category}</p>
                <div className="recipe-meta">
                  <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>👥 {recipe.servings} servings</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {recipes?.length === 0 && (
        <div className="empty-state">
          <h3>No recipes yet</h3>
          <p>Be the first to add a recipe!</p>
          <Link to="/add-recipe" className="add-recipe-btn">
            Add Your First Recipe
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
