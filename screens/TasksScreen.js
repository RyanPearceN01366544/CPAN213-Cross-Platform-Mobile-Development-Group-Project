import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { addScheduleNode } from "../redux/actions";
import { useDispatch } from "react-redux";

const allTasks = [
  {
    id: "0",
    title: "Morning Workout",
    details: [
      "Warm-up: 5 minutes jogging",
      "Push-ups: 3 sets of 15",
      "Sit-ups: 3 sets of 20",
      "Plank: 1 minute",
    ],
  },
  {
    id: "1",
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
  const dispatch = useDispatch();
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
    const startHourNum = Number.parseInt(startHour);
    const startMinuteNum = Number.parseInt(startMinute);
    let endTimeHour = startHourNum + Math.floor(duration / 60);
    let endTimeMinute = (duration % 60);
    endTimeMinute = endTimeMinute + startMinuteNum;

    
    if (endTimeMinute >= 60) {
      endTimeHour++;
      endTimeMinute -= 60;
    }

    const data = {
      title: allTasks[taskId].title,
      details: allTasks[taskId].details,
      weekday: selectedDay[taskId],
      startTimeHour: startHourNum,
      startTimeMinute: startMinuteNum,
      endTimeHour: endTimeHour,
      endTimeMinute: endTimeMinute
    };
    dispatch(addScheduleNode(data));
    console.log("Saving task with data:", data);
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
          <Picker.Item label="Monday" value={1} />
          <Picker.Item label="Tuesday" value={2} />
          <Picker.Item label="Wednesday" value={3} />
          <Picker.Item label="Thursday" value={4} />
          <Picker.Item label="Friday" value={5} />
          <Picker.Item label="Saturday" value={6} />
          <Picker.Item label="Sunday" value={0} />
        </Picker>
      </View>
      <TouchableOpacity 
        onPress={() => {
          handleSave(task.id); Alert.alert("Task Added!", "The task that you have selected has been added!");
        }} 
        style={styles.saveButton}
      >
        <Text style={{color: "white"}}>SAVE</Text>  
      </TouchableOpacity>
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
  saveButton: {
    backgroundColor: "#de3000",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "white",
    shadowColor: "black",
    shadowRadius: 5,
    elevation: 5,
  }
});

export default TasksScreen;
