import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Error({ message = 'Gagal memuat data', onRetry }) {
  return (
    <View style={styles.errorContainer}>
      <FontAwesome name="warning" size={40} color="#93000a" />
      <Text style={styles.errorTitle}>Oops! Something went wrong.</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffdad6',
    borderRadius: 12,
    padding: 24,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#ba1a1a',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#93000a',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#93000a',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ba1a1a',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
