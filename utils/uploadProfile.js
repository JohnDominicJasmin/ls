import { Platform } from 'react-native';
const uploadToCloudinary = async (imageUri, onSuccess, onFailure) => {
  try {
    console.log('Image URI:', imageUri);

    // Create FormData object
    const data = new FormData();

    // Append Base64 string as file

    if(Platform.OS === 'web'){
        data.append('file', imageUri); // Directly use the Base64 string
    }else{
        data.append('file', {
            uri: imageUri,
            name: 'photo.jpg', // Ensure the name has a valid extension
            type: 'image/jpeg', // Adjust type based on your image format
          });
          data.append('upload_preset', 'labor-seek-preset'); // Replace with your preset name
      
    }
    data.append('upload_preset', 'labor-seek-preset'); // Ensure this matches your Cloudinary preset

    // Send request to Cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/drbsytcgb/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log('Uploaded to Cloudinary:', result);
      onSuccess(result.secure_url); // Success callback
    } else {
      throw new Error(result.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    onFailure(error); // Failure callback
  }
};

export default uploadToCloudinary;
