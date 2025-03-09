import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

// Komponentti, joka näyttää karttanäkymän

export default function MapScreen() { // Hakee (tai ainakin pitäisi hakea) valitun sijainnin tai käyttäjän nykyisen sijainnin
  const route = useRoute();
  const { latitude, longitude } = route.params || {};
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => { // Pyytä lupaa käyttäjän sijainnin käyttämiseen
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({}); // Tallentaa nykyisen sijainnin
      setUserLocation(location.coords);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}> 
      <MapView // Näyttää kartan ja ainakin pitäisi näyttää valitun lokaation sijainti(?)
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude || userLocation?.latitude || 65.0,
          longitude: longitude || userLocation?.longitude || 25.0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && !latitude && !longitude && ( // Näyttää käyttäjän nykyisen sijainnin markerina, jos sijaintia ei ole valittu
          <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} />
        )}
        {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
      </MapView>
    </View>
  );
}