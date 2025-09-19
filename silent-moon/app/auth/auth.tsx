import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors, Gradients, BorderRadius } from '../../constants/theme';

type AuthMode = 'signin' | 'signup';

export default function AuthScreen() {
  const { login, register, state } = useApp();
  const { theme } = useTheme();
  const { mode: initialMode } = useLocalSearchParams<{ mode: string }>();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    if (initialMode === 'signup') {
      setMode('signup');
    } else if (initialMode === 'signin') {
      setMode('signin');
    }
  }, [initialMode]);

  const handleAuth = async () => {
    if (mode === 'signin') {
      if (!username || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const result = await login(username, password);
      if (result.success) {
        console.log('Auth - Login successful, redirecting based on onboarding state');
        // Small delay to ensure state has updated
        setTimeout(() => {
          const userPrefs = state.auth.currentUser?.preferences;
          const hasCompletedOnboarding = userPrefs && userPrefs.selectedTopics.length > 0 && userPrefs.preferredTime !== '';
          console.log('Auth - User preferences after login:', userPrefs);
          console.log('Auth - Has completed onboarding:', hasCompletedOnboarding);

          if (hasCompletedOnboarding) {
            router.replace('/(tabs)');
          } else {
            router.replace('/onboarding/welcome');
          }
        }, 100);
      } else {
        Alert.alert('Login Failed', result.error || 'An error occurred during login');
      }
    } else {
      if (!name || !username || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (!privacyAccepted) {
        Alert.alert('Error', 'Please accept the Privacy Policy to continue');
        return;
      }

      const result = await register(name, username, password);
      if (result.success) {
        console.log('Auth - Registration successful, redirecting to onboarding');
        // New users always go to onboarding
        setTimeout(() => {
          router.replace('/onboarding/welcome');
        }, 100);
      } else {
        Alert.alert('Registration Failed', result.error || 'An error occurred during registration');
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    Alert.alert('Social Login', `${provider} login coming soon!`);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    // Clear form when switching modes
    setName('');
    setUsername('');
    setPassword('');
    setPrivacyAccepted(false);
  };

  // Theme-aware background
  const isLight = theme === 'light';

  return (
    <View style={[styles.container, { backgroundColor: isLight ? Colors.light.background : undefined }]}>
      {isLight ? (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: Colors[theme].text }]}>
              {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
            </Text>
            <Text style={[styles.subtitle, { color: Colors[theme].textSecondary }]}>
              {mode === 'signin'
                ? 'Continue your mindfulness journey'
                : 'Create your account to start your mindfulness journey'
              }
            </Text>
          </View>

          <View style={styles.form}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}
              onPress={() => handleSocialLogin('Google')}
            >
              <Text style={[styles.socialButtonText, { color: '#000000' }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#7583CA' }]}
              onPress={() => handleSocialLogin('Facebook')}
            >
              <Text style={[styles.socialButtonText, { color: '#FFFFFF' }]}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={[styles.dividerText, { color: Colors[theme].textMuted }]}>OR LOG IN WITH EMAIL</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Form Fields */}
            {mode === 'signup' && (
              <TextInput
                style={[styles.input, {
                  backgroundColor: Colors[theme].card,
                  borderColor: Colors[theme].border,
                  color: Colors[theme].text
                }]}
                placeholder="Full Name"
                placeholderTextColor={Colors[theme].textMuted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <TextInput
              style={[styles.input, {
                backgroundColor: Colors[theme].card,
                borderColor: Colors[theme].border,
                color: Colors[theme].text
              }]}
              placeholder="Username"
              placeholderTextColor={Colors[theme].textMuted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={[styles.input, {
                backgroundColor: Colors[theme].card,
                borderColor: Colors[theme].border,
                color: Colors[theme].text
              }]}
              placeholder="Password"
              placeholderTextColor={Colors[theme].textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            {mode === 'signup' && (
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}
                  onPress={() => setPrivacyAccepted(!privacyAccepted)}
                >
                  {privacyAccepted && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPrivacyAccepted(!privacyAccepted)}>
                  <Text style={[styles.checkboxText, { color: Colors[theme].textSecondary }]}>
                    I have read and agree to the{' '}
                    <Text style={[styles.linkText, { color: Colors[theme].tint }]}>
                      Privacy Policy
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: Colors[theme].tint },
                state.auth.isLoading && styles.primaryButtonDisabled
              ]}
              onPress={handleAuth}
              disabled={state.auth.isLoading}
            >
              {state.auth.isLoading ? (
                <ActivityIndicator color={Colors.light.background} />
              ) : (
                <Text style={[styles.primaryButtonText, { color: Colors.light.background }]}>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            {mode === 'signin' && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={[styles.forgotPasswordText, { color: Colors[theme].textMuted }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: Colors[theme].textSecondary }]}>
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={[styles.linkText, { color: Colors[theme].tint }]}>
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      ) : (
        <View
          style={[styles.container, { backgroundColor: '#4ECDC4' }]}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: Colors[theme].text }]}>
                {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
              </Text>
              <Text style={[styles.subtitle, { color: Colors[theme].textSecondary }]}>
                {mode === 'signin'
                  ? 'Continue your mindfulness journey'
                  : 'Create your account to start your mindfulness journey'
                }
              </Text>
            </View>

            <View style={styles.form}>
              <TouchableOpacity
                style={[styles.socialButton, {
                  backgroundColor: '#FFFFFF',
                  borderColor: Colors[theme].border
                }]}
                onPress={() => handleSocialLogin('Google')}
              >
                <Text style={[styles.socialButtonText, { color: '#000000' }]}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, {
                  backgroundColor: '#7583CA',
                  borderColor: Colors[theme].border
                }]}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Text style={[styles.socialButtonText, { color: '#FFFFFF' }]}>
                  Continue with Facebook
                </Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: Colors[theme].border }]} />
                <Text style={[styles.dividerText, { color: Colors[theme].textMuted }]}>or</Text>
                <View style={[styles.dividerLine, { backgroundColor: Colors[theme].border }]} />
              </View>

              {/* Form Fields */}
              {mode === 'signup' && (
                <TextInput
                  style={[styles.input, {
                    backgroundColor: Colors[theme].card,
                    borderColor: Colors[theme].border,
                    color: Colors[theme].text
                  }]}
                  placeholder="Full Name"
                  placeholderTextColor={Colors[theme].textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              )}

              <TextInput
                style={[styles.input, {
                  backgroundColor: Colors[theme].card,
                  borderColor: Colors[theme].border,
                  color: Colors[theme].text
                }]}
                placeholder="Username"
                placeholderTextColor={Colors[theme].textMuted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, {
                  backgroundColor: Colors[theme].card,
                  borderColor: Colors[theme].border,
                  color: Colors[theme].text
                }]}
                placeholder="Password"
                placeholderTextColor={Colors[theme].textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              {mode === 'signup' && (
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}
                    onPress={() => setPrivacyAccepted(!privacyAccepted)}
                  >
                    {privacyAccepted && <Text style={[styles.checkmark, { color: Colors[theme].tint }]}>✓</Text>}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPrivacyAccepted(!privacyAccepted)}>
                    <Text style={[styles.checkboxText, { color: Colors[theme].textSecondary }]}>
                      I have read and agree to the{' '}
                      <Text style={[styles.linkText, { color: Colors[theme].tint }]}>
                        Privacy Policy
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: Colors[theme].tint },
                  state.auth.isLoading && styles.primaryButtonDisabled
                ]}
                onPress={handleAuth}
                disabled={state.auth.isLoading}
              >
                {state.auth.isLoading ? (
                  <ActivityIndicator color={Colors.light.background} />
                ) : (
                  <Text style={[styles.primaryButtonText, { color: Colors.light.background }]}>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>

              {mode === 'signin' && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={[styles.forgotPasswordText, { color: Colors[theme].textMuted }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: Colors[theme].textSecondary }]}>
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              </Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text style={[styles.linkText, { color: Colors[theme].tint }]}>
                  {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.medium,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#E0E7FF',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.medium,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.small,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  checkmark: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    color: '#E0E7FF',
    fontSize: 14,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.medium,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#E0E7FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#E0E7FF',
    fontSize: 14,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
