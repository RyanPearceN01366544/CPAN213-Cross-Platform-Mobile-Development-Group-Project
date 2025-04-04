import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Workout Plan</Text>
      <Button title="Go to Calendar" onPress={() => navigation.navigate("Calendar")} />
      <Button title="Go to Tasks" onPress={() => navigation.navigate("Tasks")} />
      <Button title="Settings" onPress={() => navigation.navigate("Setting")} />
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
