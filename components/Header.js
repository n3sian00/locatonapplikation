import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../firebase/AuthController';
import { auth } from '../firebase/FirebaseConfig';
import { MaterialIcons } from '@expo/vector-icons'; // Lisää tämä rivi

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error', error.message);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.userContainer}>
          <MaterialIcons name='person' size={20} color='#fff' />
          <Text style={styles.userText}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  userContainer: {
    flexDirection: 'row', // Ikoni ja teksti vierekkäin
    alignItems: 'center',
  },
  userText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5, // Jättää pienen välin ikonille
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});

export default Header;
