import database from "@react-native-firebase/database";
import { useState, useEffect, } from 'react';
import firestore from '@react-native-firebase/firestore';

 
export async function addNotification(userId, notification) {
  try {
    const newNotificationRef = database()
      .ref(`users/${userId}/notifications`)
      .push();
    await newNotificationRef.set(notification); // Use 'set' directly on the reference
    console.log("Notification added successfully!");
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
}


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



export async function markNotificationAsRead(userId, notificationId) {
  const notificationRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notificationId);

  try {
    await notificationRef.update({ isRead: true });
    console.log("Notification marked as read!");
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error; // You can rethrow the error or handle it further based on your use case
  }
}














// Function to fetch unread notifications for a user
export async function getUnreadNotifications(userId) {
  return database()
    .ref(`users/${userId}/notifications`)
    .orderByChild("isRead")
    .equalTo(false) // Only get notifications that are unread
    .once("value")
    .then((snapshot) => {
      const unreadNotifications = snapshot.val();
      console.log("Unread notifications:", unreadNotifications);
      return unreadNotifications;
    })
    .catch((error) => {
      console.error("Error fetching unread notifications:", error);
      throw error;
    });
}

// Function to delete a notification
export async function deleteNotification(userId, notificationId) {
  const notificationRef = database().ref(
    `users/${userId}/notifications/${notificationId}`
  );
  return notificationRef
    .remove()
    .then(() => {
      console.log("Notification deleted!");
    })
    .catch((error) => {
      console.error("Error deleting notification:", error);
      throw error;
    });
}
