import { View, Text, Platform, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";

const TextLabelSection = ({ titleStyle, descriptionStyle }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 24,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Text style={titleStyle}>{"Unlock the Benefits of Premium"}</Text>

      <Text style={[descriptionStyle, { textAlign: "center" }]}>
        {
          "Upgrade to a LaborSeek Premium Account for unlimited bookings, ad-free browsing, and exclusive discounts and vouchers on services."
        }
      </Text>
    </View>
  );
};
function MobileComponent({keepUsingFreePlan, upgradeToPremium}) {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: 16,
        paddingTop: 32,
      }}
    >
      <BackIcon style={{ position: "absolute", top: 16, left: 20 }} />

      <Image
        source={Resources.images.ic_premium}
        style={{
          resizeMode: "center",
          width: 350,
          marginTop: 24,
          height: 350,
        }}
      />

      <TextLabelSection
        titleStyle={{
          color: Resources.colors.black,
          fontSize: 24,
          fontWeight: "semibold",
        }}
        descriptionStyle={{
          color: Resources.colors.black,
          marginHorizontal: 26,
          marginTop: 8,
        }}
      />

      <TouchableOpacity
        onPress={upgradeToPremium}
        style={{
          backgroundColor: Resources.colors.royalBlue,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 40,
        }}
      >
        <Text
          style={{
            color: Resources.colors.white,
          }}
        >
          {"Upgrade to Premium"}
        </Text>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={keepUsingFreePlan}>
      <Text
          style={{
            color: Resources.colors.boulder,
          }}
        >
          {"Keep using the free plan"}
        </Text>
      </TouchableOpacity>
        

    </View>
  );
}
function WebComponent() {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: 16,
        paddingTop: 32,
      }}
    >
      <BackIcon style={{ position: "absolute", top: 16, left: 20 }} />
      <TextLabelSection
        titleStyle={{ color: Resources.colors.black, fontSize: 32 }}
        descriptionStyle={{ color: Resources.colors.black, maxWidth: 700 }}
      />
      <Image
        source={Resources.images.ic_premium}
        style={{
          resizeMode: "center",
          width: 450,
          height: 450,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: Resources.colors.royalBlue,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: Resources.colors.white,
          }}
        >
          {"Upgrate to Premium"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function PremiumAccountScreen({route}) {

    const navigation = useNavigation()
    const {userId, name} = route.params
    const keepUsingFreePlan = React.useCallback(() => {
 navigation.goBack(); 
    }, [])
    const upgradeToPremium = React.useCallback(() => {
        navigation.navigate('PaymentPremium', {userId: userId, name: name})
    }, [name, userId])
  return (
    <>
      {
        <View style={{
            flex: 1,
            backgroundColor: Resources.colors.white
        }}>
          <MobileComponent upgradeToPremium={upgradeToPremium} keepUsingFreePlan={keepUsingFreePlan} />
          {/* {Platform.OS === "web" ? <WebComponent /> : <MobileComponent upgradeToPremium={upgradeToPremium} keepUsingFreePlan={keepUsingFreePlan} />} */}
        </View>
      }
    </>
  );
}

export default PremiumAccountScreen;
