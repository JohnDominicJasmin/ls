import database from "@react-native-firebase/database";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";
import { getFirestore, collection, query, onSnapshot, getDocs, serverTimestamp,  doc, updateDoc } from "firebase/firestore";

 
 

  export function useNotification(userId) {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!userId) return;
  
      let unsubscribe;
  
      if (Platform.OS === "web") {
        // Firestore instance for web
        const db = getFirestore();
        const notificationsRef = collection(db, `users/${userId}/notifications`);
  
        // Real-time listener for web
        unsubscribe = onSnapshot(
          query(notificationsRef),
          (querySnapshot) => {
            const notificationsArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Notifications (Web):", notificationsArray);
            setNotifications(notificationsArray);
          },
          (err) => {
            console.error("Error fetching notifications (Web):", err);
            setError(err);
          }
        );
      } else {
        // Firestore instance for mobile
        const notificationsRef = firestore()
          .collection("users")
          .doc(userId)
          .collection("notifications");
  
        // Real-time listener for mobile
        unsubscribe = notificationsRef.onSnapshot(
          (snapshot) => {
            const notificationsArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Notifications (Mobile):", notificationsArray);
            setNotifications(notificationsArray);
          },
          (err) => {
            console.error("Error fetching notifications (Mobile):", err);
            setError(err);
          }
        );
      }
  
      // Cleanup listener on unmount
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [userId]);
  
    return { notifications, error };
}

 async function updateUserFieldsWeb(
  userId,
  fields,
  onSuccess,
  onFailure
) {
  if (!userId || !fields || typeof fields !== "object") {
    console.error(
      "Invalid parameters. User ID and fields object are required."
    );
    return;
  }

  const db = getFirestore(); // Initialize Firestore
  const userRef = doc(db, "users", userId); // Reference to the user's document

  try {
    await updateDoc(userRef, fields); // Update the document with the provided fields
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error(`Error updating fields:`, error);
    if (onFailure) onFailure(error);
  }
}

 async function updateUserFieldsMobile(
  userId,
  fields,
  onSuccess,
  onFailure
) {
  if (!userId || !fields || typeof fields !== "object") {
    console.error(
      "Invalid parameters. User ID and fields object are required."
    );
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

export async function updateUserField(userId, fields, onSuccess, onFailure) {
  if (Platform.OS === "web") {
    return updateUserFieldsWeb(userId, fields, onSuccess, onFailure);
  } else {
    return updateUserFieldsMobile(userId, fields, onSuccess, onFailure);
  }
}

















 function getUserDataWeb(userId) {
  const [user, setUser] = useState(null); // null to indicate no data initially
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // Exit early if no userId is provided

    const db = getFirestore(); // Initialize Firestore
    const userRef = doc(db, "users", userId); // Reference to the user's document
    console.log(`User ref is ${JSON.stringify(userRef)}`);
    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
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
 function getUserDataMobile(userId) {
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

export function getUserData(userId) {
  if (Platform.OS === "web") {
    return getUserDataWeb(userId);
  }
  return getUserDataMobile(userId);
}



export async function createUserData(userId, userData) {
  try {
    if (Platform.OS === "web") {
      // Firestore instance for Web
      const db = getFirestore();
      const userRef = doc(db, "users", userId); // Path: users/{userId}
      await setDoc(userRef, userData); // Set the document in Firestore
    } else {
      // Firestore instance for Mobile
      const userRef = firestore().collection("users").doc(userId);
      await userRef.set(userData); // Set the document in Firestore
    }

    console.log("User data created successfully!");
  } catch (error) {
    console.error("Error creating user data:", error);
    throw error; // Re-throw error for further handling
  }
}















async  function markNotificationAsReadMobile(userId, notificationId) {
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


 async function markNotificationAsReadWeb(userId, notificationId) {
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

  export async function markNotificationAsRead(userId, notificationId){
    if (Platform.OS === "web") {
      return markNotificationAsReadWeb(userId, notificationId);
    }
    return markNotificationAsReadMobile(userId, notificationId);
  }




  const getCategoriesMobile = async () => {
    try {
      // Reference the collection
      const collectionRef = firestore().collection('categories');
  
      // Fetch all documents in the collection
      const snapshot = await collectionRef.get();
  
      // Process the data
      const data = snapshot.docs.map(doc => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      }));
  
      return data;
    } catch (error) {
      console.error("Error fetching collection:", error);
      return [];
    }
  };

  const getCategoriesWeb = async () => {
    try {
      // Initialize Firestore
      const db = getFirestore();
  
      // Reference the collection
      const collectionRef = collection(db, 'categories');
  
      // Fetch all documents in the collection
      const querySnapshot = await getDocs(collectionRef);
  
      // Process the data
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      }));
  
      return data;
    } catch (error) {
      console.error("Error fetching collection:", error);
      return [];
    }
  };

  

  export async function getCategories() {
    if (Platform.OS === 'web') {
      return getCategoriesWeb();
    } else {
      return getCategoriesMobile();
    }
  }