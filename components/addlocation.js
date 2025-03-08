import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import { AuthContext } from '../firebase/AuthController';
import * as Location from 'expo-location';

const AddLocation = () => {
  const { user } = useContext(AuthContext);
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const handleAddLocation = async () => {
    let userLocation = await Location.getCurrentPositionAsync({});

    try {
      if (!locationName.trim() || !description.trim() || !rating.trim()) {
        throw new Error('Fill in all fields');
      }

      await addDoc(collection(db, 'locations'), {
        user: user.email,
        name: locationName.trim(),
        description: description.trim(),
        rating: parseInt(rating),
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        createdAt: new Date(),
      });

      Alert.alert('Location added successfully');
      setLocationName('');
      setDescription('');
      setRating('');
    } catch (error) {
      console.error('Error adding location', error);
      Alert.alert(error.message || 'Failed to add location');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new location</Text>

      <TextInput
        style={styles.input}
        placeholder='Location name'
        value={locationName}
        onChangeText={setLocationName}
      />

      <TextInput
        style={styles.input}
        placeholder='Description'
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder='Rating 1-5'
        value={rating}
        onChangeText={setRating}
        keyboardType='numeric'
      />

      <Button title='Add location' onPress={handleAddLocation} color='black' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
});

export default AddLocation;