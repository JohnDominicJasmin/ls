import database from "@react-native-firebase/database";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";
import { getFirestore, collection, query, onSnapshot, getDocs, serverTimestamp,  doc, updateDoc, average, setDoc } from "firebase/firestore";

 

async function createBookingService(bookingData) {
    try {
      if (Platform.OS === 'web') {
        const db = getFirestore();
  
        const bookingServiceRef = collection(db, "appointments");
        await addDoc(bookingServiceRef, bookingData); 
  
      } else {
        const bookingServiceRef = firestore().collection("appointments");
        await bookingServiceRef.add(bookingData);
      }
  
      console.log("Booking service created successfully!");
    } catch (error) {
      console.error("Error creating booking service:", error);
      throw error;
    }
  }


  async function isDiscountCodeExist(value) {
    try {
      if (Platform.OS === 'web') {
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
        const querySnapshot = await collectionRef.where("code", "==", value).get();
  
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
  
  export {createBookingService, isDiscountCodeExist}
  