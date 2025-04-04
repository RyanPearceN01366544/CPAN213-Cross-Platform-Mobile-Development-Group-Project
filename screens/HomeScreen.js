import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;
