import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

const temporaryData = [
    {
        id: "temp",
        title: "Test",
        weekday: 1,
        startTime: new Date(),
        endTime: new Date().setHours(new Date().getHours() + 1)
    },
    {
        id: "temp2",
        title: "Tes2",
        weekday: 1,
        startTime: new Date().setHours(new Date().getHours + 3),
        endTime: new Date().setHours(new Date().getHours() + 4)
    }
]

export const pmTime = true; // This will determine if we're showing the time in AM/PM or military time. (13:00, 20:00, etc.)

const CallendarScreen = () => {
    const [timeNodes, setTimeNodes] = useState([]);
    // -- Todo -- 
    // 1. Make styles to make calendar look good.
    // 2. Make temporary variables for testing.
    // 3. Connect to Firebase

    useEffect(() => {
        setTimeNodes(temporaryData);
    }, [])


    const timeHandler = () => {
        // TODO: Impliment code that grabs nodes based on hour first.
        // TODO: Maybe impliment per 15 minutes later.
        const times = [];        
        for (let x_ = 0; x_ < 24; x_++) {
            times.push(x_);
        }
        let continuingNode_ = false;
        return(
            <View>
                {
                    times.map((hour) => {
                        let nodeFound_ = timesNodes.find((node_) => node_.getHours() === hour);
                        if (nodeFound_){
                            if (!continuingNode_ && timeNodes.find((node_) => node_.getHours() + 1 === hour + 1)){
                                return <timeNode id={nodeFound_.id} piece={1}/>
                            }
                            else if (continuingNode_ && timeNode.find((node_) => node_.getHours() + 1 === hour + 1)){
                                return <timeNode id={nodeFound_.id} piece={2}/>
                            }
                            else if (continuingNode_ && !timeNode.find((node_) => node_.getHours() + 1 === hour + 1)){
                                return <timeNode id={nodeFound_.id} piece={3}/>
                            }
                            else{
                                return <timeNode id={nodeFound_.id}/>
                            }
                        }
                        else {
                            return <timeNode/>
                        }
                    })
                }
            </View>
        )
    }
    const timeNode = (id = undefined, piece = 0) => { // pieces: 0 = full, 1 = top, 2 = middle, 3 = end
        // This will either make a node that's filled out or it will make an empty node.
        // Regardless, I can make the size of each node however big or small as I'd like
        // which is very helpful for something like this.
        // Though, I need to make it so there's an image for the times.

        if (id) { // This will fill out the data for that space.
            switch(piece){
                case 0: {
                    return(
                        <View style={styles.timeNodeFull}>
                            <Text>ID: {id}</Text>
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
                <View style={styles.timeNodeView}/>
            )
        }
    }
    const weekdayNode = (weekday) => { // Will read the week and fill out per-day.
        // TODO: Swap out timeNodes with temporary variable that looks only for the node of the established week.
        return(
            <View>
                <Text>{weekday}</Text>
                (
                    <timeHandler/>
                )
            </View>
        )
    }

    return (
        <ScrollView>
            <Image src={"/"}>
                <weekdayNode weekday={0}/>
                <weekdayNode weekday={1}/>
                <weekdayNode weekday={2}/>
                <weekdayNode weekday={3}/>
                <weekdayNode weekday={4}/>
                <weekdayNode weekday={5}/>
                <weekdayNode weekday={6}/>
            </Image>
        </ScrollView>
    )
}

const nodeHeight = 20; // The height of each node.
const nodeColor = "orange"; // The color of each node.
const styles = StyleSheet.create({
    weekdayScroll: {
        flex: 1,
        height: "100%",
        width: "100%",
        flexGrow: true,
    },
    weekdayNodeView: {
        height: "100%",
    },
    timeNodeFull: {
        height: nodeHeight,
    },
    timeNodeTop: {
        height: nodeHeight,
        backgroundColor: nodeColor,
    },
    timeNodeMiddle: {
        height: nodeHeight,
        backgroundColor: nodeColor,
    },
    timeNodeBottom: {
        height: nodeHeight,
        backgroundColor: nodeColor,
    }
});

export default CallendarScreen;