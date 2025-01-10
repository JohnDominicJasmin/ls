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
} from "firebase/firestore";

async function applyAccountToPremium(data, onSuccess, onFailure) {
    try {
      if (Platform.OS === "web") {
        const db = getFirestore();
  
        const premiumRef = collection(db, "premiumPayment");
        const docRef = await addDoc(premiumRef, data);
  
        console.log("Applying to premium created successfully with ID:", docRef.id);
        if (onSuccess) {
          onSuccess(docRef.id);
        }
      } else {
        const paymentRef = firestore().collection("premiumPayment");
        const docRef = await paymentRef.add(data);
  
        console.log("Applying to premium created successfully with ID:", docRef.id);
        if (onSuccess) {
          onSuccess(docRef.id);
        }
      }
    } catch (error) {
      console.error("Error creating premium service:", error);
      if (onFailure) {
        onFailure(error);
      }
    }
  }

  export {applyAccountToPremium}