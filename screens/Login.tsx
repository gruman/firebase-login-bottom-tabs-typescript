import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,User} from "firebase/auth";

export default function App() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleCreate = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
    } else {
      setErrorMessage("Please fill out both fields.");
    }
  }

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
    } else {
      setErrorMessage("Please fill out both fields.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account or login.</Text>
      {errorMessage && <Text>{errorMessage}</Text>}
      <TextInput
       style={styles.textInput}
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholder="Email"
      />
      <TextInput
       style={styles.textInput}
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder="Password"
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable  style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 18
  },
  buttonText: {
    fontSize: 18
  },
  textInput: {
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
    borderColor: "#999",
    borderWidth: 1,
    width: "50%"
  },
  button: {
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
    borderColor: "#999",
    borderWidth: 1,
  }
});
