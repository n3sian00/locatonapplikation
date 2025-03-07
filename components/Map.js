import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const route = useRoute();
  const selectedLocation = route.params?.location;

  useEffect(() => {
    (async () => {
      if (selectedLocation) {
        setCurrentLocation({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        });
      } else {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied');
          return;
        }
        let userLocation = await Location.getCurrentPositionAsync({});
        setCurrentLocation(userLocation.coords);
      }
    })();
  }, [selectedLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation?.latitude || 65.0,
          longitude: currentLocation?.longitude || 25.0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker 
            coordinate={{ 
              latitude: currentLocation.latitude, 
              longitude: currentLocation.longitude 
            }} 
            title={selectedLocation ? selectedLocation.location : 'Your Location'} 
          />
        )}
      </MapView>
    </View>
  );
}