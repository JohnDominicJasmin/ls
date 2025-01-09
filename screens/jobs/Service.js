import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import {
  getServiceByType,
  getRatingsByServiceType,
} from "../../utils/servicesDb";
import { useState, useEffect } from "react";
import { average } from "firebase/firestore";

const ReviewsSection = ({ ratings, averageRating }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={styles.reviewItemContainer}>
          <View style={styles.textContainerItemRating}>
            <Text style={styles.usernameItemRating}>{item.name}</Text>
            <Text style={styles.commentItemRating}>{item.comment}</Text>
          </View>
          <View style={styles.ratingContainerItemRating}>
            <Image
              source={Resources.icons.ic_star}
              style={styles.starIconItemRating}
            />
            <Text style={styles.ratingItemRating}>{averageRating}</Text>
          </View>
        </View>

        <View style={styles.dividerItemRating} />
      </View>
    );
  };
  return (
    <>
      {ratings?.length > 0 && (
        <View style={styles.containerItemRating}>
          {/* Section Title */}
          <Text style={styles.titleItemRating}>Ratings and Reviews</Text>
          <FlatList
            data={ratings}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );
};
const ServiceItem = ({
  containerStyle,
  imageUrl,
  itemName,
  minPrice,
  maxPrice,
  includes,
  rating,
  asPerDescription,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.cardContainer, containerStyle]}>
        {/* Image Section */}
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{itemName}</Text>
          {includes !== "" && (
            <Text
              style={styles.includes}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {includes}
            </Text>
          )}

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={styles.price}>
              ₱ {minPrice} - {maxPrice}
            </Text>
            <Text style={styles.description}>{asPerDescription}</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          {rating !== undefined && <Text style={styles.rating}>{rating}</Text>}
        </View>
      </View>
    </Pressable>
  );
};
function MobileComponent({
  openBookService,
  imageUrl,
  services,
  ratings,
  averageRating,
}) {
  const renderItem = ({ item }) => {
    return (
      <ServiceItem
        onPress={() => {
          openBookService(item);
        }}
        itemName={item.name}
        imageUrl={item.imageUrl}
        includes={item.includes}
        asPerDescription={item.asperDescription}
        minPrice={item.min_price}
        maxPrice={item.max_price}
        rating={item.rating}
      />
    );
  };
  return (
    <View
      style={{
        backgroundColor: Resources.colors.white,
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <View>
        <Image
          style={{
            width: "100%",
            height: 250,
            resizeMode: "cover",
          }}
          source={{ uri: imageUrl }}
        />
        <BackIcon
          style={{
            backgroundColor: Resources.colors.white,
            position: "absolute",
            borderRadius: 50,
            padding: 4,
            top: 8,
            left: 4,
          }}
        />
      </View>

      <View>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <ReviewsSection ratings={ratings} averageRating={averageRating} />
      </View>
    </View>
  );
}

function WebComponent({
  openBookService,
  imageUrl,
  services,
  ratings,
  averageRating,
}) {
  const renderItem = ({ item }) => {
    return (
      <ServiceItem
        onPress={() => {
          openBookService(item);
        }}
        containerStyle={{ width: 450, padding: 5 }}
        itemName={item.name}
        imageUrl={item.imageUrl}
        includes={item.includes}
        asPerDescription={item.asperDescription}
        minPrice={item.min_price}
        maxPrice={item.max_price}
        rating={item.rating}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BackIcon
        style={{
          top: 8,
          left: 8,
        }}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: 32,
          marginTop: 20,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Image
            style={{
              width: "70%",
              height: 300,
              resizeMode: "cover",
            }}
            source={{ uri: imageUrl }}
          />
          <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "35%",
          }}
        >
        <ReviewsSection ratings={ratings} averageRating={averageRating} />

        </View>
      </View>
    </View>
  );
}

export default function ServiceScreen({ route }) {
  const navigation = useNavigation();
  const { name, image } = route.params;
  const [services, setServices] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const navigateBookService = (item) => {
    navigation.navigate("BookService", {
      serviceId: item.id,
      serviceName: item.name,
      maxPrice: item.max_price,
      minPrice: item.min_price,
      serviceTypeName: name,
      serviceImage: item.imageUrl
    });
  };

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await getServiceByType(name);
      console.log(`Featched services are ${JSON.stringify(fetchedServices)}`);
      setServices(fetchedServices);
    };

    fetchServices();
  }, [name]);

  useEffect(() => {
    const fetchRatings = async () => {
      const { averageRating, ratings } = await getRatingsByServiceType(name);
      console.log(`Featched ratings are ${JSON.stringify(ratings)} - ${name}`);
      setRatings(ratings);
      setAverageRating(averageRating);
    };

    fetchRatings();
  }, [name]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {Platform.OS === "web" ? (
          <WebComponent
            openBookService={navigateBookService}
            imageUrl={image}
            services={services}
            ratings={ratings}
            averageRating={averageRating}
          />
        ) : (
          <MobileComponent
            openBookService={navigateBookService}
            imageUrl={image}
            services={services}
            ratings={ratings}
            averageRating={averageRating}
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  image: {
    width: "35%",
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    width: "90%",
    marginBottom: 4,
  },
  includes: {
    fontSize: 14,
    flexWrap: "wrap", // Allow wrapping
    color: "#555",
    maxWidth: "100%", // Adjust as needed
    flex: 1,
  },
  price: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#555",
    alignSelf: "flex-end",
    marginBottom: 2,
    fontWeight: "semi-bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "green",
  },

  containerItemRating: {
    padding: 16,
    backgroundColor: "#fff",
  },
  titleItemRating: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  reviewItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainerItemRating: {
    flex: 1,
  },
  usernameItemRating: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentItemRating: {
    fontSize: 14,
    color: "#555",
  },
  ratingContainerItemRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIconItemRating: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: "green", // Optional, for star color
  },
  ratingItemRating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  dividerItemRating: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 8,
  },
});
