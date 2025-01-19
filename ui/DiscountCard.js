import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from "react-native";
import Resources from "../src/Resources";

const DiscountCard = ({points, textOff, codeText, everyPointsText, pointsRequired}) => {
    const isPointsEligible = points >= pointsRequired
    const cardBg = isPointsEligible ? Resources.colors.solitude : Resources.colors.alto
    const codeBg = isPointsEligible ? Resources.colors.royalBlue : Resources.colors.silver_chalice
    const discountTextColor = isPointsEligible ? Resources.colors.royalBlue : Resources.colors.silver_chalice
  return (
    <View style={[styles.card, {backgroundColor: cardBg} ]}>
      <Text style={[styles.discountText, {color: discountTextColor}]}>{textOff}</Text>
      <Pressable style={[styles.codeButton, {backgroundColor: codeBg}]}>
        <Text style={styles.codeText}>{codeText}</Text>
      </Pressable>
      <Text style={[styles.subText, {color: discountTextColor}]} numberOfLines={2}>{everyPointsText}</Text>
    </View>
  );
};


const VoucherCard = ({textOff, codeText, everyPointsText}) => {
    const cardBg = Resources.colors.solitude 
    const codeBg =  Resources.colors.royalBlue 
    const discountTextColor =  Resources.colors.royalBlue
  return (
    <View style={[styles.card, {backgroundColor: cardBg} ]}>
      <Text style={[styles.discountText, {color: discountTextColor}]}>{textOff}</Text>
      <Pressable style={[styles.codeButton, {backgroundColor: codeBg}]}>
        <Text style={styles.codeText}>{codeText}</Text>
      </Pressable>
      <Text style={[styles.subText, {color: discountTextColor}]} numberOfLines={2}>{everyPointsText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginRight: 12,
    marginVertical: 12,
    width: "auto", // Adjust width as needed
    alignSelf: "center",
  },
  discountText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  codeButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  codeText: {
    color: "#ffffff", // White text on button
    fontSize: 10,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    width: '80%',
  
    textAlign: "center",
  },
});

export  {DiscountCard, VoucherCard};
