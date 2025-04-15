import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduleNodes } from "../redux/actions";

let emptyNodeKey = 0; // Just for empty nodes to have a key to prevent errors.
const CalendarScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const userSettings = useSelector((state) => state.userRoot.settings);
    const calendarSchedule = useSelector((state) => state.scheduleRoot.schedule);
    const [scheduleFormatted, setScheduleFormatted] = useState([]);

    // -- Todo -- 
    // 1. Make styles to make calendar look good. (WIP)
    // 2. Make temporary variables for testing. (Done)
    // 3. Connect to Firebase (Done)

    useEffect(() => {
        const scheduleSubscription_ = dispatch(fetchScheduleNodes());
        return () => scheduleSubscription_();
    }, [dispatch]);

    useEffect(() => {
        setScheduleFormatted(calendarSchedule);
    }, [calendarSchedule])

    function formatMinutes(minute){
        if (minute == 0) { return "00"; }
        if (minute < 10) { return "0" + minute; }
        return minute;
    }
    function handleTimeFormat(hour, minute = undefined){
        if (userSettings.usePmTime) {
            if (hour >= 12) { // PM
                if (minute !== undefined){
                    return (hour - 12) === 0 ? `12:${formatMinutes(minute)} PM` : `${hour - 12}:${formatMinutes(minute)} PM`;
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
            return hour + ":" + formatMinutes(minute);
        }
    }

    const TimeGutter = () => {
        let hours = [""];
        for (let x_ = 0; x_ < 24; x_++){
            hours.push(handleTimeFormat(x_, 0))
        }
        return(
            <View style={styles.timeGutterView}>
                {
                    hours.map((hour, index) => {
                        if (hour !== ""){
                            return(
                                <Text key={index} style={styles.timeGutterText}>
                                    {hour}
                                </Text>
                            )
                        }
                        else{
                            return(
                                <Text key={index} style={styles.timeGutterEmptySpace}>
                                    {hour}
                                </Text>
                            )
                        }
                    })
                }
            </View>
        )
    }
    const TimeNode = ({id = undefined, piece = 0}) => { // pieces: 0 = full, 1 = top, 2 = middle, 3 = end
        // This will either make a node that's filled out or it will make an empty node.
        // Regardless, I can make the size of each node however big or small as I'd like
        // which is very helpful for something like this.
        // Though, I need to make it so there's an image for the times.

        if (id) { // This will fill out the data for that space.
            const node_ = scheduleFormatted.find((obj_) => obj_.id === id)
            switch(piece){
                case 0: {
                    return(
                        <TouchableOpacity style={styles.timeNodeFull} onPress={() => navigation.navigate("View Task", {id: id})}>
                            <Text style={styles.timeNodeTitle}>{node_.title}</Text>
                            <Text style={styles.timeNodeTime}>{handleTimeFormat(node_.startTimeHour, node_.startTimeMinute)} - {handleTimeFormat(node_.endTimeHour, node_.endTimeMinute)}</Text>
                        </TouchableOpacity>
                    )
                }
                case 1: {
                    return(
                        <TouchableOpacity style={styles.timeNodeTop} onPress={() => navigation.navigate("View Task", {id: id})}>
                            <Text style={styles.timeNodeTitle}>{node_.title}</Text>
                        </TouchableOpacity>
                    )
                }
                case 2: {
                    return(
                        <TouchableOpacity style={styles.timeNodeMiddle} onPress={() => navigation.navigate("View Task", {id: id})}/>
                    )
                }
                case 3: {
                    return(
                        <View TouchableOpacity style={styles.timeNodeBottom} onPress={() => navigation.navigate("View Task", {id: id})}>
                                <Text style={styles.timeNodeTime}>{handleTimeFormat(node_.startTimeHour, node_.startTimeMinute)} - {handleTimeFormat(node_.endTimeHour, node_.endTimeMinute)}</Text>
                        </View>
                    )
                }
            }
        }
        else // This will make an empty space for the hour.
        {
            return(
                <View style={styles.timeNodeEmpty}/>
            )
        }
    }
    const WeekdayNode = ({weekday}) => { // Will read the week and fill out per-day.
        // TODO: Swap out timeNodes with temporary variable that looks only for the node of the established week.
        let weekday_ = "";
        switch (weekday)
        {
            case 0: weekday_ = "Sunday"; break;
            case 1: weekday_ = "Monday"; break;
            case 2: weekday_ = "Tuesday"; break;
            case 3: weekday_ = "Wednesday"; break;
            case 4: weekday_ = "Thursday";  break;
            case 5: weekday_ = "Friday"; break;
            case 6: weekday_ = 'Saturday'; break;
            default: weekday_ = "ERROR"; break;
        }

        return(
            <View style={styles.weekdayNodeView}>
                <Text style={styles.weekdayText}>{weekday_}</Text>
                <TimeHandler key={weekday} weekday={weekday}/>
            </View>
        )
    }
    const TimeHandler = ({weekday}) => {
        // TODO: Impliment code that grabs nodes based on hour first.
        // TODO: Maybe impliment per 15 minutes later.
        const times = [];        
        for (let x_ = 0; x_ < 24; x_++) {
            times.push(x_);
        }
        let x_ = 0; // Just so the key issue doesn't happen for empty nodes.

        return(
            <View>
                {
                    times.map((hour) => {
                        const nodeFound_ = scheduleFormatted.find((node_) => node_.weekday == weekday && node_.startTimeHour <= hour && node_.endTimeHour > hour);
                        if (nodeFound_){
                            /*
                            if (!continuingNode_ && timeNodes.find((node_) => node_.startTimeHour + 1 === hour + 1)){
                                continuingNode_ = true; // Temporary Boolean I used to use.
                                return <TimeNode key={nodeFound_.id} id={nodeFound_.id} piece={1}/>
                            }
                            else if (continuingNode_ && timeNodes.find((node_) => node_.startTimeHour + 1 === hour + 1)){
                                return <TimeNode key={nodeFound_.id} id={nodeFound_.id} piece={2}/>
                            }
                            else if (continuingNode_ && !timeNodes.find((node_) => node_.startTimeHour + 1 === hour + 1)){
                                continuingNode_ = false;
                                return <TimeNode key={nodeFound_.id} id={nodeFound_.id} piece={3}/>
                            }
                            else{
                                console.log(node_.startTimeHour, "!==", hour + 1);
                                return <TimeNode id={nodeFound_.id}/>
                            }
                            */
                            const duration_ = (nodeFound_.endTimeHour - nodeFound_.startTimeHour);
                            
                            if (duration_ === 1){
                                emptyNodeKey++;
                                return <TimeNode key={"emptyNode#" + emptyNodeKey} id={nodeFound_.id}/>
                            }
                            else if (hour === nodeFound_.startTimeHour){
                                return <TimeNode key={nodeFound_.id + 'h' + hour} id={nodeFound_.id} piece={1}/>
                            }
                            else if (hour === nodeFound_.endTimeHour - 1){
                                return <TimeNode key={nodeFound_.id + 'h' + hour} id={nodeFound_.id} piece={3}/>
                            }
                            else{
                                return <TimeNode key={nodeFound_.id + 'h' + hour} id={nodeFound_.id} piece={2}/>
                            }
                        }
                        else {
                            x_++;
                            return <TimeNode key={x_} id={undefined} piece={0}/>
                        }
                    })
                }
            </View>
        )
    }
    const WeekdayHandler = () => {
        const weekdaysSimplified = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentDay_ = weekdaysSimplified.indexOf(userSettings.useStartingDay);
        let newOrder = [];

        while (newOrder.length < 7) {
            newOrder.push(currentDay_);
            currentDay_++;
            if (currentDay_ >= 7){
                currentDay_ = 0;
            }
        }
        // Example: "Friday" = 5 -> [5, 6, 0, 1, 2, 3, 4]

        // Apparently it wasn't rending in row??? CSS confuses me sometimes.
        return(
            <View style={{flexDirection: "row"}}>
                {
                    newOrder.map((num_, index_) => (
                        <WeekdayNode style={styles.weekdayNodeView} key={num_} weekday={num_}/>
                    ))
                }
            </View>
        )
    }

   return(
        <View style={styles.mainContainer}>
            {scheduleFormatted ? (
                <View style={styles.weekdayScroll}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexDirection: "row" }}>
                        <ScrollView contentContainerStyle={{ minHeight: nodeHeight * 25 }}>
                            <TimeGutter />
                        </ScrollView>
                        <ScrollView horizontal>
                            <ScrollView contentContainerStyle={{ flexDirection: "row", minHeight: nodeHeight * 25 }}>
                                <WeekdayHandler />
                            </ScrollView>
                        </ScrollView>
                    </ScrollView>
                </View>
                ) : 
                (
                    <Text>Loading...</Text>
                )
            }
        </View>
    )
}

const mainColor = "#ff5733"; // The color of the main theme.
const secondaryColor = "#c72400";
const nodeHeight = 50; // The height of each node.
const nodeWidth = 115; // The width of each node.
const gutterWidth = 75; // The width of the number gutter.
const weekdayFontSize = 15; // The fontsize of the weekdays' text.
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black", 
        height: "100%", 
        width: "100%", 
        alignItems: "center"
    },
    titleContainer: {
        paddingHorizontal: 5,
        backgroundColor: "#C0C0C0",
        marginTop: 10,
        borderWidth: 7,
        borderRadius: 6,
        borderColor: "#848884",
        shadowRadius: 2,
        shadowColor: "black",
        elevation: 5
    },
    title: {
        color: "white",
        fontSize: 30,
    },
    weekdayScroll: {
        flex: 1,
        backgroundColor: "black",
        margin: 5,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderWidth: 0.25,
        borderRadius: 6,
        borderColor: "black",
        shadowColor: "orange",
        shadowRadius: 5,
        elevation: 5,
    },
    weekdayNodeView: {
        flexDirection: 'column',
    },
    timeGutterView: {
        flexDirection: 'column',
        width: gutterWidth,
    },
    timeGutterEmptySpace: {
        height: nodeHeight,
        borderWidth: 1,
        borderColor: "white",
    },
    timeGutterText: {
        height: nodeHeight,
        color: "white",
        fontSize: 13,
        textAlign: "center",
        paddingRight: 10,
        borderWidth: 1,
        borderColor: "white",
    },
    weekdayText: {
        textDecorationLine: "underline",
        fontSize: weekdayFontSize,
        textAlign: "center",
        color: "white",
        height: nodeHeight,
        width: nodeWidth,
        borderWidth: 1,
        borderColor: "white",
    },
    timeNodeTitle: {
        fontSize: 15,
        color: "white",
    },
    timeNodeTime: {
        fontSize: 11,
        fontStyle: 'italic',
        color: "white",
    },
    timeNodeEmpty: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "dotted",
        borderColor: "white",
    },
    timeNodeFull: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderColor: "white",
    },
    timeNodeTop: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "white",
    },
    timeNodeMiddle: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: "white",
    },
    timeNodeBottom: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "white",
        justifyContent: "flex-end"
    }
});

export default CalendarScreen;