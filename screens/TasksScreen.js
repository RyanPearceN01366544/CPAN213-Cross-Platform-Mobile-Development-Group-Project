import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, ScrollView, Animated } from "react-native";
import { db } from "../config/firebaseConfig"; // Updated import path
import { collection, addDoc, getDocs } from "firebase/firestore";

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
  {
    id: "3",
    title: "Yoga & Flexibility",
    details: [
      "Sun Salutations: 10 reps",
      "Downward Dog: Hold for 30 seconds",
      "Child's Pose: 1 minute",
      "Stretch: 10 minutes",
    ],
  },
  {
    id: "4",
    title: "Strength Training",
    details: [
      "Squats: 3 sets of 20",
      "Deadlifts: 3 sets of 15",
      "Lunges: 3 sets of 15",
      "Bench Press: 3 sets of 12",
    ],
  },
  {
    id: "5",
    title: "Basketball Training",
    details: [
      "Dribbling drills: 5 minutes",
      "Free throws: 10 attempts",
      "Layups: 3 sets of 15",
      "Passing drills: 5 minutes",
      "Shooting practice: 10 attempts",
    ],
  },
  {
    id: "6",
    title: "Soccer Drills",
    details: [
      "Passing: 3 sets of 10 passes",
      "Dribbling: 5 minutes",
      "Shooting: 10 attempts",
      "Short sprints: 5 rounds",
      "Endurance running: 15 minutes",
    ],
  },
  {
    id: "7",
    title: "Tennis Practice",
    details: [
      "Forehand: 20 reps",
      "Backhand: 20 reps",
      "Serve practice: 10 attempts",
      "Volley drills: 10 minutes",
      "Footwork drills: 5 minutes",
    ],
  },
  {
    id: "8",
    title: "Football Training",
    details: [
      "Passing drills: 3 sets of 10 passes",
      "Tackling drills: 5 minutes",
      "Sprints: 5 rounds",
      "Agility ladder drills: 10 minutes",
      "Touchdown practice: 10 attempts",
    ],
  },
];

const TasksScreen = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState({}); // Keeps track of selected day per task
  const [startHour, setStartHour] = useState(""); // Start time hour input
  const [startMinute, setStartMinute] = useState(""); // Start time minute input
  const [duration, setDuration] = useState(""); // Duration input in minutes
  const [expandedTask, setExpandedTask] = useState(null); // To track expanded task for details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
        });
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTaskChange = (taskId, field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (taskId) => {
    const task = taskData[taskId];

    if (!task || !task.day || !task.hour || !task.minute || !task.duration) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        taskId,
        day: task.day,
        hour: parseInt(task.hour),
        minute: parseInt(task.minute),
        duration: parseInt(task.duration),
        createdAt: new Date(),
      });

      alert("Task saved successfully!");
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task.");
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
    <Animated.View style={[styles.detailsContainer, { opacity: animation }]}>
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
          value={taskData[task.id]?.hour || ""}
          onChangeText={(text) => handleTaskChange(task.id, "hour", text)}
        />
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="Minute"
          value={taskData[task.id]?.minute || ""}
          onChangeText={(text) => handleTaskChange(task.id, "minute", text)}
        />
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="Duration (mins)"
          value={taskData[task.id]?.duration || ""}
          onChangeText={(text) => handleTaskChange(task.id, "duration", text)}
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

  const toggleTaskExpansion = (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setExpandedTask(taskId);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your Workout</Text>

      <FlatList
        data={allTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => toggleTaskExpansion(item.id)}>
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
    backgroundColor: "#1e1e1e", // Dark background for contrast
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff5733",
    marginBottom: 30,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  taskItem: {
    backgroundColor: "#333", // Darker background for task cards
    padding: 20,
    borderRadius: 15,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
    overflow: "hidden",
  },
  taskTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  expandButton: {
    color: "#ff5733",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailText: {
    color: "#ddd",
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
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  daySelectionContainer: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  daySelectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    fontWeight: "bold",
  },
  dayButton: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginRight: 12,
    borderRadius: 8,
  },
  dayButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDayButton: {
    backgroundColor: "#ff5733",
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

