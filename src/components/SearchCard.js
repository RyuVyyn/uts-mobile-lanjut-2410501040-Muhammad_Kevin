import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SearchCard({
  title = '',
  image,
  category = '',
  area = '',
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}
      </View>

      <View style={styles.info}>
        {category ? (
          <View style={styles.categoryBadge}>
            <FontAwesome name="tag" size={11} color="#ab3500" />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ) : null}

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.hintRow}>
          <Text style={styles.hintText}>Lihat detail</Text>
          <FontAwesome name="chevron-right" size={12} color="#ff6b35" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    height: 110,
    borderWidth: 1,
    borderColor: 'rgba(213,229,239,0.6)',
    elevation: 2,
    shadowColor: '#0e1d25',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  imageWrapper: {
    width: '30%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: '#e0f0fb',
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'center',
    gap: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  categoryText: {
    fontSize: 11,
    color: '#ab3500',
    fontWeight: '600',
    marginLeft: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0e1d25',
    lineHeight: 20,
  },
  areaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  areaText: {
    fontSize: 11,
    color: '#8d7168',
    marginLeft: 2,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  hintText: {
    fontSize: 11,
    color: '#ff6b35',
    fontWeight: '600',
  },
});