import { View, StyleSheet, Text, FlatList, ScrollView, Platform } from "react-native";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { getUserData } from "../../utils/userDb";
import { useEffect, useState } from "react";
import { getDiscounts, getVouchers } from "../../utils/discountVoucher";
import { DiscountCard, VoucherCard } from "../../ui/DiscountCard";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
function VouchersScreen({ route }) {
  const { userId } = route.params;
  const [discounts, setDiscounts] = useState(null);
  const [vouchers, setVouchers] = useState(null);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchDiscounts = async () => {
      const result = await getDiscounts();
      setDiscounts(result);
    };
    fetchDiscounts();

    const fetchVouchers = async () => {
      const result = await getVouchers();
      setVouchers(result);
    };
    fetchVouchers();
  }, []);

  console.log(`User id ${userId}`)
  const { user, error } = getUserData(userId);

  const startBooking = () => {
    navigation.navigate("SearchServices")
  }
  const renderDiscountItem = ({ item, index }) => {
    return (
      <>
        <DiscountCard
          pointsRequired={item.percentage}
          textOff={item.percentageOffText}
          points={user?.points}
          codeText={item.code}
          everyPointsText={item.pointsEarnedText}
        />
      </>
    );
  };

  const renderVoucherItem = ({ item, index }) => {
    return (
      <>
        <VoucherCard
          textOff={item.priceOffText}
          codeText={item.code}
          everyPointsText={item.bookedEarnedFee}
        />
      </>
    );
  };

  return (
    <ScrollView>
      <View style={styles.parentContainer}>
        <BackIcon style={{ top: 12, left: 12 }} />

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: 'center',
            width: Platform.OS === 'web' ? '60%': '100%'
          }}
        >
          <View
            style={{
              marginTop: 20,
              width: 120, // Circle's width
              height: 120, // Circle's height (same as width)
              borderRadius: 150, // Half of the width/height for a perfect circle
              backgroundColor: "rgba(65,105,225,0.5)",

              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center", // Center the text inside the circle
            }}
          >
            <Text
              style={{
                color: Resources.colors.royalBlue,
                fontWeight: "semibold",
                fontSize: 50,
              }}
            >
              {user?.points?.toString() || "0"}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              gap: 6,
              paddingHorizontal: 14,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "semibold",
                color: Resources.colors.black,
              }}
            >
              {"LaborSeek Points"}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "regular",
                fontSize: 14,
              }}
            >
              {
                "Earn 1 LaborSeek Point for every booked service. Accumulate points to unlock exclusive discounts and voucher on your future bookings. Enjoy more value from our trusted home service professionals!"
              }
            </Text>
          </View>

          <View style={{
            width: '100%',
            marginBottom: 16,
            justifyContent: 'center'
          }}>
            <View
              style={{
                marginTop: 30,
                marginHorizontal: 14,
                width: '100%'
              }}
            >
              <Text
                style={{
                  color: Resources.colors.black,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {"Discounts"}
              </Text>
              <FlatList
                data={discounts}
                renderItem={renderDiscountItem}
                numColumns={Platform.OS === 'web' ? 4: 2}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              />

              <Text
                style={{
                  color: Resources.colors.black,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {"Vouchers"}
              </Text>
              <FlatList
                data={vouchers}
                renderItem={renderVoucherItem}
                numColumns={Platform.OS === 'web' ? 4: 2}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              />
            </View>

            <TouchableOpacity onPress={startBooking} style={{
                backgroundColor: Resources.colors.royalBlue,
                alignSelf: 'center',
                padding: 8,
                paddingHorizontal: 44,
                borderRadius: 12,
                marginVertical: 24,
                paddingVertical: 16
            }}>
                <Text style={{
                    color: Resources.colors.white,
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>{"Start Booking"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Resources.colors.white,
    width: "100%",
    height: "100%",
  },
});

export default VouchersScreen;
