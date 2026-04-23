import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: recipe.strMealThumb }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {recipe.strMeal}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#d5e5ef',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardTitleContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0e1d25',
    textAlign: 'center',
  },
});
