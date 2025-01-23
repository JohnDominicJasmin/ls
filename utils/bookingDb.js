import database from "@react-native-firebase/database";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  serverTimestamp,
  addDoc,
  doc,
  updateDoc,
  average,
  setDoc,
   getDoc
} from "firebase/firestore";

async function createBookingService(bookingData, onSuccess, onFailure) {
  try {
    if (Platform.OS === "web") {
      const db = getFirestore();

      const bookingServiceRef = collection(db, "appointments");
      const docRef = await addDoc(bookingServiceRef, bookingData);

      console.log("Booking service created successfully with ID:", docRef.id);
      if (onSuccess) {
        onSuccess(docRef.id);
      }
    } else {
      const bookingServiceRef = firestore().collection("appointments");
      const docRef = await bookingServiceRef.add(bookingData);

      console.log("Booking service created successfully with ID:", docRef.id);
      if (onSuccess) {
        onSuccess(docRef.id);
      }
    }
  } catch (error) {
    console.error("Error creating booking service:", error);
    if (onFailure) {
      onFailure(error);
    }
  }
}


function useDoneUserBookings(userId) {
    const [doneBookings, setDoneBookings] = useState([]);
    const [bookingsError, setBookingsError] = useState(null);
  
    useEffect(() => {
      if (!userId) return;
  
      let unsubscribe;
  
      if (Platform.OS === 'web') {
        // Firestore instance for web
        const db = getFirestore();
        const bookingsRef = collection(db, 'appointments');
  
        // Real-time listener for web
        const bookingsQuery = query(
          bookingsRef,
          where('userId', '==', userId),
          where('isDone', '==', true)
        );
  
        unsubscribe = onSnapshot(
          bookingsQuery,
          (snapshot) => {
            const bookingsArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log('Bookings (Web):', bookingsArray);
            setDoneBookings(bookingsArray);
          },
          (err) => {
            console.error('Error fetching bookings (Web):', err);
            setBookingsError(err);
          }
        );
      } else {
        // Firestore instance for mobile
        const bookingsRef = firestore().collection('appointments');
  
        // Real-time listener for mobile
        unsubscribe = bookingsRef
          .where('userId', '==', userId)
          .where('isDone', '==', true)
          .onSnapshot(
            (snapshot) => {
              const bookingsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              console.log('Bookings (Mobile):', bookingsArray);
              setDoneBookings(bookingsArray);
            },
            (err) => {
              console.error('Error fetching bookings (Mobile):', err);
              setBookingsError(err);
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
  
    return { doneBookings, bookingsError };
  }


  
 function useActiveUserBookings(userId) {
    const [userBookings, setUserBookings] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!userId) return;
  
      let unsubscribe;
  
      if (Platform.OS === 'web') {
        // Firestore instance for web
        const db = getFirestore();
        const bookingsRef = collection(db, 'appointments');
  
        // Real-time listener for web
        const bookingsQuery = query(
          bookingsRef,
          where('userId', '==', userId),
          where('isActive', '==', true)
        );
  
        unsubscribe = onSnapshot(
          bookingsQuery,
          (snapshot) => {
            const bookingsArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log('Bookings (Web):', bookingsArray);
            setUserBookings(bookingsArray);
          },
          (err) => {
            console.error('Error fetching bookings (Web):', err);
            setError(err);
          }
        );
      } else {
        // Firestore instance for mobile
        const bookingsRef = firestore().collection('appointments');
  
        // Real-time listener for mobile
        unsubscribe = bookingsRef
          .where('userId', '==', userId)
          .where('isActive', '==', true)
          .onSnapshot(
            (snapshot) => {
              const bookingsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              console.log('Bookings (Mobile):', bookingsArray);
              setUserBookings(bookingsArray);
            },
            (err) => {
              console.error('Error fetching bookings (Mobile):', err);
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
  
    return { userBookings, error };
  }

async function isDiscountCodeExist(value) {
  try {
    if (Platform.OS === "web") {
      // Web implementation
      const db = getFirestore();
      const collectionRef = collection(db, "discounts");

      // Query for documents where the field matches the value
      const q = query(collectionRef, where("code", "==", value));
      const querySnapshot = await getDocs(q);

      // Process the results
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0]; // Get the first matching document
        return { id: document.id, ...document.data() }; // Return the data along with document ID
      } else {
        console.log("No matching document found.");
        return null;
      }
    } else {
      // Mobile implementation
      const collectionRef = firestore().collection("discounts");

      // Query for documents where the field matches the value
      const querySnapshot = await collectionRef
        .where("code", "==", value)
        .get();

      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0]; // Get the first matching document
        return { id: document.id, ...document.data() }; // Return the data along with document ID
      } else {
        console.log("No matching document found.");
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching document by field:", error);
    throw error;
  }
}
async function isVoucherCodeExist(value) {
  try {
    if (Platform.OS === "web") {
      // Web implementation
      const db = getFirestore();
      const collectionRef = collection(db, "vouchers");

      // Query for documents where the field matches the value
      const q = query(collectionRef, where("code", "==", value));
      const querySnapshot = await getDocs(q);

      // Process the results
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0]; // Get the first matching document
        return { id: document.id, ...document.data() }; // Return the data along with document ID
      } else {
        console.log("No matching document found.");
        return null;
      }
    } else {
      // Mobile implementation
      const collectionRef = firestore().collection("vouchers");

      // Query for documents where the field matches the value
      const querySnapshot = await collectionRef
        .where("code", "==", value)
        .get();

      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0]; // Get the first matching document
        return { id: document.id, ...document.data() }; // Return the data along with document ID
      } else {
        console.log("No matching document found.");
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching document by field:", error);
    throw error;
  }
}
const cancelBookingMobile = async (bookingId) => {
  await firestore()
    .collection("appointments")
    .doc(bookingId)
    .update({ isActive: false });
};



const cancelBookingWeb = async (bookingId) => {
  const firestore = getFirestore(); // Initialize Firestore
  const bookingRef = doc(firestore, "appointments", bookingId);
  await updateDoc(bookingRef, { isActive: false });
};

// Unified cancel booking function
const cancelBooking = async (bookingId, onSuccess, onFailure) => {
  try {
    if (Platform.OS === "web") {
      await cancelBookingWeb(bookingId);
    } else {
      await cancelBookingMobile(bookingId);
    }

    // Call the onSuccess callback if provided
    if (onSuccess) {
      onSuccess(`Cancellation successful for booking ID: ${bookingId}`);
    }
  } catch (error) {
    console.error("Error canceling booking:", error);

    // Call the onFailure callback if provided
    if (onFailure) {
      onFailure(error);
    }
  }
};


const markAsRatedMobile = async (bookingId) => {
    await firestore()
      .collection("appointments")
      .doc(bookingId)
      .update({ isRated: true });
  };
  
  
  
  const markAsRatedWeb = async (bookingId) => {
    const firestore = getFirestore(); // Initialize Firestore
    const bookingRef = doc(firestore, "appointments", bookingId);
    await updateDoc(bookingRef, { isRated: true });
  };
  
  // Unified cancel booking function
  const markAsRated = async (bookingId, onSuccess, onFailure) => {
    try {
      if (Platform.OS === "web") {
        await markAsRatedWeb(bookingId);
      } else {
        await markAsRatedMobile(bookingId);
      }
  
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess(`Rating successful for booking ID: ${bookingId}`);
      }
    } catch (error) {
      console.error("Error rating booking:", error);
  
      // Call the onFailure callback if provided
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  
  const markAsPaidMobile = async (bookingId) => {
    await firestore()
      .collection("appointments")
      .doc(bookingId)
      .update({ isPaid: true, isDone: true, isActive: false }); // Single object with both fields
  };
  
  
  
  
  const markAsPaidWeb = async (bookingId) => {
    const firestore = getFirestore(); // Initialize Firestore
    const bookingRef = doc(firestore, "appointments", bookingId);
    await updateDoc(bookingRef, { isPaid: true, isDone: true, isActive: false}); // Single object with both fields
  };
  
  
  // Unified cancel booking function
  const markAsPaid = async (bookingId, onSuccess, onFailure) => {
    try {
      if (Platform.OS === "web") {
        await markAsPaidWeb(bookingId);
      } else {
        await markAsPaidMobile(bookingId);
      }
  
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess(`Paid successful for booking ID: ${bookingId}`);
      }
    } catch (error) {
      console.error("Error paid booking:", error);
  
      // Call the onFailure callback if provided
      if (onFailure) {
        onFailure(error);
      }
    }
  };



 // Mobile: React Native Firebase
const getAppointmentMobile = async (documentId, onSuccess, onFailure) => {
  try {
    const documentRef = firestore().collection("appointments").doc(documentId);
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const data = { id: documentSnapshot.id, ...documentSnapshot.data() };
      if (onSuccess) onSuccess(data);
      return data;
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error fetching appointment (Mobile):", error);
    if (onFailure) onFailure(error);
    throw error;
  }
};

// Web: Firebase Web SDK
const getAppointmentWeb = async (documentId, onSuccess, onFailure) => {
  try {
    const firestoreInstance = getFirestore();
    const documentRef = doc(firestoreInstance, "appointments", documentId);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const data = { id: documentSnapshot.id, ...documentSnapshot.data() };
      if (onSuccess) onSuccess(data);
      return data;
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error fetching appointment (Web):", error);
    if (onFailure) onFailure(error);
    throw error;
  }
};

// Unified Function for Web and Mobile
const getAppointment = async (documentId, onSuccess, onFailure) => {
  try {
    if (Platform.OS === "web") {
      return await getAppointmentWeb(documentId, onSuccess, onFailure);
    } else {
      return await getAppointmentMobile(documentId, onSuccess, onFailure);
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    if (onFailure) onFailure(error);
    throw error;
  }
};


async function payService(data, documentId, onSuccess, onFailure) {
  try {
    if (Platform.OS === "web") {
      const db = getFirestore();

      // Specify the document with a custom ID
      const paymentServiceRef = doc(db, "servicePayment", documentId);
      await setDoc(paymentServiceRef, data);

      console.log("Pay service created successfully with ID:", documentId);
      if (onSuccess) {
        onSuccess(documentId);
      }
    } else {
      const paymentRef = firestore().collection("servicePayment").doc(documentId);
      await paymentRef.set(data);

      console.log("Pay service created successfully with ID:", documentId);
      if (onSuccess) {
        onSuccess(documentId);
      }
    }
  } catch (error) {
    console.error("Error paying service:", error);
    if (onFailure) {
      onFailure(error);
    }
  }
}

const updateAppoinmentStatus = async (documentId, status, onSuccess, onFailure) => {

  try {
    if (Platform.OS === "web") {
      const db = getFirestore();
      const appointmentRef = doc(db, "appointments", documentId);
      await updateDoc(appointmentRef, { status:status});
    } else {
      await firestore().collection("appointments").doc(documentId).update({ status:status });
    }

    if (onSuccess) {
      onSuccess(`Status updated to ${status} for appointment ID: ${documentId}`);
    }
  } catch (error) {
    console.error("Error updating appointment status:", error);

    if (onFailure) {
      onFailure(error);
    }
  }
}




export {
  createBookingService,
  isDiscountCodeExist,
  isVoucherCodeExist,
  useActiveUserBookings ,
  cancelBooking,
  useDoneUserBookings,
  markAsRated,
  markAsPaid,
  getAppointment,
  payService,
  updateAppoinmentStatus
};
