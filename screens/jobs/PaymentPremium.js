import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import InputField from "../auth/components/SignUpInputField";
import UploadReceipt from "../../ui/UploadReceipt";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import uploadToCloudinary from "../../utils/uploadProfile";
import { applyAccountToPremium } from "../../utils/premiumAccount";
import { Button, Dialog, CheckBox, ListItem, Avatar } from "@rneui/themed";

const BulletPoints = () => {
  const items = [
    "Unlimited Bookings",
    "Ad-free experience",
    "Exclusive Discounts and Vouchers",
  ];

  return (
    <View style={styles.containerBulletPoint}>
      {items.map((item, index) => (
        <View key={index} style={styles.rowBulletPoint}>
          <View style={styles.bullet} />
          <Text style={styles.textBulletPoint}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

function PaymentPremium({ route }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [imageUriError, setImageUriError] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [referenceNumberError, setReferenceNumberError] = useState(null);
  const { userId, name } = route.params;
  const [shouldShowDialogOnPremium, setShouldShowDialogPremium] =
    useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(`Image result is ${JSON.stringify(result)}`);
    if (!result.canceled) {
      setReceiptImage(result.assets[0]);
    }
  };

  const onClickSubmit = React.useCallback(() => {
    setIsLoading(true);
    if (referenceNumber === "") {
      setReferenceNumberError("Reference number is required");
      setIsLoading(false);
      return;
    }

    if (receiptImage === null) {
      setImageUriError("Receipt is required");
      setIsLoading(false);
      return;
    }
    const applyToPremium = async ({ photoUrl, referenceNumber }) => {
      const data = {
        name: name,
        userId: userId,
        referenceNumber: referenceNumber,
        receiptPhoto: photoUrl,
      };
      console.log(`Premium data application is ${JSON.stringify(data)}`);
      await applyAccountToPremium(
        data,
        () => {
          console.log(`Payment succeed to premium`);
        },
        () => {
          console.log(`Payment failed to premium`);
        }
      );
    };

    uploadToCloudinary(
      receiptImage.uri,
      async (url) => {
        console.log("Image uploaded successfully" + url);
        setIsLoading(false);
        await applyToPremium({
          photoUrl: url,
          referenceNumber: referenceNumber,
        });
      },
      () => {
        console.log("Image uploaded failed");
        setIsLoading(false)
      }
    );
  }, [referenceNumber, receiptImage]);

  const handleRemoveFile = () => {
    setImageUriError(null);
    setReceiptImage(null);
  };
  return (
    <ScrollView style={styles.container}>
        <BackIcon style={{ position: "absolute", top: 16, left: 20 }} />

      <View
         style={{
          width: Platform.OS === "web" ? "50%" : "100%",
          height: "100%",
          alignSelf: "center",
          overflow: "hidden", // Ensures content doesn't visually overflow the parent
        }}
      >
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />

        <Dialog
          isVisible={shouldShowDialogOnPremium}
          onBackdropPress={() => {
            setShouldShowDialogPremium(false);
          }}
        >
          <Dialog.Title title="Successfully Applied to Premium Account" />
          <Text>Application for Premium Account is on process</Text>
          <Dialog.Actions>
            <Dialog.Button
              title="Okay"
              onPress={() => {
                setShouldShowDialogPremium(false);
                navigation.navigate("Profile");
              }}
            />
          </Dialog.Actions>
        </Dialog>

        <View style={styles.content}>
          <Image
            source={Resources.icons.ic_diamond_premium}
            style={{
              resizeMode: "contain",
              height: 64,
              width: 64,
              tintColor: Resources.colors.royalBlue,
            }}
          />

          <Text style={styles.upgradeToPremiumTitle}>
            {"Upgrade to Premium"}
          </Text>
          <Text style={styles.priceText}>{"₱ 200.00"}</Text>
          <Text style={styles.monthlySubText}>{"Monthly Subscription"}</Text>
          <Text
            style={{
              marginTop: 24,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"Features you’ll get"}
          </Text>

          <BulletPoints />
          <View
            style={{
              paddingHorizontal: 16, // Applies padding to the entire container
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                paddingHorizontal: 16,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={Resources.images.ic_gcash_qr}
                style={Platform.OS === 'web'? styles.qrImageWeb : styles.qrImageMobile}
              />
              <Text style={{ flex: 0.45, fontSize: 16}}>
                {
                  "Scan to pay or Send payment to this  GCash number 09953023979"
                }
              </Text>
            </View>

            <Text
              style={{
                paddingHorizontal: 16,
                fontSize: 12,
                textAlign: "center",
                color: Resources.colors.boulder,
              }}
            >
              {
                "To activate your premium account, please provide the GCash transaction reference number and upload proof of payment. This ensures your subscription is processed quickly."
              }
            </Text>

            <InputField
              errorMessage={referenceNumberError}
              setValue={(text) => {
                setReferenceNumber(text);
                setReferenceNumberError(null);
              }}
              value={referenceNumber}
              keyboardType={"numeric"}
              placeholder={"GCash Transaction Reference Number"}
              style={{
                width: Platform.OS ==='web' ? '100%': Dimensions.get("screen").width,
                paddingHorizontal: 16,
                marginTop: 20,
              }}
            />

            <UploadReceipt
              onClickUpload={() => {
                pickImage();
                setImageUriError(null);
              }}
              handleRemoveFile={handleRemoveFile}
              onClickSubmit={onClickSubmit}
              uploadReceiptError={imageUriError}
              imageName={receiptImage?.fileName}
              imageSelected={receiptImage}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Resources.colors.white,
    height: "100%",
  },
  content: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  upgradeToPremiumTitle: {
    color: Resources.colors.black,
    fontSize: 24,
    fontWeight: "medium",
    marginTop: 12,
  },
  priceText: {
    color: Resources.colors.black,
    fontSize: 24,
    fontWeight: "medium",
    marginTop: 16,
  },
  monthlySubText: {
    fontSize: 16,
    color: Resources.colors.black,
  },
  containerBulletPoint: {
    padding: 20,
  },
  rowBulletPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "black",
    marginRight: 10,
  },
  textBulletPoint: {
    fontSize: 16,
    lineHeight: 24,
  },
  qrImageWeb: {
    resizeMode: "center",
    width: 500,
    height: 400,

  },
  qrImageMobile: {
    resizeMode: "contain",
    width: 400,
    flex: 1,
    height: 300,
  }
});
export {PaymentPremium, BulletPoints};
