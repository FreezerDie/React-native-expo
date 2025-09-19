import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors, Gradients, BorderRadius } from '@/constants/theme';
import LogoWidget from '@/components/LogoWidget';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  imageContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  mainImage: {
    width: width * 0.8,
    height: height * 0.25,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    borderRadius: BorderRadius.round,
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '80%',
    alignItems: 'center',
    marginBottom: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logInContainer: {
    alignItems: 'center',
  },
  logInText: {
    fontSize: 14,
    textAlign: 'center',
  },
  logInLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default function LandingScreen() {
  const { theme } = useTheme() as { theme: 'light' | 'dark' };

  const handleSignUp = () => {
    router.push('/auth/auth?mode=signup');
  };

  const handleLogIn = () => {
    router.push('/auth/auth?mode=signin');
  };

  // Theme-aware background
  const isLight = theme === 'light';

  return (
    <View style={[styles.container, { backgroundColor: isLight ? Colors.light.background : undefined }]}>
      {isLight ? (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Logo Widget */}
            <LogoWidget style={styles.logoContainer} />

            {/* Main Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/initbg.png')}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={[styles.heading, { color: Colors[theme].text }]}>
                We are what we do
              </Text>
              <Text style={[styles.subtext, { color: Colors[theme].textSecondary }]}>
                Thousand of people are using silent moon{'\n'}
                for smalls meditation
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  {
                    backgroundColor: Colors[theme].tint,
                    shadowColor: Colors[theme].text,
                  }
                ]}
                onPress={handleSignUp}
              >
                <Text style={[styles.signUpButtonText, { color: Colors.light.background }]}>
                  SIGN UP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logInContainer}
                onPress={handleLogIn}
              >
                <Text style={[styles.logInText, { color: Colors[theme].textSecondary }]}>
                  ALREADY HAVE AN ACCOUNT?{' '}
                  <Text style={[styles.logInLink, { color: Colors[theme].tint }]}>
                    LOG IN
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={[styles.container, { backgroundColor: '#4ECDC4' }]}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              {/* Logo Widget */}
              <LogoWidget style={styles.logoContainer} />

              {/* Main Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/images/initbg.png')}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              </View>

              {/* Text Content */}
              <View style={styles.textContainer}>
                <Text style={[styles.heading, { color: Colors[theme].text }]}>
                  We are what we do
                </Text>
                <Text style={[styles.subtext, { color: Colors[theme].textSecondary }]}>
                  Thousand of people are using silent moon{'\n'}
                  for smalls meditation
                </Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    {
                      backgroundColor: Colors[theme].tint,
                      shadowColor: Colors[theme].text,
                    }
                  ]}
                  onPress={handleSignUp}
                >
                  <Text style={[styles.signUpButtonText, { color: Colors.light.background }]}>
                    SIGN UP
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logInContainer}
                  onPress={handleLogIn}
                >
                  <Text style={[styles.logInText, { color: Colors[theme].textSecondary }]}>
                    ALREADY HAVE AN ACCOUNT?{' '}
                    <Text style={[styles.logInLink, { color: Colors[theme].tint }]}>
                      LOG IN
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}