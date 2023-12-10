import { StyleSheet, Text, View, Pressable } from 'react-native';
import { getAuth, signOut, User } from 'firebase/auth';
interface ScreenProps {
  user: User;
}
const Settings: React.FC<ScreenProps> = ({ user }) => {
  const auth = getAuth();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.itemContainer}
        onPress={() => signOut(auth)}>
        <Text style={styles.name}>Logout of Settings</Text>
      </Pressable>
      <Text style={styles.uid}>UID: {user.uid}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 5
  },
  name: {
    fontSize: 18
  },
  uid: {
    fontSize: 15,
    marginTop: 20
  }
});

export default Settings;
