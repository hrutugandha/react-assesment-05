import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import HomePage from './Pages/HomePage';
import RecipeDetails from './Pages/RecipeDetails';
import AddRecipe from './Pages/AddRecipe';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
