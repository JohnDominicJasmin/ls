import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import TopAppBar from "../auth/components/TopAppBar";
import React, { useState, useEffect, useMemo } from "react";
import { getAllServices } from "../../utils/servicesDb";
import { FlatList } from "react-native";
import { ServiceItem } from "./Service";
import SearchBar from "../auth/components/SearchBar";
import { useNavigation } from "@react-navigation/native";
export default function SearchServices() {
    const navigation = useNavigation()
  const [services, setServices] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Filter services based on the search query
  const navigateBookService = (item) => {
    navigation.navigate("BookService", {
      serviceId: item.id,
      serviceName: item.name,
      maxPrice: item.max_price,
      minPrice: item.min_price,
      serviceTypeName: item.typeOfService,
      serviceImage: item.imageUrl
    });
  };
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services; // Return all services if searchQuery is empty
    return services?.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, services]);

  useEffect(() => {
    console.log(`Filtered Services: ${JSON.stringify(filteredServices)}`);
  }, [filteredServices]);
  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServices();
      setServices(result);
    };
    fetchServices();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ServiceItem
        imageUrl={item.imageUrl}
        itemName={item.name}
        includes={item.includes}
        asPerDescription={item.asperDescription}
        minPrice={item.min_price}
        maxPrice={item.max_price}
        rating={item.rating}
        onPress={ () => {
          navigateBookService(item)
        }}
      />
    );
  };
  return (
    <>
      <View style={styles.container}>
        <TopAppBar title="Search Services" />

        <SearchBar
          styleContainer={{ marginTop: 50, marginHorizontal: 14 }}
          isEditable={true}
          searchInput={searchQuery}
          onSearch={setSearchQuery}
        />
        <View style={{flex:1}}>
          <FlatList
            // contentContainerStyle={{ marginTop: 0, flexGrow: 1}}
            renderItem={renderItem}
        
            data={filteredServices}
            keyExtractor={(item, index) => item.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 150 }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.OS === "web" ? "50%" : "100%",
    alignSelf: "center",
    height: "100%",
  },
});
