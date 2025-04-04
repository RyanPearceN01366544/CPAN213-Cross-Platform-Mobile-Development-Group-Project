import { useState } from "react";
import { Text, View } from "react-native"

const CallendarScreen = () => {
    const [timeNodes, setTimeNodes] = useState();
    // -- Todo -- 
    // 1. Make styles to make calendar look good.
    // 2. Make temporary variables for testing.
    // 3. COnnect to Firebase

    const emptyTimeComponent = () => { // Todo: Make block still extend out.
        return(
            <View></View>
        )
    }
    const timeComponent = (id) => {
        
        return(
            <View>

            </View>
        )
    }
    function isTimeEmpty(endTime)
    {
        let beginLengthHour = 0; // The hour of the next timeComponent.
        let beginLengthMinute = 0; // The minute of the next timeComponent.

        
    }
    const weekComponent = (weekday) => { // Will read the week and fill out per-day.
        
        return(
            <View>
                <Text>{weekday}</Text>
                {
                    timeNodes.map((node) => {
                        
                    })
                }
            </View>
        )
    }

    return (
        <View>
            <View>
                
            </View>
        </View>
    )
}
export default CallendarScreen;