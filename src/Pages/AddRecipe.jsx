import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../services/recipeApi';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [''],
    instructions: [''],
    image: ''
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate('/');
    },
    onError: (error) => {
      alert(`Error adding recipe: ${error.message}`);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const recipeData = {
      ...formData,
      prepTime: parseInt(formData.prepTime) || 0,
      cookTime: parseInt(formData.cookTime) || 0,
      servings: parseInt(formData.servings) || 1,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
      instructions: formData.instructions.filter(inst => inst.trim() !== '')
    };

    mutation.mutate(recipeData);
  };

  return (
    <div className="add-recipe-page">
      <div className="page-header">
        <h1>Add New Recipe</h1>
        <p>Share your delicious recipe with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="e.g., Classic Chocolate Chip Cookies"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            placeholder="e.g., Dessert, Main Course, Appetizer"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleInputChange}
              min="0"
              placeholder="15"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookTime">Cook Time (minutes)</label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
              min="0"
              placeholder="30"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleInputChange}
              min="1"
              placeholder="4"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('ingredients', index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('ingredients')}
            className="add-btn"
          >
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="array-input-group">
              <textarea
                value={instruction}
                onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                rows="2"
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('instructions', index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('instructions')}
            className="add-btn"
          >
            + Add Instruction
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL (optional)</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="submit-btn"
          >
            {mutation.isPending ? 'Adding Recipe...' : 'Add Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
