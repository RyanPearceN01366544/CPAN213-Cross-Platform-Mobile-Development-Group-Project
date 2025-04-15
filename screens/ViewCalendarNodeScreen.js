import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";


const ViewCalendarNodeScreen = ({route, navigation}) => {
    const {id} = route.params;
    const data = useSelector((state) => (state.scheduleRoot.schedule).find((node) => node.id === id));

    useEffect(() => {
        console.log(data);
    }, [])

    return(
        <View style={styles.base}>
            <View style={styles.container}>
                <Text style={styles.title}>{data.title}</Text>
                <View style={styles.detailsContainer}>
                    {
                        data.details.map(({task, index}) => (
                            <Text>{index + 1}. {task}</Text>
                        )) 
                    }
                </View>
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
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    detailsContainer: {
        backgroundColor: "#c72400",
    },
    title: {
        color: "white",
        fontSize: 30,
    },
    details: {
        color: "white",
        fontSize: 20,
    },
    time: {
        color: "white",
        fontSize: 10,
        fontStyle: "italic",
    }
})
export default ViewCalendarNodeScreen;