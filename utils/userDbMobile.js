import database from "@react-native-firebase/database";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";


export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const notificationsRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('notifications');

    // Listen for real-time updates
    const unsubscribe = notificationsRef.onSnapshot(
      (snapshot) => {
        const notificationArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Notifications data:", notificationArray);
        setNotifications(notificationArray);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        setError(error);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId]);

  return { notifications, error };
}

export async function updateUserFields(userId, fields, onSuccess, onFailure) {
  if (!userId || !fields || typeof fields !== "object") {
    console.error("Invalid parameters. User ID and fields object are required.");
    return;
  }

  const userRef = firestore().collection("users").doc(userId);

  try {
    await userRef.update(fields);
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error(`Error updating field :`, error);
    if (onFailure) onFailure(error);
  }
}


  export function getUserData(userId) {
    const [user, setUser] = useState(null); // null to indicate no data initially
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!userId) return; // Exit early if no userId is provided

      const userRef = firestore().collection("users").doc(userId);

      // Listen for real-time updates
      const unsubscribe = userRef.onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            setUser({ id: snapshot.id, ...snapshot.data() });
          } else {
            console.error("User not found.");
            setError("User not found.");
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
          setError(error);
        }
      );

      // Cleanup listener on unmount
      return () => unsubscribe();
    }, [userId]);

    return { user, error };
  }

export async function markNotificationAsRead(userId, notificationId) {
  const notificationRef = firestore()
    .collection("users")
    .doc(userId)
    .collection("notifications")
    .doc(notificationId);

  try {
    await notificationRef.update({ isRead: true });
    console.log("Notification marked as read!");
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error; // You can rethrow the error or handle it further based on your use case
  }
}

