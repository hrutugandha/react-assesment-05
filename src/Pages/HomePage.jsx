import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipes, searchRecipes } from '../services/recipeApi';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: recipes, isLoading, error, refetch } = useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => searchTerm ? searchRecipes(searchTerm) : getRecipes(),
  });

  // Debug: Log recipes data to console
  useEffect(() => {
    if (recipes) {
      console.log('Recipes loaded:', recipes);
      console.log('Number of recipes:', recipes.length);
      console.log('Recipe IDs:', recipes.map(r => r.id));
    }
  }, [recipes]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (isLoading) return <div className="loading">Loading recipes...</div>;
  if (error) return <div className="error">Error loading recipes: {error.message}</div>;

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Recipe Book</h1>
        <p>Discover and share your favorite recipes</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search recipes by name, category, or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        
        {searchTerm && (
          <div className="search-results-info">
            <p>
              Showing {recipes?.length || 0} results for "{searchTerm}"
              <button onClick={handleClearSearch} className="clear-results-btn">
                Clear search
              </button>
            </p>
          </div>
        )}
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

      {recipes?.length === 0 && searchTerm && (
        <div className="empty-state">
          <h3>No recipes found</h3>
          <p>Try a different search term or browse all recipes</p>
          <button onClick={handleClearSearch} className="add-recipe-btn">
            Show All Recipes
          </button>
        </div>
      )}

      {recipes?.length === 0 && !searchTerm && (
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
