import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Resources from '../../../../src/Resources';

const NewNotificationCard = ({ name, description, date, time, onPress }) => {
  return (
    <TouchableOpacity  onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <View style={styles.statusDot} />
    </TouchableOpacity>
  );
};

const RecentNotificationCard = ({ name, description, date, time }) => {
    return (
        <View style={[styles.container, { backgroundColor: Resources.colors.white }]}>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.footer}>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>
        </View>
      );

}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
     pointerEvents: "auto",
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 12,
    color: '#888',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
});

export  {NewNotificationCard, RecentNotificationCard };
