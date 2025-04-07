import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

const temporaryData = [
    {
        id: "temp",
        title: "Test",
        weekday: 1,
        startTime: new Date(new Date().setHours(6)),
        endTime: new Date(new Date().setHours(7))
    },
    {
        id: "temp2",
        title: "Tes2",
        weekday: 1,
        startTime: new Date(new Date().setHours(10)),
        endTime: new Date(new Date().setHours(11))
    }
]

export const pmTime = true; // This will determine if we're showing the time in AM/PM or military time. (13:00, 20:00, etc.)

const CalendarScreen = () => {
    const [timeNodes, setTimeNodes] = useState([]);
    // -- Todo -- 
    // 1. Make styles to make calendar look good.
    // 2. Make temporary variables for testing.
    // 3. Connect to Firebase

    useEffect(() => {
        setTimeNodes(temporaryData);
    }, [])

    const TimeGutter = () => {
        let hours = [""];
        for (let x_ = 0; x_ < 24; x_++){
            if (x_ < 12){
                if (x_ === 0){
                    hours.push("12 AM");
                }
                else{
                    hours.push(x_ + " AM");
                }
            }
            else{
                if (x_ === 12){
                    hours.push("12 PM");
                }
                else {
                    hours.push(x_ - 12 + " PM");
                }
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
    const TimeHandler = ({weekday}) => {
        // TODO: Impliment code that grabs nodes based on hour first.
        // TODO: Maybe impliment per 15 minutes later.
        const times = [];        
        for (let x_ = 0; x_ < 24; x_++) {
            times.push(x_);
        }
        let continuingNode_ = false;
        let x_ = 0; // Just so the key issue doesn't happen for empty nodes.

        return(
            <View>
                {
                    times.map((hour) => {
                        let nodeFound_ = timeNodes.find((node_) => node_.startTime.getHours() === hour && weekday == node_.weekday);
                        if (nodeFound_){
                            if (!continuingNode_ && timeNodes.find((node_) => node_.startTime.getHours() + 1 === hour + 1)){
                                continuingNode_ = true;
                                return <TimeNode key={nodeFound_.id} id={nodeFound_.id} piece={1}/>
                            }
                            else if (continuingNode_ && timeNodes.find((node_) => node_.startTime.getHours() + 1 === hour + 1)){
                                return <TimeNode key={nodeFound_.id} id={nodeFound_.id} piece={2}/>
                            }
                            else if (continuingNode_ && !timeNodes.find((node_) => node_.startTime.getHours() + 1 === hour + 1)){
                                continuingNode_ = false;
                                return <TimeNode key={nodeFound_.id} id={nodeFound_.id} piece={3}/>
                            }
                            else{
                                console.log(node_.startTime.getHours(), "!==", hour + 1);
                                return <TimeNode id={nodeFound_.id}/>
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
    const TimeNode = ({id = undefined, piece = 0}) => { // pieces: 0 = full, 1 = top, 2 = middle, 3 = end
        // This will either make a node that's filled out or it will make an empty node.
        // Regardless, I can make the size of each node however big or small as I'd like
        // which is very helpful for something like this.
        // Though, I need to make it so there's an image for the times.

        if (id) { // This will fill out the data for that space.
            switch(piece){
                case 0: {
                    return(
                        <View style={styles.timeNodeFull}>
                            (id !== undefined &&                            
                                <Text>ID: {id}</Text>
                            ):(
                                <Text>Empty</Text>
                            )
                        </View>
                    )
                }
                case 1: {
                    return(
                        <View style={styles.timeNodeTop}>
                            <Text>ID: {id}</Text>
                        </View>
                    )
                }
                case 2: {
                    return(
                        <View style={styles.timeNodeMiddle}>
                            <Text>ID: {id}</Text>
                        </View>
                    )
                }
                case 3: {
                    return(
                        <View style={styles.timeNodeBottom}>
                            <Text>ID: {id}</Text>
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
            case 4: weekday_ = "Thrusday";  break;
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

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.weekdayScroll} contentContainerStyle={{flexDirection: "column"}}>
                <ScrollView contentContainerStyle={{flexDirection: "row"}} horizontal>
                    <TimeGutter style={styles.timeGutterView}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={0}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={1}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={2}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={3}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={4}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={5}/>
                    <WeekdayNode style={styles.weekdayNodeView} weekday={6}/>
                </ScrollView>
            </ScrollView>
        </View>
    )
}

const nodeHeight = 25; // The height of each node.
const nodeColor = "orange"; // The color of each node.
const weekdayFontSize = 15; // The fontsize of the weekdays' text.
const styles = StyleSheet.create({
    weekdayScroll: {
        flex: 1,
    },
    weekdayNodeView: {
        flexDirection: 'column',
    },
    timeGutterView: {
        flexDirection: 'column',
        height: 44 + (nodeHeight * 24),
        width: 50,
    },
    timeGutterEmptySpace: {
        marginBottom: weekdayFontSize,
    },
    timeGutterText: {
        height: nodeHeight,
        fontSize: 12,
        textAlign: "right",
        paddingRight: 5,
    },
    weekdayText: {
        textDecorationLine: "underline",
        fontSize: weekdayFontSize,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    timeNodeFull: {
        height: nodeHeight,
        borderWidth: 1,
        borderColor: "black",
    },
    timeNodeTop: {
        height: nodeHeight,
        backgroundColor: nodeColor,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "black",
    },
    timeNodeMiddle: {
        height: nodeHeight,
        backgroundColor: nodeColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: "black",
    },
    timeNodeBottom: {
        height: nodeHeight,
        backgroundColor: nodeColor,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "black",
    }
});

export default CalendarScreen;