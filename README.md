# React Lab – Recipe Discovery App

##  Overview
This project is a client-side “Recipe Discovery” application that allows users to browse recipes by category, search for specific recipes, view detailed recipe information, and manage a personal list of favorite recipes. The application demonstrates advanced React concepts including custom hooks, Context API, routing, and state management.


##  Workplace Context
In modern web applications, users expect dynamic content, personalized experiences, and persistent state across sessions. This lab simulates a real-world scenario where developers need to fetch data from an external API, manage global state, and provide a seamless user experience with search, favorites, and dynamic routing.

##  Learning Objectives
Upon successful completion of this lab, you will be able to:

* Fetch and display data from an external API using `useState` and `useEffect`.
* Create and use custom hooks for data fetching (`useFetch`) and state persistence (`useLocalStorage`).
* Implement global state management with React Context (`FavoritesContext`).
* Build dynamic routes with React Router to display category and recipe details.
* Manage favorite items and persist them across browser sessions.
* Implement search functionality and conditional UI updates.
* Design reusable and responsive components for a SPA.

##  Description

This lab focuses on:

* Fetching recipe data from TheMealDB API and handling loading and error states.
* Implementing two custom hooks:
  * `useFetch` — generic data fetching hook with loading and error state management.
  * `useLocalStorage` — synchronizes state with browser `localStorage` for persistence.
* Creating `FavoritesContext` to globally manage favorite recipes:
  * Add, remove, and check favorite recipes.
  * Persist favorites across sessions using `useLocalStorage`.
* Implementing client-side routing for multiple pages:
  * **Home Page (`/`)** — Lists all recipe categories.
  * **Category Page (`/category/[categoryName]`)** — Displays all recipes in a selected category.
  * **Recipe Detail Page (`/recipe/[recipeId]`)** — Shows full recipe details with favorite toggle.
  * **Favorites Page (`/favorites`)** — Displays user’s favorite recipes.
  * **Search Results Page (`/search?query=...`)** — Displays recipes matching the search query.
* Building reusable UI components (`RecipeCard`, `Navbar`, `Spinner`, `ErrorMessage`) with responsive design.


##  Resources

*  React Docs — https://react.dev
*  TypeScript Handbook — https://www.typescriptlang.org/docs
*  React Hooks Guide — Official Documentation
*  TypeScript + React Cheatsheets (recommended)
*  TheMealDB API Documentation — https://www.themealdb.com/api.php


##  Getting Started

##  Requirements

*  Node.js v24+
*  npm
*  Git
*  A code editor (VS Code recommended)
*  TypeScript
*  React

##  OS Compatibility

This lab works on:

*  Windows
*  macOS
*  Linux

##  Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/KaeTheDev/Recipe-Discovery-App.git)

2. Navigate into the project folder:

cd recipe-discovery-app

##  Setup

1. Install dependencies:

npm install

2. Run the project:

npm run dev

##  Project Structure


* components/ — Reusable UI components like RecipeCard, Navbar, Spinner, etc.
* contexts/ — FavoritesContext and provider for global state management.
* hooks/ — Custom hooks (useFetch, useLocalStorage) for fetching and state persistence.
* pages/ — Page components for Home, Category, Recipe Detail, Favorites, and Search Results.
* types/ — Shared TypeScript types/interfaces.
* utils/ — Utility functions such as API helpers.

*  components/ — Contains all React components used in the app.
*  types/ — Shared TypeScript types/interfaces used across components.
* utils / -

## Reflection

The most challenging part of this project for me was implementing the search functionality and the SearchResults page. Getting the search behavior to feel correct required more than just fetching data. I had to use additional JavaScript logic to control the UI—such as closing the dropdown when a user selected a recipe, clicking outside the search box, or navigating to the Search Results page. Managing those interactions helped me better understand how React state, effects, and event handling work together.

I also found it challenging to connect the Favorites button to the FavoritesContext. At first, it wasn’t obvious how the context provider, consumer, and component state were all connected. However, once I understood the pattern, it became much easier to reason about how data flows through the app. Recognizing these patterns made the rest of the implementation feel much more manageable.
One important design decision I made was improving my useFetch custom hook. Initially, the hook only returned arrays of recipes, which worked fine for basic data fetching. However, when implementing search, I realized that the API can return null when no results are found. This caused errors until I updated the hook’s types to allow null values. This change made the hook more flexible and better suited for real-world API responses.

Overall, I enjoyed this project more than earlier ones because it aligned better with learning more advanced React concepts. Working with a real API instead of static or mock data made the experience feel more realistic and reinforced how important it is to handle edge cases and user interactions properly. Once I understood the core React patterns, putting the pieces together became much easier.