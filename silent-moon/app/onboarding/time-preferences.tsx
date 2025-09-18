import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useApp } from '@/contexts/AppContext';

const TIME_OPTIONS = [
  { id: 'morning', time: '6:00 AM', label: 'Early Morning' },
  { id: 'breakfast', time: '8:00 AM', label: 'After Breakfast' },
  { id: 'midday', time: '12:00 PM', label: 'Lunch Break' },
  { id: 'afternoon', time: '3:00 PM', label: 'Afternoon' },
  { id: 'evening', time: '6:00 PM', label: 'Evening' },
  { id: 'night', time: '9:00 PM', label: 'Before Bed' },
];

const DAYS = [
  { id: 'monday', label: 'M', fullName: 'Mon' },
  { id: 'tuesday', label: 'T', fullName: 'Tue' },
  { id: 'wednesday', label: 'W', fullName: 'Wed' },
  { id: 'thursday', label: 'T', fullName: 'Thu' },
  { id: 'friday', label: 'F', fullName: 'Fri' },
  { id: 'saturday', label: 'S', fullName: 'Sat' },
  { id: 'sunday', label: 'S', fullName: 'Sun' },
];

export default function TimePreferencesScreen() {
  const { state, dispatch, updateUserPrefs } = useApp();
  const [selectedTime, setSelectedTime] = useState<string>(state.userPreferences.preferredTime);
  const [selectedDays, setSelectedDays] = useState<string[]>(state.userPreferences.preferredDays);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleContinue = async () => {
    if (!selectedTime || selectedDays.length === 0) {
      return;
    }

    // Complete onboarding with all user preferences
    const userPreferences = {
      ...state.userPreferences,
      selectedTopics: state.userPreferences.selectedTopics,
      preferredTime: selectedTime,
      preferredDays: selectedDays,
    };

    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: userPreferences,
    });

    // Persist the preferences to user data
    const result = await updateUserPrefs(userPreferences);
    if (!result.success) {
      console.error('Failed to save user preferences:', result.error);
    }

    router.replace('/(tabs)');
  };

  const isDaySelected = (dayId: string) => selectedDays.includes(dayId);

  return (
    <LinearGradient
      colors={['#8B5CF6', '#A855F7', '#C084FC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
          <Text style={styles.title}>
            When would you like to meditate?
          </Text>
          <Text style={styles.subtitle}>
            Choose your preferred time for daily practice
          </Text>
            </View>

            <View style={styles.timeSection}>
              <Text style={styles.sectionTitle}>Preferred Time</Text>
              <View style={styles.timeGrid}>
                {TIME_OPTIONS.map((time) => (
                  <TouchableOpacity
                    key={time.id}
                    style={[
                      styles.timeCard,
                      selectedTime === time.id && styles.timeCardSelected,
                    ]}
                    onPress={() => setSelectedTime(time.id)}
                  >
                    <Text style={[
                      styles.timeValue,
                      selectedTime === time.id && styles.timeValueSelected,
                    ]}>
                      {time.time}
                    </Text>
                    <Text style={[
                      styles.timeLabel,
                      selectedTime === time.id && styles.timeLabelSelected,
                    ]}>
                      {time.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.daysSection}>
              <Text style={styles.sectionTitle}>Which days would you like to meditate?</Text>
              <View style={styles.daysGrid}>
                {DAYS.map((day) => (
                  <TouchableOpacity
                    key={day.id}
                    style={[
                      styles.dayButton,
                      isDaySelected(day.id) && styles.dayButtonSelected,
                    ]}
                    onPress={() => toggleDay(day.id)}
                  >
                    <Text style={[
                      styles.dayLabel,
                      isDaySelected(day.id) && styles.dayLabelSelected,
                    ]}>
                      {day.label}
                    </Text>
                    <Text style={[
                      styles.dayFullName,
                      isDaySelected(day.id) && styles.dayFullNameSelected,
                    ]}>
                      {day.fullName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!selectedTime || selectedDays.length === 0) && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedTime || selectedDays.length === 0}
          >
            <Text style={[
              styles.continueButtonText,
              (!selectedTime || selectedDays.length === 0) && styles.continueButtonTextDisabled,
            ]}>
              Complete Setup
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  timeSection: {
    marginBottom: 40,
  },
  daysSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timeValueSelected: {
    color: '#FFFFFF',
  },
  timeLabel: {
    fontSize: 12,
    color: '#E0E7FF',
  },
  timeLabelSelected: {
    color: '#FFFFFF',
  },
  daysGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dayLabelSelected: {
    color: '#FFFFFF',
  },
  dayFullName: {
    fontSize: 10,
    color: '#E0E7FF',
    marginTop: 2,
  },
  dayFullNameSelected: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  continueButtonTextDisabled: {
    color: 'rgba(139, 92, 246, 0.5)',
  },
});
