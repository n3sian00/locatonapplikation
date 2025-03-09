import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AuthContext } from '../firebase/AuthController';
import { auth } from '../firebase/FirebaseConfig';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async () => { // sisään kirjautuminen
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Firebase Auth metodi sisään kirjautumiseen
      setUser(userCredential.user);
    } catch (error) {
      console.error('Login error', error.message);
    }
  };

  const handleLogout = async () => { // Uloskirjautuminen
    try {
      await signOut(auth); //  Firebase Auth metodi uloskirjautumiseen
      setUser(null);
    } catch (error) {
      console.error('Logout error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {user.email}</Text>
          <Button title='Logout' onPress={handleLogout} color='black' />
        </>
      ) : (
        <>
          <Text style={styles.header}>Login</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder='Enter email'
            keyboardType='email-address' />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder='Enter password'/>
          <Button title='Login' onPress={handleLogin} color='black' />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default Login;