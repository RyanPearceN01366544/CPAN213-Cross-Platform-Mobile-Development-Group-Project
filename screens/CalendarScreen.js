import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduleNodes } from "../redux/actions";

const CalendarScreen = () => {
    const dispatch = useDispatch();
    const userSettings = useSelector((state) => state.userRoot.settings);
    const calendarSchedule = useSelector((state) => state.scheduleRoot.schedule);
    const [scheduleFormatted, setScheduleFormatted] = useState([]);

    // -- Todo -- 
    // 1. Make styles to make calendar look good. (WIP)
    // 2. Make temporary variables for testing. (Done)
    // 3. Connect to Firebase (WIP)

    useEffect(() => {
        const scheduleSubscription_ = dispatch(fetchScheduleNodes());
        return () => scheduleSubscription_();
    }, [dispatch]);

    useEffect(() => {
        setScheduleFormatted(calendarSchedule);
    }, [calendarSchedule])

    const TimeGutter = () => {
        let hours = [""];
        for (let x_ = 0; x_ < 24; x_++){
            if (userSettings.usePmTime) {
                if (x_ < 12) {
                    if (x_ === 0) {
                        hours.push("12 AM");
                    }
                    else {
                        hours.push(x_ + " AM");
                    }
                }
                else {
                    if (x_ === 12){
                        hours.push("12 PM");
                    }
                    else {
                        hours.push(x_ - 12 + " PM");
                    }
                }
            }
            else {
                hours.push(x_);
            }
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
                        <View style={styles.timeNodeFull}>
                            <View>                       
                                <Text>Title: {node_.title}</Text>
                                <Text>{node_.startTimeHour}:{node_.startTimeMinute} - {node_.endTimeHour}:{node_.endTimeMinute}</Text>
                            </View>
                        </View>
                    )
                }
                case 1: {
                    return(
                        <View style={styles.timeNodeTop}>
                            <Text>Title: {node_.title}</Text>
                        </View>
                    )
                }
                case 2: {
                    return(
                        <View style={styles.timeNodeMiddle}/>
                    )
                }
                case 3: {
                    return(
                        <View style={styles.timeNodeBottom}>
                            <Text>{node_.startTimeHour}:{node_.startTimeMinute} - {node_.endTimeHour}:{node_.endTimeMinute}</Text>
                        </View>
                    )
                }
            }
        }
        else // This will make an empty space for the hour.
        {
            return(
                <View style={styles.timeNodeFull}/>
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
                <TimeHandler weekday={weekday}/>
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
                            const duration_ = (nodeFound_.endTimeHour - nodeFound_.startHour);
                            if (duration_ === 1){
                                return <TimeNode id={nodeFound_.id}/>
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
    )
}

const nodeHeight = 25; // The height of each node.
const nodeWidth = 100; // The width of each node.
const nodeColor = "orange"; // The color of each node.
const weekdayFontSize = 15; // The fontsize of the weekdays' text.
const styles = StyleSheet.create({
    weekdayScroll: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 6,
        shadowColor: "black",
        shadowRadius: 5,
        elevation: 5,
    },
    weekdayNodeView: {
        flexDirection: 'column',
    },
    timeGutterView: {
        flexDirection: 'column',
        width: nodeWidth / 2,
    },
    timeGutterEmptySpace: {
        height: nodeHeight,
    },
    timeGutterText: {
        height: nodeHeight,
        fontSize: 12,
        textAlign: "right",
        paddingRight: 10,
        borderWidth: 1,
    },
    weekdayText: {
        textDecorationLine: "underline",
        fontSize: weekdayFontSize,
        textAlign: "center",
        height: nodeHeight,
        width: nodeWidth,
        borderWidth: 1,
    },
    timeNodeFull: {
        height: nodeHeight,
        width: nodeWidth,
        borderWidth: 1,
        borderColor: "black",
    },
    timeNodeTop: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: nodeColor,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "black",
    },
    timeNodeMiddle: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: nodeColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: "black",
    },
    timeNodeBottom: {
        height: nodeHeight,
        width: nodeWidth,
        backgroundColor: nodeColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "black",
    }
});

export default CalendarScreen;