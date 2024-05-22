import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/Login';
import OrderListScreen from './screens/OrderListScreen';
import MapScreen from './screens/MapScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import PersonalScreen from './screens/PersonalScreen';
import CameraScreen from './screens/CameraScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { Ionicons } from '@expo/vector-icons';

function MainScreen() {
    return (
        <Tab.Navigator initialRouteName="OrderList">
            <Tab.Screen 
                name="Danh sách vận đơn" 
                component={OrderListScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Thống kê" 
                component={StatisticsScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Cá nhân" 
                component={PersonalScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name="CameraScreen" component={CameraScreen} /> */}
                {/* <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Chụp ảnh' }}/> */}
                <Stack.Screen name="NotificationScreen" component={NotificationScreen}     options={{ title: 'Thông báo' }} />
                <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Bảo trì' }}/>
                <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />
                <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
                <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen}  options={{title: 'Đổi mật khẩu'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}