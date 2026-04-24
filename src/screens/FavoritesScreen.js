import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Favorite } from "../store/Favorite";
import FavoriteCard from "../components/FavoriteCard";
import HeaderHome from "../components/HeaderHome";

export default function FavoritesScreen({ navigation }) {
  const favorites = Favorite((state) => state.favorites);
  const removeFavorite = Favorite((state) => state.removeFavorite);

  const renderItem = ({ item }) => (
    <FavoriteCard
      item={item}
      onDelete={removeFavorite}
      onNavigateDetail={(idMeal) =>
        navigation.navigate("DetailScreen", { idMeal: idMeal })
      }
    />
  );

  const renderHeader = () => (
    <View style={styles.subHeader}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Resep favorit mu</Text>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
        <HeaderHome />
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Belum ada resep favorit</Text>
          <Text style={styles.emptyText}>
            Mulai menjelajahi resep dan tambahkan favoritmu
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <HeaderHome />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4faff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 16,
  },
  subHeader: {
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0e1d25",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#594139",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    color: "#666",
    marginTop: 8,
  },
});