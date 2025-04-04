import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const tasks = [
  {
    id: "1",
    title: "Morning Workout",
    details: [
      "Warm-up: 5 minutes jogging",
      "Push-ups: 3 sets of 15",
      "Sit-ups: 3 sets of 20",
      "Plank: 1 minute",
    ],
  },
  {
    id: "2",
    title: "Cardio Session",
    details: [
      "30-minute jog",
      "10-minute high knees",
      "Jumping jacks: 3 sets of 30",
      "Cooldown: 5 minutes walking",
    ],
  },
  {
    id: "3",
    title: "Strength Training",
    details: [
      "Squats: 4 sets of 12",
      "Deadlifts: 4 sets of 10",
      "Dumbbell press: 3 sets of 15",
      "Lunges: 3 sets of 10 per leg",
    ],
  },
  {
    id: "4",
    title: "Evening Stretches",
    details: [
      "Hamstring stretch: 1 minute per leg",
      "Quad stretch: 1 minute per leg",
      "Triceps stretch: 1 minute",
      "Cat-cow stretch: 1 minute",
    ],
  },
];

const TasksScreen = () => {
  const [expandedTask, setExpandedTask] = useState(null);

  const toggleTaskDetails = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => toggleTaskDetails(item.id)}
              style={styles.taskHeader}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
            </TouchableOpacity>
            {expandedTask === item.id && (
              <View style={styles.detailsContainer}>
                {item.details.map((detail, index) => (
                  <Text key={index} style={styles.detailText}>
                    - {detail}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff5733", 
    marginBottom: 20,
    textAlign: "center",
  },
  taskItem: {
    backgroundColor: "#ff5733", 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#ff5733",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 10,
    paddingLeft: 15,
    paddingTop: 10,
  },
  detailText: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default TasksScreen;
