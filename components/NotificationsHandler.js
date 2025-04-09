import * as Notifications from "expo-notifications"; // Shows on the website so I'm assuming this is how you import it.
import { useEffect } from "react";

// -- NOTE!!!
// For some unexplainable reason... This won't work with the Expo Go application properly. Apparently, you'd have to build and run the APK or use expo-dev-client which turns it into a website
// which isn't right. So it rests here as the actual notification works on Expo Go, just not timed ones as any notification requests will automatically play instantly, no matter how long you set it.
// I tried to build it with Expo but when I downloaded and installed the APK, it appeared as nothing despite it being the android version.
// Regardless, I'll leave it in here for you to read and/or maybe use if we figure out why the build isn't working.

const requestNotifcationPermissions = async () => {
    const {status} = await Notifications.requestPermissionsAsync();
    if (status !== "granted"){
        Alert.alert("Permission Denied!", "Notifications won't work without permission!");
    }
    else if (status === "granted") {
        console.log("Permission Granted!");
    }
} 

export const notificationsSetup = () => {
    useEffect(() => {
        console.log("Waiting Permissions...");
        if (requestNotifcationPermissions()) {
            Notifications.setNotificationHandler({
                handleNotification: async() => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                })
            })
        }
    }, [])
}

export const fetchAllNotifications = async(title, desc, trigger) => {
    const notifications = Notifications.getAllScheduledNotificationsAsync();
    console.log(notifications);
    return notifications;
}

export const createNotification = async(title, desc, trigger_) => {
    console.log("-- Attempting to create notification --", "Title: ", title, "\nDescription: ", desc, "\nTrigger(s): ", trigger_);
    try{
        const id = await Notifications.scheduleNotificationAsync({
            content:{
                title: title,
                body: desc,
            },
            trigger: trigger_, // Just adding the trigger settings.
            // Should be called properly as trigger should be an object.
            /* -- Just In-Case Options --
            This is a bunch of trigger options in case I forget them and notes on what they are.
            date (Date) -> This will play the notification on that specific date. (Don't use with repeats or weekly.)
            weekday (int) -> This is called on the specific weekday where Saturday is 0 and Sunday is 7. (Don't use with date.)
            hour (int) -> This will play the notification on the hour for that day.
            minute (int) -> This will play the notification on the minute of the hour of the day.
            seconds (int) -> This will play the notification on the second of the minute of the hour of the day.
            repeats (bool) -> This will repeat the alarm. (Don't use with Date as Date is a one time use.)
            */
        });
        console.log("Notification Scheduled: ", id);
        return id; // So that the notification ID can be added to the firestore.
    }
    catch(err_){
        console.log("Error!: ", err_);
    }
}

export const destroyNotification = async (notificationID) => {
    await Notifications.cancelScheduledNotificationAsync(notificationID);
    console.log(`Notification ${notificationID} is Now Canceled!`);
}

export const destroyAllNotifications = async() => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("All Notifications Canceled!");
}