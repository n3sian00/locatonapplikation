import React, { useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import { AuthProvider, AuthContext } from './firebase/AuthController';
import LoginScreen from './components/Login';
import MapScreen from './components/Map';
import AddLocation from './components/AddLocation';
import LocationList from './components/Locations';
import Capitals from './components/Capitals';
import Header from './components/Header';

console.log(process.env.API_KEY)

const Tab = createBottomTabNavigator();

const MainApp = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <LoginScreen />;
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView /> 
            <Header /> 
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: { backgroundColor: '#f8f8f8' },
                        tabBarActiveTintColor: 'black',
                        headerShown: false,
                    }}
                >
                    <Tab.Screen
                        name='Locations'
                        component={LocationList}
                        options={{ tabBarIcon: () => <Icon source='map-marker' size={24} /> }}
                    />
                    <Tab.Screen
                        name='Add location'
                        component={AddLocation}
                        options={{ tabBarIcon: () => <Icon source='plus-circle' size={24} /> }}
                    />
                    <Tab.Screen
                        name='Map'
                        component={MapScreen}
                        options={{ tabBarIcon: () => <Icon source='map' size={24} /> }}
                    />
                    <Tab.Screen
                        name='Capitals'
                        component={Capitals}
                        options={{ tabBarIcon: () => <Icon source='flag' size={24} /> }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    );
}