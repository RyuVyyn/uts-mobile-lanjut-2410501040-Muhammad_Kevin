import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  TouchableOpacity, 
  Image, 
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchRandomMealsAPI } from '../api/API';
import Loading from '../components/Loading';
import Error from '../components/Error';
import RecipeCard from '../components/RecipeCard';
import HeaderHome from '../components/HeaderHome';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  const [randomMeals, setRandomMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchRandomMeals = async () => {
    try {
      setError(false);
      const meals = await fetchRandomMealsAPI(10);
      setRandomMeals(meals);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRandomMeals();
  };

  const handleMealPress = (mealId) => {
    navigation.navigate('DetailScreen', { idMeal: mealId });
  };

  const renderMeal = ({ item }) => (
    <RecipeCard 
      recipe={item} 
      onPress={() => handleMealPress(item.idMeal)}
    />
  );

  const renderHeader = () => (
    <View style={styles.subHeader}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.subtitle}>Makanan yang mungkin kamu sukai</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      
      <HeaderHome />

      <View style={styles.container}>
        {loading ? (
          <Loading label="Loading meals..." />
        ) : error ? (
          <Error message="Gagal memuat data" onRetry={fetchRandomMeals} />
        ) : (
          <FlatList
            data={randomMeals}
            keyExtractor={(item) => item.idMeal}
            renderItem={renderMeal}
            numColumns={2}
            ListHeaderComponent={renderHeader}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                colors={['#FF6B35']}
                tintColor="#FF6B35"
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4faff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
    paddingTop: 16,
  },
  subHeader: {
    marginBottom: 24,
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
