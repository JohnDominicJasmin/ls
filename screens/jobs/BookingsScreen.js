import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
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
import {
  cancelBooking,
  markAsRated,
  useActiveUserBookings,
  useDoneUserBookings,
} from "../../utils/bookingDb";

import { rateService } from "../../utils/servicesDb";

import { Button, Dialog, CheckBox, ListItem, Avatar } from "@rneui/themed";
import RatingStars from "../../ui/RatingStars";
const ACTIVE = "Active";
const DONE = "Done";

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
const RateAndPaidSection = ({ onClickRate, onClickPaid }) => {
  return (
    <>
      <View style={{ flexDirection: "row", gap: 8, marginVertical: 12 }}>
        <TouchableOpacity
          onPress={onClickRate}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: Resources.colors.royalBlue,
              justifyContent: "center",
              borderRadius: 8,
              gap: 8,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: Resources.colors.royalBlue,
              }}
              source={Resources.icons.ic_star}
            />
            <Text style={{ color: Resources.colors.royalBlue }}>{"Rate"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClickPaid}
          style={{
            flex: 1,
            justifyContent: "center",
            borderRadius: 8,
            gap: 8,
            paddingVertical: 12,
            alignItems: "center",
            backgroundColor: Resources.colors.royalBlue,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Resources.colors.white,
              fontWeight: "semibold",
            }}
          >
            {"Mark as Paid"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
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
  workerId,
  workerName,
  workerPhotoUrl,
  serviceFee,
  discount,
  total,

  address,
  phoneNumber,
  isPaid,
  isDone,
  isActive,

  onClickRate,
  onClickPaid,
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
        <View
          style={{
            paddingHorizontal: 8,
          }}
        >
          <ContactDetail
            style={{ gap: 4 }}
            address={address}
            phoneNumber={phoneNumber}
          />
          <DashedDivider />
          {workerName !== "" ? (
            <View>
              <WorkerDetails
                isPaid={isPaid}
                workerPhotoUrl={workerPhotoUrl}
                workerName={workerName}
                serviceFee={serviceFee}
                discount={discount}
                total={total}
              />
              {isActive && !isDone && (
                <>
                  <RateAndPaidSection
                    onClickPaid={onClickPaid}
                    onClickRate={onClickRate}
                  />
                </>
              )}
            </View>
          ) : (
            <>
              <Text
                style={{
                  padding: 16,
                  fontSize: 14,
                  color: Resources.colors.alto,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {"Worker Details will be added here later"}
              </Text>
            </>
          )}
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
              {"See Less"}
            </Text>
          ) : (
            <Text
              style={{
                color: Resources.colors.royalBlue,
              }}
            >
              {"See More"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
function MobileContent({
  indicatorActive,
  selectIndicator,
  doneBookings,
  bookings,
  cancelBooking,

  onClickRate,
  onClickPaid,
}) {
  const [itemExpanded, setItemExpanded] = useState("");

  const renderItem = ({ item, index }) => {
    return (
      <ServiceItem
        photoUrl={item.servicePhotoUrl}
        name={item.name}
        dateCreated={item.date}
        timeCreated={item.time}
        minAmount={item.minBudget}
        maxAmount={item.maxBudget}
        address={item.fullAddress}
        phoneNumber={item.phoneNumber}
        workerId={item.serviceId}
        isDone={item.isDone}
        workerName={item.workerFullName}
        workerPhotoUrl={item.workerPhotoURL}
        serviceFee={item.admin_serviceFee}
        discount={item.admin_discountOrVoucher}
        total={item.totalAmount}
        isActive={item.isActive}
        isPaid={item.isPaid}
        onClickCancel={() => cancelBooking(item.id)}
        onExpand={() => {
          if (itemExpanded == item.id) {
            setItemExpanded("");
            return;
          }
          setItemExpanded(item.id);
        }}
        isExpanded={itemExpanded == item.id}
        onClickPaid={() => onClickPaid(item.id)}
        onClickRate={() => onClickRate(item)}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: Resources.colors.white,
        marginTop: 34,
        width: "100%",
        height: "100%",
      }}
    >
      <Indicator
        indicatorActive={indicatorActive}
        selectIndicator={selectIndicator}
      />

      <FlatList
        data={indicatorActive === ACTIVE ? bookings : doneBookings}
        style={{
          marginHorizontal: 20,
        }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 150 }}
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
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [ratingItem, setRatingItem] = useState(null);
  const [ratingComment, setRatingComment] = useState("");
  const [rating, setRating] = useState(0);

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

  const { doneBookings, bookingsError } = useDoneUserBookings(user?.uid);
  const { userBookings, error } = useActiveUserBookings(user?.uid);

  const onClickCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const onClickLogin = () => {
    navigation.navigate("Login");
  };

  const onClickCancelBooking = React.useCallback((id) => {
    setCancelBookingId(id);
  }, []);

  const onDismissCancelBookingDialog = React.useCallback(() => {
    setCancelBookingId(null);
  }, []);

  const confirmBookingCancellation = React.useCallback(async () => {
    await cancelBooking(
      cancelBookingId,
      (successMessage) => {
        const filteredBookings = userBookings.filter(
          (item) => item.id !== cancelBookingId
        );
        setCancelBookingId(null);
      },
      (error) => {
        console.error("Failed to cancel booking:", error);
      }
    );
  }, [cancelBookingId]);

  const onClickRate = React.useCallback((item) => {
    setRatingItem(item);
    console.log(`Rating item is ${JSON.stringify(item)}`);
  }, []);

  const onDismissRatingDialog = React.useCallback(() => {
    setRatingItem(null);
    setRatingComment("");
    setRating(0);
  }, []);

  const confirmRating = React.useCallback(async () => {
    setRatingItem(null);
    setRatingComment("");
    setRating(0);
    const data = {
      comment: ratingComment,
      name: ratingItem.name,
      rating: rating,
      serviceType: ratingItem.serviceTypeName,
    };

    await rateService(
      data,
      () => {

        markAsRated(
          ratingItem.id,
          () => {
              console.log('Rated successfully')

          },
          () => {
            console.log('Rated failed')
            
          }
        );
      },
      () => {}
    );
  }, [ratingItem, ratingComment, rating, ratingItem]);

  const onClickPaid = React.useCallback((id) => {}, []);

  return (
    <>
      <View style={styles.container}>
        <TopAppBar title="Booked Home Services" />

        <Dialog
          isVisible={cancelBookingId !== null}
          onBackdropPress={onDismissCancelBookingDialog}
        >
          <Dialog.Title title="Cancel Booked Service?" />
          <Text>Are you sure you want to cancel your booked service?</Text>
          <Dialog.Actions>
            <Dialog.Button
              title="Confirm Cancellation"
              onPress={confirmBookingCancellation}
            />
            <Dialog.Button
              title="Keep Booking"
              onPress={onDismissCancelBookingDialog}
            />
          </Dialog.Actions>
        </Dialog>

        <Dialog
          isVisible={ratingItem !== null}
          onBackdropPress={onDismissRatingDialog}
        >
          <Dialog.Title title="Rate Booked Service" />
          <Text>How would you rate your booked service?</Text>
          <RatingStars rating={rating} setRating={setRating} />
          <TextInput
            style={styles.textInput}
            placeholder="Write your comment here..."
            value={ratingComment}
            onChangeText={setRatingComment}
            multiline
            numberOfLines={3}
          />
          <Dialog.Actions>
            <Dialog.Button
              title="Confirm Cancellation"
              onPress={confirmRating}
            />
            <Dialog.Button
              title="Keep Booking"
              onPress={onDismissRatingDialog}
            />
          </Dialog.Actions>
        </Dialog>

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
                bookings={userBookings}
                doneBookings={doneBookings}
                selectIndicator={setSelectedIndicator}
                indicatorActive={selectedIndicator}
                cancelBooking={onClickCancelBooking}
                onClickPaid={onClickPaid}
                onClickRate={onClickRate}
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
    borderStyle: "dashed", // Make the line dashed
    width: "100%", // Full width of the container
    alignSelf: "center", // Center align the line
  },
  textInput: {
    height: 100,
    width: "100%",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    textAlignVertical: "top",
  },
});
export default BookingsScreen;
