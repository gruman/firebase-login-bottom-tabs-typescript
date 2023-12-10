// Import necessary components from React Native
import { StyleSheet, Text, View, Pressable } from 'react-native';
// Import Firebase authentication functions and User type
import { getAuth, signOut, User } from 'firebase/auth';

// Define the interface for the screen props
interface ScreenProps {
  user: User;
}

// Home component receives user as a prop and displays settings information
const Home: React.FC<ScreenProps> = ({ user }) => {
  // Get the authentication instance
  const auth = getAuth();

  return (
    <View style={styles.container}>
      {/* Pressable component for logout functionality */}
      <Pressable
        style={styles.itemContainer}
        onPress={() => signOut(auth)}>
        {/* Display the logout text */}
        <Text style={styles.name}>Logout of Home</Text>
      </Pressable>
      {/* Display the UID of the logged-in user */}
      <Text style={styles.uid}>UID: {user.uid}</Text>
    </View>
  );
};

// Stylesheet for the Settings component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  // Style for the container of the Pressable component
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 5
  },
  // Style for the name text
  name: {
    fontSize: 18
  },
  // Style for the UID text
  uid: {
    fontSize: 15,
    marginTop: 20
  }
});

// Export the Home component as the default export
export default Home;
