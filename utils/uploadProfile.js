const uploadToCloudinary = async (imageUri, onSuccess, onFailure) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    data.append('upload_preset', 'labor-seek-preset'); // Replace with your preset name
  
    try {
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
        onSuccess(result.secure_url); // Call the success callback with the secure URL
        Alert.alert('Upload Successful!', `Image URL: ${result.secure_url}`);
      } else {
        throw new Error(result.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      onFailure(error); // Call the failure callback with the error
      Alert.alert('Error uploading to Cloudinary', error.message);
    }
  };
  