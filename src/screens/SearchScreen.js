import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import HeaderHome from '../components/HeaderHome';
import SearchCard from '../components/SearchCard';
import CategoryChip from '../components/CategoryChip';
import { fetchCategoriesAPI } from '../api/API';

import useDebounce from '../utils/useDebounce';
import useMealSearch from '../utils/useMealSearch';

export default function SearchScreen({ navigation }) {
  const [query, setQuery]                     = useState('');
  const [validationError, setValidationError] = useState('');
  const [categories, setCategories]           = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const debouncedQuery = useDebounce(query.trim(), 500);
  
  const { results, loading, error, hasSearched, runSearch, clearResults } = useMealSearch();

  useEffect(() => {
    fetchCategoriesAPI()
      .then((cats) => setCategories(cats))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (debouncedQuery === '' && selectedCategory === '') {
      clearResults();
      setValidationError('');
      return;
    }
    if (debouncedQuery !== '' && debouncedQuery.length < 3) {
      setValidationError('Keyword minimal 3 karakter');
      clearResults();
      return;
    }
    setValidationError('');
    runSearch(debouncedQuery, selectedCategory);
  }, [debouncedQuery, selectedCategory]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    const trimmed = query.trim();
    if (trimmed === '' && selectedCategory === '') {
      setValidationError('Masukkan keyword atau pilih kategori');
      return;
    }
    if (trimmed !== '' && trimmed.length < 3) {
      setValidationError('Keyword minimal 3 karakter');
      return;
    }
    setValidationError('');
    runSearch(trimmed, selectedCategory);
  };

  const handleCategoryPress = (catName) => {
    setSelectedCategory((prev) => (prev === catName ? '' : catName));
  };

  const renderResult = useCallback(({ item }) => (
    <SearchCard
      title={item.strMeal}
      image={item.strMealThumb}
      category={item.strCategory || selectedCategory}
      area={item.strArea || ''}
      onPress={() => navigation.navigate('DetailScreen', { idMeal: item.idMeal })}
    />
  ), [selectedCategory]);

  const renderEmpty = () => {
    if (loading) return null;
    if (!hasSearched) return (
      <View style={styles.emptyState}>
        <FontAwesome name="cutlery" size={56} color="#d5e5ef" />
        <Text style={styles.emptyTitle}>Mulai pencarian</Text>
        <Text style={styles.emptyText}>
          Ketik nama resep atau pilih kategori di atas
        </Text>
      </View>
    );
    if (error) return (
      <View style={styles.emptyState}>
        <FontAwesome name="wifi" size={56} color="#d5e5ef" />
        <Text style={styles.emptyTitle}>Gagal memuat data</Text>
        <Text style={styles.emptyText}>{error}</Text>
      </View>
    );
    return (
      <View style={styles.emptyState}>
        <FontAwesome name="search" size={56} color="#d5e5ef" />
        <Text style={styles.emptyTitle}>Resep tidak ditemukan</Text>
        <Text style={styles.emptyText}>Coba kata kunci atau kategori lain</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4faff" />
      <HeaderHome />
      {/* Bagian Header Search */}
      <View style={styles.topSection}>
        <View style={styles.subHeader}>
          <Text style={styles.title}>Cari Resep</Text>
          <Text style={styles.subtitle}>Temukan resep yang kamu suka</Text>
        </View>

        {/* Bagian Search Bar */}
        <View style={styles.searchRow}>
          <View style={[styles.inputWrapper, validationError ? styles.inputError : null]}>
            <FontAwesome
              name="search"
              size={18}
              color={validationError ? '#e53935' : '#8d7168'}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Cari nama resep..."
              placeholderTextColor="#bbb"
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                if (text.trim() === '') setValidationError('');
              }}
              returnKeyType="search"
              onSubmitEditing={handleSubmit}
            />
            {query.length > 0 && (
              <TouchableOpacity
                onPress={() => { setQuery(''); setValidationError(''); }}
              >
                <FontAwesome name="times-circle" size={18} color="#bbb" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.searchBtnText}>Cari</Text>
          </TouchableOpacity>
        </View>

        {/* Pesan Error */}
        {validationError ? (
          <Text style={styles.validationError}>{validationError}</Text>
        ) : null}

        {/* Bagian Chip Kategori */}
        {categories.length > 0 && (
          <View style={styles.chipsSection}>
            <Text style={styles.chipsLabel}>Filter Kategori</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
              keyboardShouldPersistTaps="handled"
            >
              {categories.map((cat) => (
                <CategoryChip
                  key={cat.idCategory}
                  label={cat.strCategory}
                  active={selectedCategory === cat.strCategory}
                  onPress={() => handleCategoryPress(cat.strCategory)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Tampilkan Hasil Pencarian */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6b35" />
          <Text style={styles.loadingText}>Mencari resep...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderResult}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4faff',
  },

  topSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#f4faff',
  },
  subHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0e1d25',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#594139',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(213,229,239,0.8)',
    paddingHorizontal: 12,
    height: 48,
    elevation: 1,
    shadowColor: '#0e1d25',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  inputError: {
    borderColor: '#e53935',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0e1d25',
    paddingVertical: 0,
  },
  searchBtn: {
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  validationError: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 4,
  },

  chipsSection: {
    marginTop: 12,
    marginBottom: 4,
  },
  chipsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#594139',
    marginBottom: 8,
  },
  chipsRow: {
    paddingBottom: 4,
  },

  resultCount: {
    fontSize: 13,
    color: '#8d7168',
    marginTop: 8,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    flexGrow: 1,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#8d7168',
    fontSize: 14,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0e1d25',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#8d7168',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
