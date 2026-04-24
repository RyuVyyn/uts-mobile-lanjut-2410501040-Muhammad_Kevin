import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HeaderHome() {
  return (
    <View style={styles.topAppBar}>
      <View style={styles.headerLeft}>
        <Text style={styles.logoText}>ResepKita</Text>
      </View>
      <View style={styles.headerRight}>
        <FontAwesome name="search" size={24} color="#FF6B35" />
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../../assets/profilePicture.jpg')} 
            style={styles.avatar} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topAppBar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 228, 231, 0.6)',
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF6B35',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1bfb5',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
