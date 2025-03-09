import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../firebase/AuthController';
import { auth } from '../firebase/FirebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

// Komponentti, joka näyttää yläpalkin jossa näkyy kirjautuneen säpö sekä uloskirjautumisen mahdollisuus
// Header komponentti integroitu Map, Locations, AddLocation ja Capitals sivuille, että yläpalkki näkyy jokaisessa näkymässä

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => { // Uloskirjautuminen
    try {
      await signOut(auth); // käyttää firebase auth (signout auth) funktiota käyttäjän uloskirjautumiseen
      setUser(null); // Käyttäjä palaa kirjautumissivulle
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5, 
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});

export default Header;
