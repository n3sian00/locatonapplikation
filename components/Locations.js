import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../firebase/AuthController';
import { db } from '../firebase/FirebaseConfig';

// Komponentti, joka hakee ja näyttää käyttäjän lisäämät sijainnit Firestoresta

const Locations = () => {
  const { user } = useContext(AuthContext);
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'locations'), where('user', '==', user.email)); // Hakee firestoresta kirjautuneen käyttäjän lisäämät sijainnit

    const unsubscribe = onSnapshot(q, (querySnapshot) => { // Päivittää tiedot reaaliaikaisesti
      const locationsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locationsArray);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your locations</Text>

      <FlatList // Näyttää sijainnit listana
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity // Voi klikata sijaintia siirtyäkseen karttanäkymään (Tai ainaki pitäisi)
            style={styles.locationItem}
            onPress={() => navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude })}> 
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Rating: {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Locations;