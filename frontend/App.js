import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import store from './src/redux/store';

// Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import EmployeeScreen from './src/screens/employee/EmployeeScreen';
import LeaveScreen from './src/screens/leave/LeaveScreen';
import PermissionScreen from './src/screens/permission/PermissionScreen';
import AttendanceScreen from './src/screens/attendance/AttendanceScreen';
import ReportScreen from './src/screens/report/ReportScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2196F3',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'الرئيسية',
          tabBarLabel: 'الرئيسية',
        }}
      />
      <Tab.Screen
        name="Employee"
        component={EmployeeScreen}
        options={{
          title: 'الموظفون',
          tabBarLabel: 'الموظفون',
        }}
      />
      <Tab.Screen
        name="Leave"
        component={LeaveScreen}
        options={{
          title: 'الإجازات',
          tabBarLabel: 'الإجازات',
        }}
      />
      <Tab.Screen
        name="Permission"
        component={PermissionScreen}
        options={{
          title: 'الأذونات',
          tabBarLabel: 'الأذونات',
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: 'التقارير',
          tabBarLabel: 'التقارير',
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = ({ isLoggedIn }) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigator isLoggedIn={false} />
      </PaperProvider>
    </Provider>
  );
}
