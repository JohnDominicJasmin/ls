import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import TopAppBar from "../auth/components/TopAppBar";
import Resources from "../../src/Resources";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../utils/userDb";
import DatePicker from "react-native-date-picker";
import {
  isDiscountCodeExist,
  createBookingService,
  isVoucherCodeExist,
} from "../../utils/bookingDb";
import { decrementUserPoint } from "../../utils/userDb";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
const ContactDetail = ({ style, address, phoneNumber }) => {
  return (
    <>
      <View style={style}>
        <View style={styles.row}>
          <Image source={Resources.icons.ic_location} style={styles.icon} />
          <Text
            style={[
              styles.text,
              {
                color:
                  address === ""
                    ? Resources.colors.alto
                    : Resources.colors.black,
              },
            ]}
          >
            {address === "" ? "Address not available" : address}
          </Text>
        </View>

        <View style={styles.row}>
          <Image source={Resources.icons.ic_telephone} style={[styles.icon]} />
          <Text
            style={[
              styles.text,
              {
                color:
                  phoneNumber === ""
                    ? Resources.colors.alto
                    : Resources.colors.black,
              },
            ]}
          >
            {phoneNumber === "" ? "Phone Number not available" : phoneNumber}
          </Text>
        </View>
      </View>
    </>
  );
};
const ContactCard = ({ name, address, phoneNumber }) => {
  return (
    <View style={styles.cardContainer}>
      {name !== "" && <Text style={styles.name}>{name}</Text>}
      <ContactDetail address={address} phoneNumber={phoneNumber} />
    </View>
  );
};

const ServiceInput = ({
  placeholder,
  style,
  label,
  value,
  setValue,
  keyboardType,
  returnKeyType,
  onClickServiceInput,
  isEditable = true,
  errorMessage = "",
}) => {
  return (
    <Pressable
      style={[
        {
          flex: 1, // Ensures equal width
          marginRight: 8, // Adds spacing between inputs (optional)
        },
        style,
      ]}
      onPress={onClickServiceInput}
    >
      <View>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {placeholder}
        </Text>
        <TextInput
          value={value}
          placeholder={label}
          editable={isEditable}
          onChangeText={setValue}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          style={styles.inputService}
        />
        {errorMessage !== "" && (
          <Text
            style={{
              color: Resources.colors.red,
              fontSize: 12,
            }}
          >
            {errorMessage}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const ServiceNote = ({ value, setValue }) => {
  return (
    <View style={styles.multilineInputContainer}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.multilineInputContainerTextInput}
        placeholder="Leave a note here..."
        multiline={true}
        numberOfLines={4} // Optional: Suggests the height based on lines
        textAlignVertical="top" // Aligns text to the top inside the input
      />
    </View>
  );
};
const AmountServiceInput = ({
  placeholder,
  style,
  value,
  setValue,
  returnKeyType,
  onLostFocus,
  errorMessage,
}) => {
  return (
    <View
      style={[
        {
          flex: 1, // Ensures equal width
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 14,
        }}
      >
        {placeholder}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: Resources.colors.alto,
          borderRadius: 12,
          marginTop: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Resources.colors.boulder,
            position: "absolute",
            alignSelf: "flex-start",
            left: 8,
            fontSize: 16,
          }}
        >
          {"₱"}
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType={"number-pad"}
          returnKeyType={returnKeyType}
          style={[styles.inputService_1, { paddingLeft: 28 }]}
          onBlur={onLostFocus}
        />
      </View>
      <Text
        style={{
          color: Resources.colors.red,
          fontSize: 12,
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
};

const ApplyDiscountButton = ({ style, disabled, onClickApply }) => {
  return (
    <TouchableOpacity disabled={disabled} style={style} onPress={onClickApply}>
      <Text
        style={{
          color: disabled ? Resources.colors.alto : Resources.colors.royalBlue,
          fontWeight: "semibold",
          fontSize: 16,
        }}
      >
        {"Apply"}
      </Text>
    </TouchableOpacity>
  );
};

function MobileComponent({
  name,
  address,
  phoneNumber,
  onClickServiceInput,
  dateOfService,
  onClickServiceTime,
  timeOfService,

  discountErrorMessage,
  onClickApplyDiscount,

  discountCode,
  setDiscountCode,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,

  onLostFocusMaxAmount,
  onLostFocusMinAmount,

  minAmountError,
  maxAmountError,
  serviceName,
  currentUser,
  isAccountPremium,
  note,
  setNote,
  submitBookingService,
}) {
  return (
    <>
      <TopAppBar title="Book Service" />
      <ContactCard name={name} address={address} phoneNumber={phoneNumber} />

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 34,
        }}
      >
        {serviceName}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 34,
        }}
      >
        <ServiceInput
          label={"11/14/2024"}
          value={dateOfService}
          style={{ flex: 1 }}
          placeholder={"Date of Service"}
          isEditable={false}
          onClickServiceInput={onClickServiceInput}
        />
        <ServiceInput
          label={"8: 00 AM"}
          value={timeOfService}
          style={{ flex: 1 }}
          placeholder={"Time of Service"}
          isEditable={false}
          onClickServiceInput={onClickServiceTime}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            width: "63%",
            marginTop: 16,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ServiceInput
            keyboardType={"default"}
            errorMessage={discountErrorMessage}
            placeholder={"Discount or Voucher Code"}
            value={discountCode}
            setValue={setDiscountCode}
            isEditable={isAccountPremium}
            isAccountPremium={isAccountPremium}
          />
          <ApplyDiscountButton
            disabled={!isAccountPremium}
            onClickApply={onClickApplyDiscount}
            style={{ marginTop: 20 }}
          />
        </View>
        {!isAccountPremium && (
          <Text
            style={{
              color: Resources.colors.alto,
              fontSize: 12,
              width: "50%",
            }}
          >
            {"The feature is only available for premium accounts"}
          </Text>
        )}
      </View>
      <Text
        style={{
          color: Resources.colors.alto,
          fontWeight: "regular",
          marginTop: 40,
        }}
      >
        {
          "Enter the minimum and maximum amount of your budget price for your home service"
        }
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 16,
          marginTop: 24,
        }}
      >
        <AmountServiceInput
          value={minAmount}
          setValue={setMinAmount}
          placeholder={"Minimum Amount"}
          onLostFocus={onLostFocusMinAmount}
          errorMessage={minAmountError}
        />
        <AmountServiceInput
          value={maxAmount}
          setValue={setMaxAmount}
          placeholder={"Maximum Amount"}
          onLostFocus={onLostFocusMaxAmount}
          errorMessage={maxAmountError}
        />
      </View>

      <ServiceNote value={note} setValue={setNote} />

      <BookServiceButton
        submitBookingService={submitBookingService}
        isGuest={currentUser && currentUser?.isAnonymous}
      />
    </>
  );
}

function BookServiceButton({ submitBookingService, isGuest }) {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        disabled={isGuest}
        onPress={submitBookingService}
        style={{
          backgroundColor: isGuest
            ? Resources.colors.alto
            : Resources.colors.royalBlue,
          alignSelf: "center", // Ensures the button width matches its content
          paddingHorizontal: 40, // Adds padding around the text
          paddingVertical: 16, // Adds padding for height
          borderRadius: 8, // Optional: Rounds the button corners
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: Resources.colors.white,
            fontSize: 16, // Optional: Adjusts font size
          }}
        >
          {"Book Service"}
        </Text>
      </TouchableOpacity>

      {isGuest && (
        <Text
          style={{
            color: Resources.colors.gray,
            fontSize: 12,
            width: "50%",
            textAlign: "center",
          }}
        >
          {"Please login to book a service"}
        </Text>
      )}
    </View>
  );
}

function WebComponent({
  name,
  address,
  phoneNumber,
  onClickServiceInput,
  dateOfService,
  onClickServiceTime,
  timeOfService,
  serviceName,
  discountErrorMessage,
  onClickApplyDiscount,

  discountCode,
  setDiscountCode,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  currentUser,
  onLostFocusMaxAmount,
  onLostFocusMinAmount,

  minAmountError,
  maxAmountError,

  isAccountPremium,
  note,
  setNote,
  submitBookingService,
}) {
  return (
    <View style={{ flexDirection: "column" }}>
      <TopAppBar title="Book Service" />

      <View
        style={{
          flexDirection: "row",
          gap: 22,
        }}
      >
        <View style={{ flex: 1, width: "50%" }}>
          <ContactCard
            name={name}
            address={address}
            phoneNumber={phoneNumber}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 34,
            }}
          >
            {serviceName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 34,
            }}
          >
            <ServiceInput
              label={"11/14/2024"}
              value={dateOfService}
              style={{ flex: 1 }}
              placeholder={"Date of Service"}
              isEditable={false}
              onClickServiceInput={onClickServiceInput}
            />
            <ServiceInput
              label={"8: 00 AM"}
              value={timeOfService}
              style={{ flex: 1 }}
              placeholder={"Time of Service"}
              isEditable={false}
              onClickServiceInput={onClickServiceTime}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                width: "63%",
                marginTop: 16,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ServiceInput
                keyboardType={"default"}
                errorMessage={discountErrorMessage}
                placeholder={"Discount or Voucher Code"}
                value={discountCode}
                setValue={setDiscountCode}
                isEditable={isAccountPremium}
                isAccountPremium={isAccountPremium}
              />
              <ApplyDiscountButton
                disabled={!isAccountPremium}
                onClickApply={onClickApplyDiscount}
                style={{ marginTop: 20 }}
              />
            </View>
            {!isAccountPremium && (
              <Text
                style={{
                  color: Resources.colors.alto,
                  fontSize: 12,
                  width: "50%",
                }}
              >
                {"The feature is only available for premium accounts"}
              </Text>
            )}
          </View>
        </View>
        <View style={{ flex: 1, width: "50%" }}>
          <Text
            style={{
              color: Resources.colors.alto,
              fontWeight: "regular",
              marginTop: 40,
            }}
          >
            {
              "Enter the minimum and maximum amount of your budget price for your home service"
            }
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: 24,
            }}
          >
            <AmountServiceInput
              value={minAmount}
              setValue={setMinAmount}
              placeholder={"Minimum Amount"}
              onLostFocus={onLostFocusMinAmount}
              errorMessage={minAmountError}
            />
            <AmountServiceInput
              value={maxAmount}
              setValue={setMaxAmount}
              placeholder={"Maximum Amount"}
              onLostFocus={onLostFocusMaxAmount}
              errorMessage={maxAmountError}
            />
          </View>

          <ServiceNote value={note} setValue={setNote} />

          <BookServiceButton
            submitBookingService={submitBookingService}
            isGuest={currentUser && currentUser?.isAnonymous}
          />
        </View>
      </View>
    </View>
  );
}

function BookServiceScreen({ route }) {
  const {
    serviceId,
    serviceTypeName,
    serviceName,
    maxPrice,
    minPrice,
    serviceImage,
  } = route.params;
  const navigation = useNavigation();
  const [currentUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [fullName, setFullName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountErrorMessage, setDiscountErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [barangay, setBarangay] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [isAccountPremium, setIsAccountPremium] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [minAmount, setMinAmount] = useState(minPrice);
  const [maxAmount, setMaxAmount] = useState(maxPrice);
  const [minAmountError, setMinAmountError] = useState("");
  const [maxAmountError, setMaxAmountError] = useState("");

  const onDismissTimePicker = React.useCallback(() => {
    setTimePickerOpen(false);
  }, [setTimePickerOpen]);

  const onConfirmTimePicker = React.useCallback(({ hours, minutes }) => {
    setTimePickerOpen(false);

    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;

    const formatted = `${adjustedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    console.log(`Formatted hours ${formatted}`);
    setTime(formatted);
  }, []);

  const onDismissDatePicker = React.useCallback(() => {
    setDatePickerOpen(false);
  }, [setDatePickerOpen]);

  const onConfirmDatePicker = React.useCallback(
    (params) => {
      setDatePickerOpen(false);
      setDate(params.date);
    },
    [setDatePickerOpen, setDate]
  );
  useEffect(() => {
    const fetchUser = async () => {
      let currentUser =
        Platform.OS === "web"
          ? firebaseAuth.currentUser // Web
          : auth().currentUser; // Mobile

      setUser(currentUser); // Set the user state
      console.log("Current user is:", currentUser);
    };

    fetchUser();
  }, []);

  const { user, error } = getUserData(currentUser?.uid);
  useEffect(() => {
    if (user) {
      console.log(`Is account premium: ${user.isAccountPremium}`);
      setFullName(user.firstName + " " + user.lastName);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBarangay(user.barangay);
      setEmail(user.email);
      setCity(user.city);
      setProvince(user.province);
      setAddress(user.address);
      setPhoneNumber(user.phoneNumber);
      setIsAccountPremium(user.isAccountPremium);
      const fullAddress = [user.address, user.barangay, user.city]
        .filter((property) => property && property.trim()) // Filter out empty or whitespace-only properties
        .join(", "); // Join remaining properties with ", "

      setFullAddress(fullAddress);
    }
  }, [user]);

  const onClickApplyDiscount = React.useCallback(async () => {
    if (discountCode == "") {
      setDiscountErrorMessage("Please enter a discount code");
      return;
    }
    if (discountCode.startsWith("SAVE")) {
      const result = await isDiscountCodeExist(discountCode);
      if (result === null) {
        setDiscountErrorMessage("Discount doesn't exist");
        return;
      }

      setDiscountErrorMessage("");
      setDiscount(result.percentage);
      return;
    }
    if (discountCode.startsWith("LS")) {
      const result = await isVoucherCodeExist(discountCode);
      if (result === null) {
        setDiscountErrorMessage("Voucher doesn't exist");
        return;
      }

      setDiscountErrorMessage("");
      setDiscount(result.percentage);
      return;
    }
    setDiscountErrorMessage("Discount/Voucher code doesn't exist");
  }, [discountCode]);

  const submitBookingService = () => {
    const onSuccess = (docId) => {
      console.log(`Booking created successfully with ID: ${docId}`);
      setIsLoading(false);
      navigation.replace("Main"); // Replace to go directly to MainTabNavigator without the option to go back
      console.log(`User points ${user.points}`);
      navigation.navigate("Bookings");
    };

    const onFailure = (error) => {
      console.error("Failed to create booking:", error);
      setIsLoading(false);
    };

    const bookingData = {
      address: address,
      barangay: barangay,
      servicePhotoUrl: serviceImage,
      bookedService: serviceName,
      city: city,
      code: discountCode,
      date: date.toLocaleDateString(),
      time: time,
      email: email,
      discountPercentage: discount,
      isActive: true,
      isPaid: false,
      maxBudget: maxAmount,
      minBudget: minAmount,
      name: fullName,
      phoneNumber: phoneNumber,
      province: province,
      serviceId: serviceId,
      userId: currentUser?.uid,
      serviceFee: 0,
      totalAmount: 0,
      workerFullName: "",
      workerPhotoURL: "",
      workerPhoneNumber: "",
      workerId: "",
      note: note,
      fullAddress: fullAddress,
      admin_total: 0,
      admin_serviceFee: 0,
      admin_discountOrVoucher: 0,
      isDone: false,
      serviceTypeName: serviceTypeName,
      isRated: false,
    };

    const isMinAmountValid = minAmount >= minPrice;

    if (!isMinAmountValid) {
      setMinAmountError(`Amount must be greater than or equal to ₱${minPrice}`);
      return;
    }
    const isMaxAmountValid = maxAmount <= maxPrice;

    if (!isMaxAmountValid) {
      setMaxAmountError(`Amount must be less than or equal to ₱${maxPrice}`);
      return;
    }
    if (maxAmount == "") {
      setMaxAmountError("Please enter a valid amount");
      return;
    }
    if (minAmount == "") {
      setMinAmountError("Please enter a valid amount");
      return;
    }

    if (phoneNumber === "") {
      Alert.alert(
        "Please fill up your phone number", // Title
        "", // Message
        [
          {
            text: "Okay",
            onPress: () => {
              navigation.navigate("UserProfile");
            },
          },
        ]
      );
      return;
    }
    if (fullAddress === "") {
      Alert.alert(
        "Please fill up your address", // Title
        "", // Message
        [
          {
            text: "Okay",
            onPress: () => {
              navigation.navigate("UserProfile");
            },
          },
        ]
      );

      // Alert.alert('Please fill up your address');
      return;
    }

    console.log(`Booking data ${JSON.stringify(bookingData)}`);
    setIsLoading(true);

    createBookingService(bookingData, onSuccess, onFailure);
  };

  const onLostFocusMinAmount = React.useCallback(() => {
    const isMinAmountValid = minAmount >= minPrice;

    if (!isMinAmountValid) {
      setMinAmountError(`Amount must be greater than or equal to ₱${minPrice}`);
    }
  }, [minAmount, minPrice]);

  const onLostFocusMaxAmount = React.useCallback(() => {
    const isMaxAmountValid = maxAmount <= maxPrice;

    if (!isMaxAmountValid) {
      setMaxAmountError(`Amount must be less than or equal to ₱${maxPrice}`);
    }
  }, [maxAmount, maxPrice]);

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: Resources.colors.white }}
      />

      <TimePickerModal
        visible={isTimePickerOpen}
        onDismiss={onDismissTimePicker}
        onConfirm={onConfirmTimePicker}
        hours={12}
        minutes={14}
        label="Select time"
        animationType="fade"
      />

      <DatePickerModal
        locale="en"
        mode="single"
        visible={isDatePickerOpen}
        onDismiss={onDismissDatePicker}
        date={date}
        onConfirm={onConfirmDatePicker}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Resources.colors.white,
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {Platform.OS === "web" ? (
          <WebComponent
            isAccountPremium={isAccountPremium}
            minAmountError={minAmountError}
            maxAmountError={maxAmountError}
            name={fullName}
            setMinAmount={(amount) => {
              setMinAmount(amount);
              setMinAmountError("");
            }}
            setMaxAmount={(amount) => {
              setMaxAmount(amount);
              setMaxAmountError("");
            }}
            onLostFocusMaxAmount={onLostFocusMaxAmount}
            onLostFocusMinAmount={onLostFocusMinAmount}
            minAmount={minAmount.toString()}
            maxAmount={maxAmount.toString()}
            dateOfService={date.toLocaleDateString()}
            phoneNumber={phoneNumber}
            address={fullAddress}
            serviceName={serviceName}
            currentUser={currentUser}
            timeOfService={time}
            onClickServiceInput={() => {
              setDatePickerOpen(true);
            }}
            onClickServiceTime={() => {
              setTimePickerOpen(true);
            }}
            discountErrorMessage={discountErrorMessage}
            onClickApplyDiscount={onClickApplyDiscount}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            note={note}
            setNote={setNote}
            submitBookingService={submitBookingService}
          />
        ) : (
          <MobileComponent
            isAccountPremium={isAccountPremium}
            minAmountError={minAmountError}
            maxAmountError={maxAmountError}
            name={fullName}
            setMinAmount={(amount) => {
              setMinAmount(amount);
              setMinAmountError("");
            }}
            setMaxAmount={(amount) => {
              setMaxAmount(amount);
              setMaxAmountError("");
            }}
            currentUser={currentUser}
            serviceName={serviceName}
            onLostFocusMaxAmount={onLostFocusMaxAmount}
            onLostFocusMinAmount={onLostFocusMinAmount}
            minAmount={minAmount.toString()}
            maxAmount={maxAmount.toString()}
            dateOfService={date.toLocaleDateString()}
            phoneNumber={phoneNumber}
            address={fullAddress}
            timeOfService={time}
            onClickServiceInput={() => {
              setDatePickerOpen(true);
            }}
            onClickServiceTime={() => {
              setTimePickerOpen(true);
            }}
            discountErrorMessage={discountErrorMessage}
            onClickApplyDiscount={onClickApplyDiscount}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            note={note}
            setNote={setNote}
            submitBookingService={submitBookingService}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Resources.colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: "#007BFF", // Adjust for blue icons
    marginRight: 8,
    resizeMode: "center",
  },
  text: {
    fontSize: 14,
    // color: "#333",
    flex: 1, // Ensures the text wraps properly
  },
  inputService: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 12,
    width: "100%",
    alignSelf: "center",
    padding: 8,
    borderWidth: 1,
    color: Resources.colors.boulder,
    paddingLeft: 12,
    borderColor: Resources.colors.alto,
  },

  inputService_1: {
    marginHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
    width: "100%",
    padding: 8,
  },

  multilineInputContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
  },
  multilineInputContainerTextInput: {
    height: 150, // Fixed height or can be dynamic
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top", // Ensures text starts from the top-left corner
  },
});

export { BookServiceScreen, ContactDetail };
