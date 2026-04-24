import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Favorite = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (recipe) => set((state) => ({ 
        favorites: [...state.favorites, recipe] 
      })),
      removeFavorite: (idMeal) => set((state) => ({ 
        favorites: state.favorites.filter((item) => item.idMeal !== idMeal) 
      })),
      checkIsFavorite: (idMeal) => (state) => 
        state.favorites.some((item) => item.idMeal === idMeal),
    }),
    {
      name: 'favorite-stuff',
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);