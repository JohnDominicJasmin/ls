import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import Resources from "../src/Resources";

function UploadReceipt({ onClickUpload, onClickSubmit, imageName, uploadReceiptError, handleRemoveFile}) {
  return (
    <View style={[styles.container, Platform.OS === 'web' && { maxWidth: '100%' }]}>

      <Text
        style={{
          fontSize: 14,
          alignSelf: "flex-start",
          marginBottom: 8,
        }}
      >
        Upload Receipt
      </Text>

      <TouchableOpacity
      onPress={onClickUpload}
        style={{
          width: "100%",
        }}
      >
        <View style={styles.uploadBox}>
          <Image source={Resources.icons.ic_upload} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Select a photo to upload</Text>
        </View>
      </TouchableOpacity>

{   imageName &&     (<View style={styles.filePreview}>
            <View style={styles.fileDetails}>
              <Image
                source={Resources.icons.ic_image_icon}
                style={styles.fileIcon}
              />
              <Text style={styles.fileName} numberOfLines={2} >{imageName}</Text>
            </View>
            <TouchableOpacity onPress={handleRemoveFile}>
              <Text style={styles.removeButton}>✕</Text>
            </TouchableOpacity>
          </View>)}

        <Text
          style={{
            color: Resources.colors.red,
            fontSize: 12,
            marginTop: 4, 
            alignSelf: 'flex-start'
          }}
        >
          {uploadReceiptError}
        </Text>
      

      <TouchableOpacity style={styles.button} onPress={onClickSubmit}>
        <Text style={styles.buttonText}>Get Premium</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Resources.colors.white, // Light background color
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  uploadBox: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C4C4C4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  uploadIcon: {
    width: 40,
    height: 40,
    tintColor: "#C4C4C4", // Light gray color
    marginBottom: 8,
  },
  uploadText: {
    color: "#C4C4C4",
    fontSize: 14,
  },
  button: {
    width: "90%",
    height: 48,
    backgroundColor: "#3366FF", // Blue button color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  filePreview: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fileDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  fileName: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,          // Shrinks the text to prevent overflow
    flexWrap: "wrap",       // Wraps text to next line when needed
    width: '80%',           // Limit the width to 80% of the parent to allow space for the remove button
  },
  removeButton: {
    fontSize: 16,
    color: "#FF0000",
    fontWeight: "bold",
  },
});
export default UploadReceipt;
