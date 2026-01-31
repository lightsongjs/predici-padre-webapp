import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getOrthodoxFeastName } from './calendarUtils';

/**
 * Configure notification handler to determine how notifications are displayed
 * when the app is in the foreground
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Sets up notifications by requesting permissions and configuring channels (Android)
 *
 * @returns Promise that resolves to true if permissions were granted, false otherwise
 */
export async function setupNotifications(): Promise<boolean> {
  try {
    // Request permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Notification permissions not granted');
      return false;
    }

    // Configure Android notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('sermon-reminders', {
        name: 'Predici Duminicale',
        description: 'Notificări pentru predicile duminicale și sărbătorile importante',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FFD700',
        enableVibrate: true,
        enableLights: true,
        showBadge: true,
      });
    }

    console.log('Notifications setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return false;
  }
}

/**
 * Checks if a given date is a Sunday
 *
 * @param date - The date to check
 * @returns True if the date is Sunday, false otherwise
 */
export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

/**
 * Checks if a given date is a major Orthodox feast day
 * Uses the calendar utilities to determine feast days
 *
 * @param date - The date to check
 * @returns True if the date is a major feast day, false otherwise
 */
export function isFeastDay(date: Date): boolean {
  const feastName = getOrthodoxFeastName(date);

  // Major feast days (Sărbători Mari)
  const majorFeasts = [
    'Învierea Domnului - Paștele',
    'Nașterea Domnului - Crăciunul',
    'Bobotează - Botezul Domnului',
    'Buna Vestire',
    'Înălțarea Domnului',
    'Duminica Rusaliilor - Pogorârea Sfântului Duh',
    'Schimbarea la Față',
    'Adormirea Maicii Domnului',
    'Nașterea Maicii Domnului',
    'Înălțarea Sfintei Cruci',
    'Intrarea în Biserică a Maicii Domnului',
  ];

  return majorFeasts.some(feast => feastName.includes(feast.split(' - ')[0]));
}

/**
 * Determines the appropriate greeting based on the liturgical season
 *
 * @param date - The date to get the greeting for
 * @returns An appropriate Romanian Orthodox greeting
 */
function getGreetingForDate(date: Date): string {
  const feastName = getOrthodoxFeastName(date);

  // Easter period (40 days)
  if (feastName.includes('Învierea') || feastName.includes('Paștele') ||
      feastName.includes('Luminată') || feastName.includes('Tomii') ||
      feastName.includes('Mironosițelor') || feastName.includes('Slăbănogului') ||
      feastName.includes('Samarinencei') || feastName.includes('Orbului')) {
    return 'Hristos a Înviat!';
  }

  // Christmas period
  if (feastName.includes('Nașterea Domnului') || feastName.includes('Crăciunul')) {
    return 'Hristos Se naște!';
  }

  // Theophany/Baptism of the Lord
  if (feastName.includes('Bobotează') || feastName.includes('Botezul Domnului')) {
    return 'Bine ai venit la rugăciune!';
  }

  // Pentecost
  if (feastName.includes('Rusalii') || feastName.includes('Sfântului Duh')) {
    return 'Duhul Sfânt să vă lumineze!';
  }

  // Default for Sundays and other feasts
  return 'Duminică binecuvântată!';
}

/**
 * Schedules a daily check that will create a notification if tomorrow is a Sunday or major feast day
 * Notifications are scheduled for 8:00 AM on the target day
 *
 * @returns Promise that resolves to the notification identifier, or null if scheduling failed
 */
export async function scheduleWeeklyNotification(): Promise<string | null> {
  try {
    // Check permissions first
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Cannot schedule notifications: permissions not granted');
      return null;
    }

    // Cancel all previously scheduled notifications to avoid duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Reset to midnight

    // Check if tomorrow is Sunday or a major feast day
    const shouldNotify = isSunday(tomorrow) || isFeastDay(tomorrow);

    if (!shouldNotify) {
      console.log('Tomorrow is not a Sunday or feast day, no notification scheduled');

      // Schedule a daily recurring notification to check again tomorrow
      // This runs at 7:00 PM daily to check if tomorrow needs a notification
      const dailyCheckIdentifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: '', // Silent check, no actual notification shown
          body: '',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: 19, // 7:00 PM
          minute: 0,
        },
      });

      return dailyCheckIdentifier;
    }

    // Get the appropriate greeting and feast name
    const greeting = getGreetingForDate(tomorrow);
    const feastName = getOrthodoxFeastName(tomorrow);

    // Create notification title with feast name if available
    let title = greeting;
    if (feastName && !feastName.startsWith('Duminica a')) {
      title = `${greeting} - ${feastName}`;
    }

    // Schedule notification for 8:00 AM tomorrow
    const notificationDate = new Date(tomorrow);
    notificationDate.setHours(8, 0, 0, 0);

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: 'Ascultă predica de astăzi',
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        ...(Platform.OS === 'android' && {
          channelId: 'sermon-reminders',
        }),
        data: {
          type: 'sermon-reminder',
          date: tomorrow.toISOString(),
          feastName: feastName || 'Duminică',
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: notificationDate,
      },
    });

    console.log(`Notification scheduled for ${notificationDate.toLocaleString('ro-RO')}`, {
      identifier,
      title,
      feastName,
    });

    // Also schedule the daily check for future days
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '',
        body: '',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 19,
        minute: 0,
      },
    });

    return identifier;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

/**
 * Cancels all scheduled notifications
 * Useful for resetting the notification state
 *
 * @returns Promise that resolves when all notifications are cancelled
 */
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All scheduled notifications cancelled');
  } catch (error) {
    console.error('Error cancelling notifications:', error);
  }
}

/**
 * Gets all currently scheduled notifications
 * Useful for debugging and monitoring
 *
 * @returns Promise that resolves to an array of scheduled notifications
 */
export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log(`Found ${notifications.length} scheduled notifications`);
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

/**
 * Sends an immediate test notification
 * Useful for testing notification permissions and display
 *
 * @returns Promise that resolves to the notification identifier
 */
export async function sendTestNotification(): Promise<string | null> {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Cannot send test notification: permissions not granted');
      return null;
    }

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hristos a Înviat!',
        body: 'Aceasta este o notificare de test',
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        ...(Platform.OS === 'android' && {
          channelId: 'sermon-reminders',
        }),
      },
      trigger: null, // Send immediately
    });

    console.log('Test notification sent:', identifier);
    return identifier;
  } catch (error) {
    console.error('Error sending test notification:', error);
    return null;
  }
}

/**
 * Reschedules notifications based on the current day
 * Should be called when the app starts or when notification settings change
 *
 * @returns Promise that resolves to true if rescheduling was successful
 */
export async function rescheduleNotifications(): Promise<boolean> {
  try {
    const permissionsGranted = await setupNotifications();
    if (!permissionsGranted) {
      return false;
    }

    await scheduleWeeklyNotification();
    return true;
  } catch (error) {
    console.error('Error rescheduling notifications:', error);
    return false;
  }
}
