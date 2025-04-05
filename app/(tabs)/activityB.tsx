import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ActivityB() {
  // Receive data from params
  const params = useLocalSearchParams();
  const firstName = params.firstName as string;
  const lastName = params.lastName as string;
  const phoneNumber = params.phoneNumber as string;
  const email = params.email as string;
  const age = params.age as string;
  const address = params.address as string;
  const occupation = params.occupation as string;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Activity B</Text>
      <Text style={styles.subtitle}>Received User Information:</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>First Name:</Text>
            <Text style={styles.infoValue}>{firstName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Name:</Text>
            <Text style={styles.infoValue}>{lastName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>{age}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <Text style={styles.infoValue}>{phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{address}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#cc0000",
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#cc0000",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#cc0000",
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontWeight: "bold",
    width: "40%",
    fontSize: 16,
    color: "#000000",
  },
  infoValue: {
    width: "60%",
    fontSize: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: "#cc0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
