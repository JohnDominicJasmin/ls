import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import TopAppBar from "../auth/components/TopAppBar";
import Resources from "../../src/Resources";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../utils/userDb";
import DatePicker from "react-native-date-picker";
import { isDiscountCodeExist, createBookingService } from "../../utils/bookingDb";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";

const ContactDetail = ({ style, address, phoneNumber }) => {
  return (
    <>
      <View style={style}>
        <View style={styles.row}>
          <Image source={Resources.icons.ic_location} style={styles.icon} />
          <Text style={styles.text}>{address}</Text>
        </View>

        <View style={styles.row}>
          <Image source={Resources.icons.ic_telephone} style={styles.icon} />
          <Text style={styles.text}>{phoneNumber}</Text>
        </View>
      </View>
    </>
  );
};
const ContactCard = ({ name, address, phoneNumber }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.name}>{name}</Text>

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
}) => {
  return (
    <TouchableOpacity
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
      </View>
    </TouchableOpacity>
  );
};

const TimeOfServiceInput = ({
  placeholder,
  style,
  value,
  setValue,
  keyboardType,
  returnKeyType,
}) => {
  return (
    <View
      style={[
        {
          flex: 1, // Ensures equal width
          marginLeft: 8, // Adds spacing between inputs (optional)
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
          flexDirection: "row",
          borderWidth: 1,
          borderColor: Resources.colors.alto,
          borderRadius: 12,
          marginTop: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          style={styles.inputService_1}
        />
      </View>
    </View>
  );
};

const MultilineTextInputExample = ({ value, setValue }) => {
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
  keyboardType,
  returnKeyType,
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
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          style={[styles.inputService_1, { paddingLeft: 28 }]}
        />
      </View>
    </View>
  );
};

function MobileComponent({
  name,
  address,
  phoneNumber,
  onClickServiceInput,
  dateOfService,
  onClickServiceTime,
  timeOfService
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
        {"Service Name"}
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
      <ServiceInput
        style={{ width: "48%", marginTop: 16 }}
        placeholder={"Discount or Voucher Code"}
      />

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
        <AmountServiceInput placeholder={"Minimum Amount"} />
        <AmountServiceInput placeholder={"Maximum Amount"} />
      </View>

      <MultilineTextInputExample />

      <TouchableOpacity
        style={{
          backgroundColor: Resources.colors.royalBlue,
          alignSelf: "center", // Ensures the button width matches its content
          paddingHorizontal: 40, // Adds padding around the text
          paddingVertical: 16, // Adds padding for height
          borderRadius: 8, // Optional: Rounds the button corners
          marginVertical: 16,
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
    </>
  );
}

function WebComponent() {
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
          <ContactCard />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 34,
            }}
          >
            {"Service Name"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 34,
            }}
          >
            <ServiceInput placeholder={"Date of Service"} />
            <TimeOfServiceInput placeholder={"Time of Service"} />
          </View>
          <ServiceInput
            style={{ width: "50%" }}
            placeholder={"Discount or Voucher Code"}
          />
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
            <AmountServiceInput placeholder={"Minimum Amount"} />
            <AmountServiceInput placeholder={"Maximum Amount"} />
          </View>

          <MultilineTextInputExample />

          <TouchableOpacity
            style={{
              backgroundColor: Resources.colors.royalBlue,
              alignSelf: "center", // Ensures the button width matches its content
              paddingHorizontal: 40, // Adds padding around the text
              paddingVertical: 16, // Adds padding for height
              borderRadius: 8, // Optional: Rounds the button corners
              marginVertical: 16,
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
        </View>
      </View>
    </View>
  );
}

function BookServiceScreen() {
  const [currentUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);


  const [fullName, setFullName] = useState("");

  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [fullAddress, setFullAddress] = useState("")
    const [barangay, setBarangay] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      let firebaseUser;
      if (Platform.OS === "web") {
        firebaseUser = firebaseAuth.currentUser; // Web Firebase Auth
      } else {
        firebaseUser = auth().currentUser; // Mobile Firebase Auth
      }

      setUser(firebaseUser); // Set the user state
    };

    fetchUser();
    setIsLoading(false);
  }, []);

  const { user, error } = getUserData(currentUser?.uid);
  useEffect(() => {
    if (user) {
      if (user) {
        setFullName(user.firstName + " " + user.lastName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setBarangay(user.barangay);
        setCity(user.city);
        setProvince(user.province);
        setAddress(user.address)
        setPhoneNumber(user.phoneNumber);
        const fullAddress =
          user.address +
          ", " +
          user.barangay +
          ", " +
          user.city +
          ", " +
          user.province;
        setFullAddress(fullAddress);
      }
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <DatePicker
        modal
        open={isDatePickerOpen}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setDatePickerOpen(false);
          setDate(date);
          console.log(`Date is ${date}`);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />

      <DatePicker
        modal
        open={isTimePickerOpen}
        mode="time"
        date={time}
        onConfirm={(time) => {
          setTimePickerOpen(false);
          setTime(time);
        }}
        onCancel={() => {
          setTimePickerOpen(false);
        }}
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
          <WebComponent />
        ) : (
          <MobileComponent
            name={fullName}
            dateOfService={date.toLocaleDateString()}
            phoneNumber={phoneNumber}
            address={address}
            timeOfService={time.toLocaleTimeString()}
            onClickServiceInput={() => {
              setDatePickerOpen(true);
            }}
            onClickServiceTime={() => {
                setTimePickerOpen(true)
            }}

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
    color: "#333",
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
