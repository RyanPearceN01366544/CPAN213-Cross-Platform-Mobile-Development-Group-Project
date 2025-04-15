import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteScheduleNode } from "../redux/actions";


const ViewCalendarNodeScreen = ({route, navigation}) => {
    const {id} = route.params;
    const dispatch = useDispatch();
    const data = useSelector((state) => (state.scheduleRoot.schedule).find((node) => node.id === id));
    const userSettings = useSelector((state) => state.userRoot.settings);

    function handleWeekday(weekday){
        switch (weekday)
        {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: return "NULL";
        }
    };
    function formatMinutes(minute){
        if (minute == 0) { return "00"; }
        if (minute < 10) { return "0" + minute; }
        return minute;
    };
    function handleTimeFormat(hour, minute = undefined){
        if (userSettings.usePmTime) {
            if (hour >= 12) { // PM
                if (minute !== undefined){
                    return (hour - 12) === 0 ? `12:${formatMinutes(minute)} PM` : `${hour}:${formatMinutes(minute)} PM`;
                }
                else{
                    return (hour - 12) === 0 ? `12 PM` : `${hour} PM`;
                }
            }
            else { // AM
                return hour === 0 ? `12:${formatMinutes(minute)} AM` : `${hour}:${formatMinutes(minute)} AM`;
            }
        }
        else {
            return hour + ":" + minute;
        }
    };
    function handleDelete() {
        Alert.alert("Confirm Deletion?", "Are you sure you want to delete this?", [
            {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                    dispatch(deleteScheduleNode(data.id), navigation.goBack());
                }
            },
            {
                text: "No",
                style: "cancel"
            }
        ]);
    }

    return(
        <View style={styles.base}>
            { data ? (
            <View style={styles.container}>
                    <Text style={styles.title}>{data.title}</Text>
                    <ScrollView style={styles.detailsContainer} contentContainerStyle={styles.detailsContainer}>
                        {
                            data.details.map((detail, id) => {
                                return <Text key={id} style={styles.details}>{id + 1}. {detail}</Text>
                            })
                        }
                    </ScrollView>
                    <Text style={styles.time}>{handleWeekday(data.weekday)}: {handleTimeFormat(data.startTimeHour, data.startTimeMinute)} - {handleTimeFormat(data.endTimeHour, data.endTimeMinute)}</Text>
            </View>
            ) : 
            (
                <View style={styles.container}>
                    <Text style={styles.title}>Loading...</Text>
                </View>
            )}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {handleDelete()}}
                >
                    <Text style={{color: "white"}}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    container: {
        backgroundColor: "#ff5733",
        width: "90%",
        paddingBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    detailsContainer: {
        backgroundColor: "#c72400",
        width: "90%",
        padding: 5
    },
    title: {
        color: "white",
        fontSize: 30,
        marginBottom: 5,
    },
    details: {
        color: "white",
        fontSize: 15,
    },
    time: {
        color: "white",
        fontSize: 12,
        fontStyle: "italic",
        marginTop: 10
    },
    buttonsContainer: {
        width: "90%",
        height: "5%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#ff5733",
        width: "45%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    }
})
export default ViewCalendarNodeScreen;