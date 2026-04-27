import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4faff" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About App</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
             <Image 
                source={require('../../assets/profilePicture.jpg')} 
                style={styles.profileImage}
             />
          </View>
          <Text style={styles.name}>Muhammad Kevin</Text>
          <Text style={styles.nim}>2410501040</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="users" size={20} color="#FF6B35" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Kelas</Text>
              <Text style={styles.infoValue}>B</Text>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="tag" size={20} color="#FF6B35" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Tema Project</Text>
              <Text style={styles.infoValue}>Tema A (ResepKita)</Text>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="database" size={20} color="#FF6B35" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Credit API</Text>
              <Text style={styles.infoValue}>TheMealDB</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4faff',
  },
  container: { 
    flexGrow: 1, 
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0e1d25',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    padding: 5,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#0e1d25',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e1d25',
    marginBottom: 5,
  },
  nim: {
    fontSize: 16,
    color: '#8d7168',
    fontWeight: '600',
    letterSpacing: 1,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#0e1d25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff0eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#8d7168',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0e1d25',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f4f7',
    marginVertical: 4,
    marginLeft: 60,
  },
});
export default AboutScreen;