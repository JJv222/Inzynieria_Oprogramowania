import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert, Button } from 'react-native';
import LoginForm from './Screens/Login';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <LoginForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
