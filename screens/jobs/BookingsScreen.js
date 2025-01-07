import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import CreateAnAccountSection from "../auth/components/CreateAnAccountSection";
import TopAppBar from "../auth/components/TopAppBar";
import { FlatList } from "react-native";
import { ContactDetail } from "./BookServiceScreen";
import WorkerDetails from "../../ui/WorkerDetails";
const ACTIVE = "Active";
const DONE = "Done";

const mockData = [
  {
    photoUrl:
      "https://res.cloudinary.com/drbsytcgb/image/upload/v1736172117/Washing_Machine_Repair_gifdy2.png",
    name: "Sample Name",
    dateCreated: "November 12, 2024",
    timeCreated: "9:08 PM",
    minAmount: 1000,
    maxAmount: 2000,
    address: "123 Sampaguita St. San Vicente, Sto. Tomas, Batangas",
    phoneNumber: "+63 952 852 5528",
    isExpanded: true,
    workerDetails: {
        workerPhoto: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        workerName: "John Dominic",
        serviceFee: 1800,
        discount: 500,
        total: 2000
    }
  },
  {
    photoUrl:
      "https://res.cloudinary.com/drbsytcgb/image/upload/v1736172117/Washing_Machine_Repair_gifdy2.png",
    name: "John Name",
    dateCreated: "November 3, 2024",
    timeCreated: "1:08 PM",
    minAmount: 1400,
    maxAmount: 2300,
    address: "123 Sampaguita St. San Vicente, Sto. Tomas, Batangas",
    phoneNumber: "+63 952 852 5528",
    isExpanded: false,
    workerDetails: {
        workerPhoto: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        workerName: "John Dominic",
        serviceFee: 1800,
        discount: 500,
        total: 2000
    }
  },
];
const GuestAccountDisplay = ({ onClickCreateAccount, onClickLogin }) => (
  <View style={styles.guestContainer}>
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image
        source={Resources.icons.ic_calendar_bookings}
        style={styles.calendarIcon}
      />
      <Text style={styles.guestTextTitle}>View your Bookings</Text>
      <Text style={styles.guestTextDescription}>
        Manage and view your bookings of home services here in LaborSeek
      </Text>
    </View>

    <CreateAnAccountSection
      style={{ marginTop: 28 }}
      onClickLogin={onClickLogin}
      onClickCreateAccount={onClickCreateAccount}
    />
  </View>
);
function Indicator({ indicatorActive, selectIndicator }) {
  const getBorderBottomColor = (indicator) => {
    return indicatorActive === indicator
      ? Resources.colors.royalBlue
      : Resources.colors.white;
  };

  // Use memoized values for specific indicators
  const activeBorderColor = useMemo(
    () => getBorderBottomColor(ACTIVE),
    [indicatorActive]
  );
  const doneBorderColor = useMemo(
    () => getBorderBottomColor(DONE),
    [indicatorActive]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 24,
      }}
    >
      <TouchableOpacity
        style={[styles.indicator, { borderBottomColor: activeBorderColor }]}
        onPress={() => {
          selectIndicator(ACTIVE);
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color:
              indicatorActive === ACTIVE
                ? Resources.colors.royalBlue
                : Resources.colors.boulder,
          }}
        >
          {"Active"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.indicator, { borderBottomColor: doneBorderColor }]}
        onPress={() => {
          selectIndicator(DONE); // Ensure DONE is passed here for distinction
        }}
      >
        <Text
          style={{
            fontSize: 18,

            color:
              indicatorActive === DONE
                ? Resources.colors.royalBlue
                : Resources.colors.boulder,
          }}
        >
          {"Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const DashedDivider = () => {
    return <View style={styles.dashedLine} />;
  };
function ServiceItem({
  photoUrl,
  name,
  dateCreated,
  timeCreated,
  minAmount,
  maxAmount,
  isExpanded,
  onClickCancel,
  onExpand,
  workerDetails
}) {
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
          source={{ uri: photoUrl }}
          style={{ height: 100, width: "40%", resizeMode: "cover" }}
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
            }}
          >
            {name}
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
                  timeCreated === ""
                    ? Resources.colors.white
                    : Resources.colors.boulder,
              }}
            >
              {dateCreated}
            </Text>
            <Text>{timeCreated}</Text>
          </View>

          <Text>{`Amount Range: ${minAmount} - ${maxAmount}`}</Text>
        </View>
      </View>

      {isExpanded && (
        <View style={{
            paddingHorizontal: 8
        }}>
          <ContactDetail
            style={{ gap: 4 }}
            address={"Sample Address"}
            phoneNumber={"09263208902"}
          />
          <DashedDivider/>
          {workerDetails !== undefined&& (<WorkerDetails workerPhotoUrl={workerDetails.workerPhoto} workerName={workerDetails.workerName} serviceFee={workerDetails.serviceFee} discount={workerDetails.discount} total={workerDetails.total} />)}
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingBottom: 8,
          paddingTop: 12,
        }}
      >
        <TouchableOpacity onPress={onClickCancel}>
          <Text>{"Cancel"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onExpand}>
          {isExpanded ? (
            <Text
              style={{
                color: Resources.colors.royalBlue,
              }}
            >
              {"See More"}
            </Text>
          ) : (
            <Text
              style={{
                color: Resources.colors.royalBlue,
              }}
            >
              {"See Less"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
function MobileContent({ indicatorActive, selectIndicator }) {
  const renderItem = ({ item, index }) => {
    return (
      <ServiceItem
        photoUrl={item.photoUrl}
        name={item.name}
        dateCreated={item.dateCreated}
        timeCreated={item.timeCreated}
        minAmount={item.minAmount}
        maxAmount={item.maxAmount}
        isExpanded={item.isExpanded}
        workerDetails={item.workerDetails}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: Resources.colors.white,
        marginTop: 34,
        width: "100%",
      }}
    >
      <Indicator
        indicatorActive={indicatorActive}
        selectIndicator={selectIndicator}
      />

 
  <FlatList
    data={mockData}
    style={{
      marginHorizontal: 20,
    }}
    ListFooterComponent={<View />}
    ListFooterComponentStyle={{height:150}}
    contentContainerStyle={{
      paddingBottom: 50, // Add bottom padding
    }}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()} // Use a unique key if available
  />
 
    </View>
  );
}

function WebComponent() {}

function BookingsScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [selectedIndicator, setSelectedIndicator] = useState(ACTIVE);

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

  const onClickCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const onClickLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.container}>
        <TopAppBar title="Booked Home Services" />
        {user && user.isAnonymous ? (
          <GuestAccountDisplay
            onClickCreateAccount={onClickCreateAccount}
            onClickLogin={onClickLogin}
          />
        ) : (
          <>
            {Platform.OS === "web" ? (
              <WebComponent />
            ) : (
              <MobileContent
                selectIndicator={setSelectedIndicator}
                indicatorActive={selectedIndicator}
              />
            )}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

    alignItems: "center",
    backgroundColor: Resources.colors.white,
  },
  guestContainer: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "column",
    gap: 40,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarIcon: {
    height: 100,
    width: 300,
    borderWidth: 1,
    resizeMode: "center",
    marginBottom: 24,
  },
  guestTextTitle: {
    fontSize: 26,
    color: Resources.colors.black,
  },
  guestTextDescription: {
    fontSize: 13,
    maxWidth: 300,
    color: Resources.colors.black,
    textAlign: "center",
  },
  indicator: {
    flex: 1, // Equal width for each TouchableOpacity
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginHorizontal: 24,
  },
  serviceItem: {
    flexDirection: "column",
    height: "auto",
    marginVertical: 8,
    padding: 8, // Optional for spacing inside the container
    borderRadius: 12, // For rounded corners
    backgroundColor: "#fff", // Background color is necessary for shadows to be visible
    borderColor: Resources.colors.alto,
    borderWidth: 0.5,
  },
  dashedLine: {
    marginVertical: 16,
    borderWidth: 0.9, // Thickness of the line
    borderColor: Resources.colors.alto, // Color of the line
    borderStyle: 'dashed', // Make the line dashed
    width: '100%', // Full width of the container
    alignSelf: 'center', // Center align the line
  },
});
export default BookingsScreen;
