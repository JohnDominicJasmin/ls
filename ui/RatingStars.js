import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Use FontAwesome for star icons
import Resources from '../src/Resources';

const RatingStars = ({rating, setRating}) => {

  // Render a single star
  const renderStar = (index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)} // Update rating when a star is pressed
      >
        <FontAwesome
          name={index < rating ? 'star' : 'star-o'} // Filled star or outlined star
          size={32}
          color={index < rating ? Resources.colors.royalBlue : '#888888'} // Gold for selected, gray for unselected
          style={styles.star}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>{[...Array(5)].map((_, index) => renderStar(index))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default RatingStars;
