import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/Login';
import OrderListScreen from './screens/OrderListScreen';
import MapScreen from './screens/MapScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import PersonalScreen from './screens/PersonalScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreen() {
    return (
        <Tab.Navigator initialRouteName="OrderList">
            <Tab.Screen name="Danh sách vận đơn" component={OrderListScreen} />
            <Tab.Screen name="Bản đồ" component={MapScreen} />
            <Tab.Screen name="Thống kê" component={StatisticsScreen} />
            <Tab.Screen name="Cá nhân" component={PersonalScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}