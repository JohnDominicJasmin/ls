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
// import { applyAccountToPremium } from "../../utils/premiumAccount";
import {
  getAppointment,
  payService,
  updateAppoinmentStatus,
} from "../../utils/bookingDb";
import WorkerDetails from "../../ui/WorkerDetails";
import { getUserData } from "../../utils/userDb";
import TopAppBar from "../auth/components/TopAppBar";
import { incrementUserPoint } from "../../utils/userDb";
function ServiceDetails({ item }) {
  return (
    <View style={styles.serviceItem}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: item.servicePhotoUrl }}
          style={{
            height: Platform.OS === "web" ? 200 : 100,
            width: "40%",
            resizeMode: "cover",
          }}
        />

        <View
          style={{
            flexDirection: "column",
            paddingTop: 8,
            paddingLeft: 12,
            gap: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: Resources.colors.black,
              fontSize: 16,
              flexShrink: 1,
              width: "95%",
            }}
          >
            {item.bookedService}
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                marginRight: 8,
                paddingRight: 8,
                borderRightWidth: 1,
                borderRightColor:
                  item.time === ""
                    ? Resources.colors.white
                    : Resources.colors.boulder,
              }}
            >
              {item.date}
            </Text>
            <Text>{item.time}</Text>
          </View>

          <Text
            style={{
              maxWidth: "100%",
              paddingRight: 8,
            }}
          >{`Amount: ₱${item.minBudget} - ₱${item.maxBudget}`}</Text>
        </View>
      </View>
      <WorkerDetails
        isPaid={item.isPaid}
        workerPhotoUrl={item.workerPhotoURL}
        workerName={item.workerFullName}
        serviceFee={item.admin_serviceFee}
        discount={item.admin_discountOrVoucher}
        total={item.totalAmount}
      />
    </View>
  );
}
function ServicePaymentScreen({ route }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [imageUriError, setImageUriError] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [referenceNumberError, setReferenceNumberError] = useState(null);
  const [appointment, setAppointment] = useState(null);

  const { serviceId, userId } = route.params;
  console.log(`Service id is ${serviceId}`);
  const { user, error } = getUserData(userId);
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
  
    // Validate inputs
    if (!referenceNumber) {
      setReferenceNumberError("Reference number is required");
      setIsLoading(false);
      return;
    }
  
    if (!receiptImage) {
      setImageUriError("Receipt is required");
      setIsLoading(false);
      return;
    }
  
    // Helper functions
    const handlePaymentSuccess = async () => {
      try {
        await incrementUserPoint(userId, 1, async () => {
          await updateAppoinmentStatus(
            serviceId,
            "onGoing",
            () => {
              console.log("Payment succeeded");
              navigation.goBack();
            },
            () => {
              console.log("Failed to update appointment status");
            }
          );
        });
      } catch (error) {
        console.error("Error during post-payment actions:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handlePayment = async (photoUrl) => {
      const data = {
        name: `${user.firstName} ${user.lastName}`,
        userId: userId,
        referenceNumber: referenceNumber,
        receiptPhoto: photoUrl,
        serviceId: serviceId,
        time: appointment.time,
        date: appointment.date,
        workerName: appointment.workerFullName,
        workerPhoneNumber : appointment.workerPhoneNumber,
        workerPhotoURL: appointment.workerPhotoURL,
        servicePhotoUrl : appointment.servicePhotoUrl,
        serviceTypeName: appointment.serviceTypeName,
        fullAddress : appointment.fullAddress,
        workerId: appointment.workerId,

      };
  
      await payService(
        data,
        serviceId,
        async () => {
          console.log("Payment service succeeded");
          await handlePaymentSuccess();
        },
        () => {
          console.log("Payment service failed");
          setIsLoading(false);
        }
      );
    };
  
    const handleImageUpload = () => {
      uploadToCloudinary(
        receiptImage.uri,
        async (url) => {
          console.log("Image uploaded successfully:", url);
          await handlePayment(url);
        },
        () => {
          console.log("Image upload failed");
          setIsLoading(false);
        }
      );
    };
  
    // Trigger image upload and payment
    handleImageUpload();
  }, [referenceNumber, receiptImage, user, userId, serviceId, navigation, appointment]);
  
  

  const handleRemoveFile = () => {
    setImageUriError(null);
    setReceiptImage(null);
  };
  React.useEffect(() => {
    const fetchAppointment = async () => {
      setIsLoading(true);
      await getAppointment(
        serviceId,
        (appointment) => {
          setIsLoading(false);
          console.log(`Appointment is ${JSON.stringify(appointment)}`);
          setAppointment(appointment);
        },
        (error) => {
          setIsLoading(false);
        }
      );
    };
    fetchAppointment();
  }, [userId, serviceId]);
  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: Resources.colors.white }}
      />
      <View
        style={{
          width: Platform.OS === "web" ? "50%" : "100%",
          height: "100%",
          alignSelf: "center",
          overflow: "hidden",
        }}
      >
        <TopAppBar title={"Home Services Payment"} />
        <View
          style={{
            marginBottom: 20,
            marginTop: 60,
          }}
        >
          {appointment && <ServiceDetails item={appointment} />}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              paddingHorizontal: 0,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <Image
              source={Resources.images.ic_gcash_qr}
              style={
                Platform.OS === "web" ? styles.qrImageWeb : styles.qrImageMobile
              }
            />
            <Text style={{ flex: 0.45, fontSize: 16 }}>
              {"Scan to pay or Send payment to this  GCash number 09953023979"}
            </Text>
          </View>

          <Text
            style={{
              paddingHorizontal: 16,
              fontSize: 12,
              textAlign: "center",
              color: Resources.colors.boulder,
              marginTop: 12,
            }}
          >
            {
              "Enter the transaction reference number and upload a clear photo of your payment receipt. This ensures your booking is processed promptly."
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
              width:
                Platform.OS === "web" ? "100%" : Dimensions.get("screen").width,
              paddingHorizontal: 16,
              height: "auto",
              marginVertical: 20,
            }}
          />

          <UploadReceipt
            buttonText={"Pay Service"}
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
  serviceItem: {
    flexDirection: "column",
    height: "auto",
    marginVertical: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderColor: Resources.colors.alto,
    borderWidth: 0.5,
    width: "100%",
    overflow: "hidden",
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
  },
});

export default ServicePaymentScreen;
