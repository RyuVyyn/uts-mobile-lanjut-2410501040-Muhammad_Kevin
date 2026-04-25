import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchRandomMealsAPI = async (count = 10) => {
  const requests = Array.from({ length: count }).map(() =>
    api.get('/random.php')
  );
  const responses = await Promise.all(requests);
  return responses.map((res) => res.data.meals[0]);
};

export const fetchRecipeDetailAPI = async (idMeal) => {
  const response = await api.get(`/lookup.php?i=${idMeal}`);
  return response.data.meals ? response.data.meals[0] : null;
};

export const fetchSearchMealsAPI = async (keyword) => {
  const response = await api.get(`/search.php?s=${keyword}`);
  return response.data.meals || [];
};

export const fetchMealsByCategoryAPI = async (category) => {
  const response = await api.get(`/filter.php?c=${category}`);
  return response.data.meals || [];
};

export const fetchCategoriesAPI = async () => {
  const response = await api.get('/categories.php');
  return response.data.categories || [];
};
