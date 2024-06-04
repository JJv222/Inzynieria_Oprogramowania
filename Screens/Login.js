import { StyleSheet, View, Text, TextInput, Button, Platform, KeyboardAvoidingView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateLoginForm = () => {
        let errors = {};
        if (!username) errors.username = "Username is required";
        if (!password) errors.password = "Password is required";
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }
    ////////////////////////////////////////////////Test API CALL///////////////////////////////////////////////////////////////////////////////////////////
    const [posts, setPosts] = useState([]);
    const fetchData = async () => { 
        try {
            const response = await fetch('https://e455-37-30-28-103.ngrok-free.app/api/User/GetAuth=lisa_brown');
            const data = await response.json();
            console.log(data); // Debug: log the data to check the structure
            setPosts([data]); // Wrap the data in an array
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = () => {
        if (validateLoginForm()) {
            alert("Successful Login");
            setUsername('');
            setPassword('');
            setErrors({});
        } else {
            alert("Invalid Login");
        }
    }

    return (
        <KeyboardAvoidingView
            behavior="padding" 
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}   
        >
            <View style={styles.form}>
                <Text style={styles.title}>Welcome, Please log in!!</Text>
                <TextInput 
                    placeholder="Username" 
                    value={username} 
                    onChangeText={setUsername} 
                    style={styles.label} 
                />
                {errors.username && <Text style={styles.error}>{errors.username}</Text>}

                <TextInput 
                    placeholder="Password" 
                    value={password} 
                    secureTextEntry={true} 
                    onChangeText={setPassword} 
                    style={styles.label} 
                />
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                <Button title="Login" onPress={handleSubmit} />




                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text style={styles.postTitle}>{item.username}</Text>
                            <Text style={styles.postBody}>{item.password}</Text>
                        </View>
                    )}
                />




            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 25,
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        justifyContent: 'center',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    postContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postBody: {
        fontSize: 16,
    },
});
