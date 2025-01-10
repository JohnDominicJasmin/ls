import database from "@react-native-firebase/database";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";
import { getFirestore, collection, query, onSnapshot, getDocs, serverTimestamp,  doc, updateDoc, average, where } from "firebase/firestore";

 
 
const getServicesByTypeMobile = async (type) => {
    console.log(`Type is ${type}`);
    const servicesRef = firestore().collection("services");
    try {
      const snapshot = await servicesRef.where("typeOfService", "==", type).get();
  
      // Use `map` to include document IDs in the response
      const services = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data
      }));
  
      console.log(services);
      return services;
    } catch (error) {
      console.error("Error getting services: ", error);
      return [];
    }
  };
  

  const getServicesByTypeWeb = async (type) => {
    const db = getFirestore();
  
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("typeOfService", "==", type));
  
    try {
      const querySnapshot = await getDocs(q);
  
      // Use `map` to include document IDs in the response
      const services = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data
      }));
  
      console.log(services);
      return services;
    } catch (error) {
      console.error("Error getting services: ", error);
      return [];
    }
  };
  


function getServiceByType(type) {
  if (Platform.OS === "web") {
    return getServicesByTypeWeb(type);
  } else {
    return getServicesByTypeMobile(type);
  }
}
const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0; // Handle empty array case
  
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  
    const averageRating = totalRating / ratings.length;
  
    return averageRating.toFixed(1);
  };
  

  const getRatingsByServiceTypeMobile = async (serviceType) => {
    const servicesRef = firestore().collection("ratings");
  
    try {
      const snapshot = await servicesRef.where("serviceType", "==", serviceType).get();
  
      const ratings = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
  
      const averageRating = calculateAverageRating(ratings);
  
      console.log(`Average ratings: ${averageRating}`);
      return { averageRating, ratings };
    } catch (error) {
      console.error("Error getting all ratings: ", error);
      return { averageRating: 0, ratings: [] };
    }
  };
  


  const getRatingsByServiceTypeWeb = async (type) => {
    const db = getFirestore();
  
    const ratingsRef = collection(db, "ratings");
    const q = query(ratingsRef, where("serviceType", "==", type));
  
    try {
      const querySnapshot = await getDocs(q);
  
      const ratings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), 
      }));
  
    
      const averageRating = calculateAverageRating(ratings);
  
      console.log(`Average ratings: ${averageRating}`);
      return { averageRating, ratings };
    } catch (error) {
      console.error("Error getting ratings: ", error);
      return { averageRating: 0, ratings: [] };
    }
  };
  

  function getRatingsByServiceType(type) {
    if(Platform.OS === 'web'){
        return getRatingsByServiceTypeWeb(type);
    }else{
        return getRatingsByServiceTypeMobile(type);
    }
  }


  async function rateService(data, onSuccess, onFailure) {
    try {
      if (Platform.OS === "web") {
        // Firestore instance for Web
        const db = getFirestore();
        const userRef = doc(db, "ratings"); // Path: ratings
        await setDoc(userRef, data); // Set the document in Firestore
      } else {
        // Firestore instance for Mobile
        const userRef = firestore().collection("ratings");
        await userRef.add(data); // Use 'add()' to add a new document
      }
  
      onSuccess();
      console.log("Rating data created successfully!");
    } catch (error) {
      console.error("Error creating ratings data:", error);
      onFailure(error);
    }
  }



  const getAllServicesMobile = async () => {
    try {
      const snapshot = await firestore().collection('services').get();
      const services = snapshot.docs.map(doc => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data
      }));
  
      console.log('Services', services);
      return services;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  

  const getAllServicesWeb = async () => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'services'));
      const services = querySnapshot.docs.map(doc => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data
      }));
  
      console.log('Services:', services);
      return services;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };


  const getAllServices = () => {
    if (Platform.OS === 'web') {
      return getAllServicesWeb();
    } else {
      return getAllServicesMobile();
    }
  };


  




export {getServiceByType, getRatingsByServiceType, rateService, getAllServices};