import database from '@react-native-firebase/database';

export async function addNotification(userId, notification) {
  try {
    const newNotificationRef = database().ref(`users/${userId}/notifications`).push();
    await newNotificationRef.set(notification); // Use 'set' directly on the reference
    console.log('Notification added successfully!');
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
}

// Function to get all notifications for a specific user
export async function getNotifications(userId) {
  return database()
    .ref(`users/${userId}/notifications`)
    .orderByChild('timeCreated') // Optional: Sort by timeCreated
    .once('value')
    .then(snapshot => {
      const notifications = snapshot.val();
      console.log('User notifications:', notifications);
      return notifications;
    })
    .catch((error) => {
      console.error('Error fetching notifications:', error);
      throw error;
    });
}

// Function to mark a notification as read
export async function markNotificationAsRead(userId, notificationId) {
  const notificationRef = database().ref(`users/${userId}/notifications/${notificationId}`);
  return notificationRef.update({ isRead: true })
    .then(() => {
      console.log('Notification marked as read!');
    })
    .catch((error) => {
      console.error('Error marking notification as read:', error);
      throw error;
    });
}

// Function to fetch unread notifications for a user
export async function getUnreadNotifications(userId) {
  return database()
    .ref(`users/${userId}/notifications`)
    .orderByChild('isRead')
    .equalTo(false) // Only get notifications that are unread
    .once('value')
    .then(snapshot => {
      const unreadNotifications = snapshot.val();
      console.log('Unread notifications:', unreadNotifications);
      return unreadNotifications;
    })
    .catch((error) => {
      console.error('Error fetching unread notifications:', error);
      throw error;
    });
}

// Function to delete a notification
export async function deleteNotification(userId, notificationId) {
  const notificationRef = database().ref(`users/${userId}/notifications/${notificationId}`);
  return notificationRef.remove()
    .then(() => {
      console.log('Notification deleted!');
    })
    .catch((error) => {
      console.error('Error deleting notification:', error);
      throw error;
    });
}

