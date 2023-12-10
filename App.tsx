// Import necessary React components and hooks
import React, { useState, useEffect } from 'react';
// Import components from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
// Import Firebase authentication functions and User type
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
// Import AsyncStorage for local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import screen components
import Home from './screens/Home';
import Settings from './screens/Settings';
import Login from './screens/Login';
// Import Firebase configuration (assuming it's in './constants/firebase')
import './constants/firebase';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// Define screen options for the bottom tab navigator
const ScreenOptions = {
  tabBarStyle: { backgroundColor: '#111' },
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: '#bbb',
  headerShown: false,
};

// Main App component
export default function App() {
  // State hook to manage the user authentication state
  const [user, setUser] = useState<User | null>(null);
  // Get the authentication instance
  const auth = getAuth();

  // Effect hook to run on component mount and manage user authentication
  useEffect(() => {
    // Function to check user authentication status
    const checkUserAuthentication = async () => {
      // Check AsyncStorage for user data
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Set the user state
        setUser(parsedUser);
      }
    };

    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Set the user state
      setUser(user);
      if (user) {
        // Save user data to AsyncStorage upon login
        AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        // Remove user data from AsyncStorage upon logout
        AsyncStorage.removeItem('user');
      }
    });

    // Check user authentication on component mount
    checkUserAuthentication();

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]); // Dependencies array to re-run the effect when auth changes

  // If there is no user, navigate to the login screen
  if (!user) {
    return <Login />;
  }

  // Render the main app structure with React Navigation
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={ScreenOptions}>
        {/* Home screen */}
        <Tab.Screen
          name="Home"
          // Pass the user prop to the Home screen
          children={()=><Home user={user}/>}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              // Icon for the Home tab
              <Ionicons name="md-home-outline" size={size} color={color} />
            ),
          }}
        />
        {/* Settings screen */}
        <Tab.Screen
          name="Settings"
          // Pass the user prop to the Settings screen
          children={()=><Settings user={user}/>}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              // Icon for the Settings tab
              <Ionicons name="md-cog-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
