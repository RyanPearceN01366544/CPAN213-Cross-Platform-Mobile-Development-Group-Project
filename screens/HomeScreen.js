import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Workout Plan</Text>
      <Text style={styles.subtitle}>Stay consistent, stay strong!</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Calendar")}>
        <Ionicons name="calendar" size={24} color="white" />
        <Text style={styles.buttonText}>Go to Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tasks")}>
        <Ionicons name="list" size={24} color="white" />
        <Text style={styles.buttonText}>Go to Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings" size={24} color="white" />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff5733", 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#bdbdbd",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff5733",
    padding: 15,
    borderRadius: 12,
    width: "85%",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#ff5733",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HomeScreen;
