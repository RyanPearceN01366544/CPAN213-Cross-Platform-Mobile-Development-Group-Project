import {
    SET_USE_PM,
    SET_STARTING_WEEKDAY,

    FETCH_SCHEDULE_NODES,
    ADD_SCHEDULE_NODE,
    EDIT_SCHEDULE_NODE,
    DELETE_SCHEDULE_NODE,
} from "./actionTypes"

import { db } from '../config/firebaseConfig';
import { 
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
  } from 'firebase/firestore';

const workoutCollection = "workout_schedule";
const collectionRef = collection(db, workoutCollection);

// == NON-FIRESTORE FUNCTIONS ==
export const setPmTime = (value) => ({
    type: SET_USE_PM,
    payload: value
});
export const setStartingWeekday = (value) => ({
    type: SET_STARTING_WEEKDAY,
    payload: value
});

// == FIRESTORE FUNCTIONS ==
export const fetchScheduleNodes = () => dispatch => {
    try {
        const snapshotSchedule = onSnapshot(collectionRef, snapshot => {
            const scheduleList = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))

            dispatch(
                {
                    type: FETCH_SCHEDULE_NODES,
                    payload: scheduleList
                }
            )
        });
        return snapshotSchedule
    }
    catch (error) {
        console.log(error);
    }
};
export const addScheduleNode = (node) => async dispatch => {
    try {
        const docRef = await addDoc(collectionRef, node);
        console.log(`Data saved to docID: ${JSON.stringify(docRef.id)}, db: ${JSON.node}`);

        dispatch({
            type: ADD_SCHEDULE_NODE,
            payload: {
                id: docRef.id,
                ...node
            }
        })
    } catch (error) {
        console.error("Error adding schedule node: ", error);
    }
};
export const editScheduleNode = (updatedNode) => async dispathc => {
    try {
        console.log(`Trying to update scheduleNode to updatedNode = ${JSON.stringify(updatedNode)}`);
        const docRef = doc(collectionRef, updatedNode.id);
        const scheduleNode = getState().scheduleRoot.schedule.find(node => node.id === updatedNode.id);
        const scheduleNodeFilteredData = {}

        for (const [index, item] of Object.entries(updatedNode)) {
            if ((scheduleNode !== null && scheduleNode !== undefined) && index !== "id" && updatedNode[index] !== scheduleNode[index])
            {
                scheduleNodeFilteredData[index] = updatedNode[index];
            }
        }
        await updateDoc(docRef, scheduleNodeFilteredData);

        dispatch(
            {
                type: EDIT_SCHEDULE_NODE,
                payload: {
                    id: updatedNode.id,
                    updatedNode: updatedNode
                }
            }
        )
    } catch (error) {
        console.error("Error updating schedule node: ", error);
    }
};
export const deleteScheduleNode = (nodeID) => async dispatch => {
    try {
        const docRef = doc(collectionRef, docID)
        console.log("Deleting Schedule Node!");
        await deleteDoc(docRef);
        dispatch(
            {
                type: DELETE_SCHEDULE_NODE,
                payload: docID
            }
        )
        console.log("Schedule Node Deleted!");
    } catch (error) {
        console.error("Error deleting schedule node: ", error);
    }
};