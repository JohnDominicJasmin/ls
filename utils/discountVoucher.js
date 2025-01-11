import database from "@react-native-firebase/database";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  getDocs,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";


const getDiscountMobile = async () => {
    try {
      const snapshot = await firestore().collection('discounts').get();
  
      const data = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(), 
      }));
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  


  const getDiscountsWeb = async () => {
    try {
      const db = getFirestore();
      const colRef = collection(db, 'discounts');
      const snapshot = await getDocs(colRef);
  
      const data = snapshot.docs.map(doc => ({
        id: doc.id, // Get the document ID
        ...doc.data(), // Get the document fields
      }));
  
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const getDiscounts = async() => {
    if(Platform.OS === 'web'){
        return await getDiscountsWeb()
    }
    return await getDiscountMobile()
  }



  const getVouchersMobile = async () => {
    try {
      const snapshot = await firestore().collection('vouchers').get();
  
      const data = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(), 
      }));
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  


  const getVouchersWeb = async () => {
    try {
      const db = getFirestore();
      const colRef = collection(db, 'vouchers');
      const snapshot = await getDocs(colRef);
  
      const data = snapshot.docs.map(doc => ({
        id: doc.id, // Get the document ID
        ...doc.data(), // Get the document fields
      }));
  
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const getVouchers = async() => {
    if(Platform.OS === 'web'){
        return await getVouchersWeb()
    }
    return await getVouchersMobile()
  }