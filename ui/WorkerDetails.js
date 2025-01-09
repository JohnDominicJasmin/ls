import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Resources from '../src/Resources';

const WorkerDetails = ({workerPhotoUrl, workerName, isPaid, serviceFee, discount, total}) => {
  return (
    <View style={styles.container}>
      {/* Worker Details */}
      <Text style={styles.sectionTitle}>Worker Details</Text>
      <View style={styles.workerRow}>
        <Image
          source={workerPhotoUrl === ''? Resources.images.ic_profile : { uri: workerPhotoUrl }} // Replace with the actual image URL
          style={styles.workerImage}
        />
        <Text style={styles.workerName}>{workerName}</Text>
      </View>

      {/* Service Fee and Discount */}
      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Service Fee</Text>
        <Text style={styles.detailValue}>₱ {serviceFee}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Discount or Voucher</Text>
        <Text style={styles.detailValue}>₱ {discount}</Text>
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <View style={styles.totalColumn}>
          <Text style={styles.notPaidText}>{isPaid ? 'Paid': 'Not yet Paid'}</Text>
          <Text style={styles.totalValue}>₱ {total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  workerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Resources.colors.black
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalColumn: {
    alignItems: 'flex-end',
  },
  notPaidText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkerDetails;
