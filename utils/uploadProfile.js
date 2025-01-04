import { Alert } from 'react-native';

const uploadToCloudinary = async (imageUri, onSuccess, onFailure) => {
  try {
    // Create FormData object

    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      name: 'photo.jpg', // Ensure the name has a valid extension
      type: 'image/jpeg', // Adjust type based on your image format
    });
    data.append('upload_preset', 'labor-seek-preset'); // Replace with your preset name

    // Send request to Cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/drbsytcgb/image/upload',
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the content type is set
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log('Uploaded to Cloudinary:', result);
      onSuccess(result.secure_url); // Trigger success callback with the secure URL
      Alert.alert('Upload Successful!', `Image URL: ${result.secure_url}`);
    } else {
      throw new Error(result.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    onFailure(error); // Trigger failure callback with the error
    Alert.alert('Error Uploading to Cloudinary', error.message);
  }
};

export default uploadToCloudinary;
