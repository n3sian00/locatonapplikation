import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function MapScreen() {
  const route = useRoute();
  const { latitude, longitude } = route.params || {};
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude || userLocation?.latitude || 65.0,
          longitude: longitude || userLocation?.longitude || 25.0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && !latitude && !longitude && (
          <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} />
        )}
        {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
      </MapView>
    </View>
  );
}