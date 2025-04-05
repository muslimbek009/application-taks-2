import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function ActivityA() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");

  // Send data to Activity B using params
  const sendDataToActivityB = () => {
    router.push({
      pathname: "/activityB",
      params: {
        firstName,
        lastName,
        phoneNumber,
        email,
        age: parseInt(age) || 0,
        address,
        occupation,
      },
    });
  };

  // Check if required fields are filled
  const isFormValid = firstName && lastName && phoneNumber && email && age;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Activity A</Text>
      <Text style={styles.subtitle}>Enter User Information</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Home Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={sendDataToActivityB}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Send Data to Activity B</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000000",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#000000",
  },
  fieldGroup: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#ffffff",
    borderLeftWidth: 3,
    borderLeftColor: "#cc0000",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#cc0000",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#cc0000",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ffcccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
