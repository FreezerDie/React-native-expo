import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BorderRadius } from '@/constants/theme';
import BackNavigation from '@/components/BackNavigation';

// Generate hours (1-12)
const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

// Generate minutes (00-59)
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

// AM/PM options
const PERIODS = ['AM', 'PM'];

const DAYS = [
  { id: 'monday', label: 'M' },
  { id: 'tuesday', label: 'T' },
  { id: 'wednesday', label: 'W' },
  { id: 'thursday', label: 'T' },
  { id: 'friday', label: 'F' },
  { id: 'saturday', label: 'S' },
  { id: 'sunday', label: 'S' },
];

export default function TimePreferencesScreen() {
  const { state, dispatch, updateUserPrefs } = useApp();
  const [selectedHour, setSelectedHour] = useState<string>('06');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');
  const [selectedDays, setSelectedDays] = useState<string[]>(state.userPreferences.preferredDays);

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const textMuted = useThemeColor({}, 'textMuted');
  const tintColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleContinue = async () => {
    if (selectedDays.length === 0) {
      return;
    }

    // Format the selected time
    const formattedTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;

    console.log('Saving user preferences:', { formattedTime, selectedDays });

    // Complete onboarding with all user preferences
    const userPreferences = {
      ...state.userPreferences,
      selectedTopics: state.userPreferences.selectedTopics,
      preferredTime: formattedTime,
      preferredDays: selectedDays,
    };

    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: userPreferences,
    });

    // Persist the preferences to user data
    const result = await updateUserPrefs(userPreferences);
    if (result.success) {
      console.log('Successfully saved user preferences to local storage');
    } else {
      console.error('Failed to save user preferences:', result.error);
    }

    router.replace('/(tabs)');
  };

  const isDaySelected = (dayId: string) => selectedDays.includes(dayId);

  const handleSkip = async () => {
    if (selectedDays.length === 0) {
      return;
    }

    // Skip with default time preferences
    const defaultTime = '6:00 AM';
    const userPreferences = {
      ...state.userPreferences,
      selectedTopics: state.userPreferences.selectedTopics,
      preferredTime: defaultTime,
      preferredDays: selectedDays,
    };

    console.log('Skipping with default preferences:', { defaultTime, selectedDays });

    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: userPreferences,
    });

    // Persist the preferences to user data
    const result = await updateUserPrefs(userPreferences);
    if (result.success) {
      console.log('Successfully saved default user preferences to local storage');
    } else {
      console.error('Failed to save user preferences:', result.error);
    }

    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <BackNavigation />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: textColor }]}>
              When would you like to meditate?
            </Text>
            <Text style={[styles.subtitle, { color: textSecondary }]}>
              Any time you can choose but We recommend first thing in th morning.
            </Text>
          </View>
        </View>

        <View style={styles.timeSection}>
          <View style={styles.timeSectionContent}>
          <View style={[styles.timePickerContainer, { backgroundColor: '#00000010', borderRadius: BorderRadius.medium }]}>
            {/* Hours Picker */}
            <View style={styles.pickerColumn}>
              <Text style={[styles.pickerLabel, { color: textSecondary }]}>Hour</Text>
              <ScrollView
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                scrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(event.nativeEvent.contentOffset.y / 50);
                  setSelectedHour(HOURS[index] || '01');
                }}
              >
                <View style={styles.pickerPadding} />
                {HOURS.map((hour, index) => (
                  <View key={`hour-${hour}`} style={styles.pickerItem}>
                    <Text style={[
                      styles.pickerText,
                      { color: selectedHour === hour ? textColor : textMuted },
                      selectedHour === hour && styles.pickerTextSelected
                    ]}>
                      {hour}
                    </Text>
                  </View>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>

            {/* Minutes Picker */}
            <View style={styles.pickerColumn}>
              <Text style={[styles.pickerLabel, { color: textSecondary }]}>Minute</Text>
              <ScrollView
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                scrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(event.nativeEvent.contentOffset.y / 50);
                  setSelectedMinute(MINUTES[index] || '00');
                }}
              >
                <View style={styles.pickerPadding} />
                {MINUTES.map((minute, index) => (
                  <View key={`minute-${minute}`} style={styles.pickerItem}>
                    <Text style={[
                      styles.pickerText,
                      { color: selectedMinute === minute ? textColor : textMuted },
                      selectedMinute === minute && styles.pickerTextSelected
                    ]}>
                      {minute}
                    </Text>
                  </View>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>

            {/* AM/PM Picker */}
            <View style={styles.pickerColumn}>
              <Text style={[styles.pickerLabel, { color: textSecondary }]}>AM/PM</Text>
              <ScrollView
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                scrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(event.nativeEvent.contentOffset.y / 50);
                  setSelectedPeriod(PERIODS[index] || 'AM');
                }}
              >
                <View style={styles.pickerPadding} />
                {PERIODS.map((period, index) => (
                  <View key={`period-${period}`} style={styles.pickerItem}>
                    <Text style={[
                      styles.pickerText,
                      { color: selectedPeriod === period ? textColor : textMuted },
                      selectedPeriod === period && styles.pickerTextSelected
                    ]}>
                      {period}
                    </Text>
                  </View>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>
          </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.daysSection}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Which day would you like to meditate?</Text>
              <Text style={[styles.subtitle, { color: textSecondary }]}>
                Everyday is best, but we recommend picking
                at least five.
              </Text>
              <View style={styles.daysGrid}>
                {DAYS.map((day) => (
                  <TouchableOpacity
                    key={day.id}
                    style={[
                      styles.dayButton,
                      { backgroundColor: cardColor + '15', borderColor: borderColor + '30' },
                      isDaySelected(day.id) && [styles.dayButtonSelected, { backgroundColor: cardColor + '30', borderColor: tintColor }],
                    ]}
                    onPress={() => toggleDay(day.id)}
                  >
                    <Text style={[
                      styles.dayLabel,
                      { color: isDaySelected(day.id) ? textColor : textMuted },
                      isDaySelected(day.id) && [styles.dayLabelSelected, { color: textColor }],
                    ]}>
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor, borderTopColor: borderColor + '20', borderTopWidth: 1 }]}>
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                { backgroundColor: cardColor + '15', borderColor: borderColor + '50' },
                selectedDays.length === 0 && [styles.secondaryButtonDisabled, { backgroundColor: cardColor + '05', borderColor: borderColor + '20' }],
              ]}
              onPress={handleSkip}
              disabled={selectedDays.length === 0}
            >
              <Text style={[
                styles.secondaryButtonText,
                { color: textColor },
                selectedDays.length === 0 && styles.secondaryButtonTextDisabled,
              ]}>
                No Thanks
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: '#8E97FD' },
                selectedDays.length === 0 && [styles.primaryButtonDisabled, { backgroundColor: '#8E97FD80' }],
              ]}
              onPress={handleContinue}
              disabled={selectedDays.length === 0}
            >
              <Text style={[
                styles.primaryButtonText,
                { color: tintColor },
                selectedDays.length === 0 && styles.primaryButtonTextDisabled,
              ]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 24,
  },
  timeSection: {
    marginBottom: 40,
  },
  timeSectionContent: {
    paddingHorizontal: 24,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: BorderRadius.medium,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  pickerColumn: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerScroll: {
    height: 150,
    width: 60,
  },
  pickerPadding: {
    height: 50,
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 18,
    fontWeight: '400',
  },
  pickerTextSelected: {
    fontSize: 22,
    fontWeight: '600',
  },
  selectedTimeDisplay: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: BorderRadius.medium,
  },
  selectedTimeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  daysSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayButtonSelected: {
    // backgroundColor and borderColor are now set inline with theme colors
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  dayLabelSelected: {
    // color is now set inline with theme colors
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  buttonColumn: {
    flexDirection: 'column',
    gap: 12,
    minHeight: 120,
  },
  primaryButton: {
    borderRadius: BorderRadius.medium,
    paddingVertical: 16,
    alignItems: 'center',
    flex: 1,
    minHeight: 50,
  },
  primaryButtonDisabled: {
    // backgroundColor is now set inline with theme colors
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonTextDisabled: {
    opacity: 0.5,
  },
  secondaryButton: {
    borderRadius: BorderRadius.medium,
    paddingVertical: 16,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    minHeight: 50,
  },
  secondaryButtonDisabled: {
    // backgroundColor and borderColor are now set inline with theme colors
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonTextDisabled: {
    opacity: 0.5,
  },
});
