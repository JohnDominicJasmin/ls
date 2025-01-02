import React from 'react';
import { TextInput, View, StyleSheet, Image, Platform } from 'react-native';
import Resources from '../../../src/Resources';

const SearchBar = ({styleContainer}) => {
  return (
    <View style={[styles.container, styleContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Search service here"
        placeholderTextColor={Resources.colors.silver}
      />
      <Image
        source={
          Resources.icons.ic_search
        }
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 40,
    marginHorizontal: 6,
    marginVertical: 8,
    backgroundColor: Resources.colors.white,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#C7C7C7',
  },
});

export default SearchBar;
