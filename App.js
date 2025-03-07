import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './firebase/AuthController';
import { Icon } from 'react-native-paper';
import LoginScreen from './components/Login';
import MapScreen from './components/Map';
import AddLocation from './components/AddLocation';
import LocationList from './components/Locations';
import Capitals from './components/Capitals';

const Tab = createBottomTabNavigator();

const MainApp = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <LoginScreen />;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "" } }}>
                <Tab.Screen
                    name='Locations'
                    component={LocationList}
                    options={{ tabBarIcon: () => <Icon source="map-marker" size={24} /> }}
                />
                <Tab.Screen
                    name='Add Location'
                    component={AddLocation}
                    options={{ tabBarIcon: () => <Icon source="plus-circle" size={24} /> }}
                />
                <Tab.Screen
                    name='Map'
                    component={MapScreen}
                    options={{ tabBarIcon: () => <Icon source="map" size={24} /> }}
                />
                <Tab.Screen
                    name='Capitals'
                    component={Capitals}
                    options={{ tabBarIcon: () => <Icon source="flag" size={24} /> }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    );
}