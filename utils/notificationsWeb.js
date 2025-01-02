import { useEffect, useState } from "react";
import { getFirestore, collection, query, onSnapshot, addDoc, serverTimestamp,  doc, updateDoc } from "firebase/firestore";

export async function addNotification(userId, notification) {
    const db = getFirestore();
    const notificationsRef = collection(db, `users/${userId}/notifications`);
  
    try {
      const docRef = await addDoc(notificationsRef, {
        ...notification,
        timestamp: serverTimestamp(), // Firestore server timestamp
      });
      console.log("Notification added with ID:", docRef.id);
      return docRef.id; // Return the document ID if needed
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  }


export function useNotificationsWeb(userId) {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!userId) return;
  
      // Firestore instance
      const db = getFirestore();
      const notificationsRef = collection(db, `users/${userId}/notifications`);
  
      // Real-time listener
      const unsubscribe = onSnapshot(
        query(notificationsRef),
        (querySnapshot) => {
          const notificationsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Notifications fetched:", notificationsArray);
          setNotifications(notificationsArray);
        },
        (err) => {
          console.error("Error fetching notifications:", err);
          setError(err);
        }
      );
  
      // Cleanup listener on unmount
      return () => unsubscribe();
    }, [userId]);
  
    return { notifications, error };
  }


  export async function markNotificationAsReadWeb(userId, notificationId) {
    const db = getFirestore();
    const notificationRef = doc(db, `users/${userId}/notifications/${notificationId}`);
  
    try {
      await updateDoc(notificationRef, { isRead: true });
      console.log(`Notification ${notificationId} marked as read!`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }