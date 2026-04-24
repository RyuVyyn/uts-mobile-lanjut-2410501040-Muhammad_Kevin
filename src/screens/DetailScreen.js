import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchRecipeDetailAPI } from '../api/API';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Favorite } from '../store/Favorite';

export default function DetailScreen({ route, navigation }) {
  // Menerima ID resep dari parameter navigasi HomeScreen
  const { idMeal } = route.params || {};

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Zustand untuk favorite
  const favorites = Favorite((state) => state.favorites);
  const addFavorite = Favorite((state) => state.addFavorite);
  const removeFavorite = Favorite((state) => state.removeFavorite);
  const isFavorite = favorites.some((item) => item.idMeal === idMeal);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setError(false);
        const meal = await fetchRecipeDetailAPI(idMeal);
        if (meal) {
          setRecipe(meal);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (idMeal) {
      fetchRecipeDetail();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [idMeal]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  const getIngredients = () => {
    if (!recipe) return [];
    let ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredientsList.push({
          name: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return ingredientsList;
  };

  const getInstructions = () => {
    if (!recipe || !recipe.strInstructions) return [];
    return recipe.strInstructions
      .split('\n')
      .filter((step) => step.trim().length > 0);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Loading recipe details...</Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Oops! Something went wrong.</Text>
        <Text style={styles.errorMessage}>Gagal memuat data</Text>
        <TouchableOpacity style={styles.backButtonError} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const ingredients = getIngredients();
  const instructions = getInstructions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="chevron-left" size={24} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 24, color: isFavorite ? '#FF6B35' : '#949c95' }}>
              {isFavorite ? <FontAwesome name="heart" size={24} color="#FF6B35" /> : <FontAwesome name="heart-o" size={24} color="#FF6B35" /> }
            </Text>
          </TouchableOpacity>

          <View style={styles.imageOverlay} />
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.strArea}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.strCategory}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Header Info */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{recipe.strMeal}</Text>
          </View>

          {/* Bagian Bahan Bahan */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Bahan-Bahan</Text>
            </View>
            <View style={styles.card}>
              {ingredients.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={styles.ingredientRow}
                  >
                    <View style={[styles.ingredientTextContainer, index !== ingredients.length - 1 && styles.borderBottom]}>
                      <Text style={styles.ingredientName}>
                        {item.name}
                      </Text>
                      <Text style={styles.ingredientMeasure}>
                        {item.measure}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Bagian cara membuat */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Cara Membuat</Text>
            </View>
            <View style={styles.instructionsContainer}>
              {instructions.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.stepIndicatorContainer}>
                    <View style={styles.stepNumberContainer}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    {index !== instructions.length - 1 && <View style={styles.stepLine} />}
                  </View>
                  <View style={styles.stepTextContainer}>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4faff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4faff',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#594139',
  },
  errorIcon: { fontSize: 40, marginBottom: 8 },
  errorTitle: { fontSize: 20, fontWeight: '600', color: '#93000a', marginBottom: 8 },
  errorMessage: { fontSize: 16, color: '#93000a', marginBottom: 16 },
  backButtonError: {
    backgroundColor: '#0e1d25', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: '80%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badgesContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(244, 250, 255, 0.9)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0e1d25',
  },
  contentContainer: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0e1d25',
    lineHeight: 38,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#daebf5',
    alignSelf: 'flex-start',
    paddingBottom: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0e1d25',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  ingredientTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#d5e5ef',
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0e1d25',
    flex: 1,
  },
  ingredientMeasure: {
    fontSize: 14,
    color: '#594139',
    textAlign: 'right',
    marginLeft: 16,
  },
  instructionsContainer: {
    paddingLeft: 8,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#d5e5ef',
    marginTop: 8,
  },
  stepTextContainer: {
    flex: 1,
    paddingBottom: 8,
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#594139',
  },
});