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
        <View>
            <View>
                <Text>Use AM/PM Time?: </Text>
                <TouchableOpacity
                    onPress={() => dispatch(setPmTime(!userSettings.usePmTime))}
                >
                    <MaterialIcons
                        name={userSettings.usePmTime ? "check-box" : "check-box-outline-blank"}
                        size={24}
                        color={"black"}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text>Starting Day: </Text>
                <Picker
                    value={userSettings.useStartingDay}
                    onValueChange={(v) => dispatch(setStartingWeekday(v))}
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
    )
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: "black",
        borderColor: "#ff5733",
        borderWidth: 2,
    },
    checkBox: {
        backgroundColor: "#ff5733",
        color: "white",
    },
    picker: {
        backgroundColor: "#ff5733",
        color: 'white',
    },
})
export default SettingsScreen;