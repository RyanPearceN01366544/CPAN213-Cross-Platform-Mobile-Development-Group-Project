import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Picker, TextInput, Button } from "react-native";

const allTasks = [
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
  // Other tasks...
];

const TasksScreen = () => {
  const [selectedDay, setSelectedDay] = useState({}); // Keeps track of selected day per task
  const [startHour, setStartHour] = useState(""); // Start time hour input
  const [startMinute, setStartMinute] = useState(""); // Start time minute input
  const [duration, setDuration] = useState(""); // Duration input in minutes
  const [expandedTask, setExpandedTask] = useState(null); // To track expanded task for details

  const handleDayChange = (taskId, day) => {
    setSelectedDay((prev) => ({
      ...prev,
      [taskId]: day,
    }));
  };

  const handleTimeChange = (field, value) => {
    if (field === "hour") {
      setStartHour(value);
    } else if (field === "minute") {
      setStartMinute(value);
    } else if (field === "duration") {
      setDuration(value);
    }
  };

  const handleSave = (taskId) => {
    // Handle Firestore Add Logic here with the selected day, time, and duration
    console.log("Saving task with data:", {
      taskId,
      day: selectedDay[taskId],
      hour: startHour,
      minute: startMinute,
      duration,
    });
    // You would save this information to Firestore or wherever needed
  };

  const renderTaskDetails = (task) => (
    <View style={styles.detailsContainer}>
      {task.details.map((detail, index) => (
        <Text key={index} style={styles.detailText}>
          - {detail}
        </Text>
      ))}
      <View style={styles.timeInputContainer}>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="Hour"
          value={startHour}
          onChangeText={(text) => handleTimeChange("hour", text)}
        />
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="Minute"
          value={startMinute}
          onChangeText={(text) => handleTimeChange("minute", text)}
        />
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="Duration (mins)"
          value={duration}
          onChangeText={(text) => handleTimeChange("duration", text)}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDay[task.id] || "Monday"}
          style={styles.picker}
          onValueChange={(day) => handleDayChange(task.id, day)}
        >
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </View>
      <Button title="Save" onPress={() => handleSave(task.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your Workout</Text>

      <FlatList
        data={allTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => setExpandedTask(expandedTask === item.id ? null : item.id)}>
              <Text style={styles.expandButton}>{expandedTask === item.id ? "Hide Details" : "Show Details"}</Text>
            </TouchableOpacity>
            {expandedTask === item.id && renderTaskDetails(item)}
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
  taskTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  expandButton: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
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
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeInput: {
    backgroundColor: "#fff",
    width: "30%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 5,
  },
  pickerContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#ff5733",
  },
});

export default TasksScreen;
