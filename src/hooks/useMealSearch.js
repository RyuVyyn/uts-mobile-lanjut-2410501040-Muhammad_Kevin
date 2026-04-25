import { useState, useCallback } from 'react';
import { fetchSearchMealsAPI, fetchMealsByCategoryAPI } from '../api/API';

export default function useMealSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = useCallback(async (keyword, category) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      let data = [];
      if (keyword) {
        data = await fetchSearchMealsAPI(keyword);
      } else if (category) {
        data = await fetchMealsByCategoryAPI(category);
      }
      setResults(data);
    } catch (_) {
      setError('Gagal memuat data. Coba lagi.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setHasSearched(false);
    setError('');
  }, []);

  return { results, loading, error, hasSearched, runSearch, clearResults };
}
