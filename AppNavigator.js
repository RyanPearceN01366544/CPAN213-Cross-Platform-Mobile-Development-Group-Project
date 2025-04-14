import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import TaskScreen from './screens/TasksScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [pathName, setPathName] = useState("");

  const MainTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Tasks') {
              iconName = 'list';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Tasks" component={TaskScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  };

  const handleTabName = (state) => {
    const route_ = state.routes.find(r => r.name === 'Main');
    const currentTab_ = getFocusedRouteNameFromRoute(route_);
    setPathName(currentTab_);
  }

  return (
    <NavigationContainer onStateChange={handleTabName}>
      <Stack.Navigator screenOptions={() => ({ headerShown: true, title: (pathName || "Home") })}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
