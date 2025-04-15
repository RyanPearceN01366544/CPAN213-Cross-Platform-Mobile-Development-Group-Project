import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPmTime, setStartingWeekday } from "../redux/actions";

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const userSettings = useSelector((state) => state.userRoot.settings);

    return ( // Todo: Add Checkbox.
        <View style={styles.base}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Use AM/PM Time?: </Text>
                    <TouchableOpacity
                        onPress={() => dispatch(setPmTime(!userSettings.usePmTime))}
                        style={styles.checkBox}
                    >
                        <MaterialIcons
                            name={userSettings.usePmTime ? "check-box" : "check-box-outline-blank"}
                            size={24}
                            color={"#821800"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Starting Day: </Text>
                    <Picker
                        value={userSettings.useStartingDay}
                        onValueChange={(v) => dispatch(setStartingWeekday(v))}
                        style={styles.picker}
                        textStyle={styles.pickerText}
                    >
                        <Picker.Item
                            key={"Sunday"}
                            label={"Sunday"}
                            value={"Sunday"}
                        />
                        <Picker.Item
                            key={"Monday"}
                            label="Monday"
                            value={"Monday"}
                        />
                        <Picker.Item
                            key={"Tuesday"}
                            label="Tuesday"
                            value={"Tuesday"}
                        />
                        <Picker.Item
                            key={"Wednesday"}
                            label="Wednesday"
                            value={"Wednesday"}
                        />
                        <Picker.Item
                            key={"Thursday"}
                            label="Thursday"
                            value={"Thursday"}
                        />
                        <Picker.Item
                            key={"Friday"}
                            label="Friday"
                            value={"Friday"}
                        />
                        <Picker.Item
                            key={"Saturday"}
                            label="Saturday"
                            value={"Saturday"}
                        />
                    </Picker>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: "center"
    },
    container: {
        width: "90%",
        backgroundColor: "#ff5733",
        borderRadius: 5,
    },
    inputContainer: {
        backgroundColor: "#c72400",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 3,
        padding: 5,
        borderRadius: 5,
    },
    inputText: {
        color: "white",
    },
    checkBox: {
        backgroundColor: "#ff5733",
        color: "white",
    },
    picker: {
        backgroundColor: "#ff5733",
        color: 'white',
        width: "70%",
        height: "97%",
    },
    pickerText: {
        color: "white",
        fontSize: 10,
    },
})
export default SettingsScreen;