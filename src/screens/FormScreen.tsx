import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, Animated,
} from 'react-native';
import showPlatformAlert from '../components/PlatformAlert';
import StickyHeader from '../components/StickyHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F, R } from '../theme';
import type { FormScreenProps } from '../types/navigation';

type Field = 'name' | 'email' | 'company' | 'message';

export default function FormScreen({ navigation }: FormScreenProps) {
  const [fields, setFields]   = useState({ name: '', email: '', company: '', message: '' });
  const [focused, setFocused] = useState<Field | null>(null);
  const [sent, setSent]       = useState(false);

  const insets    = useSafeAreaInsets();
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const update = (key: Field) => (val: string) => setFields(f => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    if (!fields.name.trim() || !fields.email.trim()) {
      showPlatformAlert('Missing Fields', 'Please fill in your name and email.');
      return;
    }
    setSent(true);
    Animated.timing(checkAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  };

  if (sent) {
    return (
      <View style={s.screen}>
        <StickyHeader title="Contact Us" onBack={() => navigation.goBack()} />
        <View style={s.successWrap}>
          <Animated.View style={[s.successBox, { opacity: checkAnim, transform: [{ scale: checkAnim }] }]}>
            <View style={s.successCircle}>
              <Text style={s.successIcon}>✓</Text>
            </View>
            <Text style={s.successTitle}>Message Sent!</Text>
            <Text style={s.successSub}>We'll get back to you within 24 hours.</Text>
            <TouchableOpacity style={s.successBtn} onPress={() => navigation.goBack()}>
              <Text style={s.successBtnText}>← Back to Dashboard</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <View style={s.screen}>
      {/* ── STICKY HEADER — always fixed above scroll ───────── */}
      <StickyHeader title="Contact Us" onBack={() => navigation.goBack()} />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[s.body, { opacity: fadeAnim }]}>

          {/* Page header */}
          <View style={s.header}>
            <View style={s.headerBadge}>
              <Text style={s.headerBadgeText}>Get in Touch</Text>
            </View>
            <Text style={s.title}>Let's talk{'\n'}about your needs.</Text>
            <Text style={s.subtitle}>Our team responds within one business day.</Text>
          </View>

          {/* Form card */}
          <View style={s.card}>
            <View style={s.row}>
              <View style={s.fieldWrap}>
                <Text style={s.label}>Full Name *</Text>
                <TextInput
                  style={[s.input, focused === 'name' && s.inputFocused]}
                  placeholder="Adnan Bohra"
                  placeholderTextColor={C.textDim}
                  value={fields.name}
                  onChangeText={update('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </View>
              <View style={s.fieldWrap}>
                <Text style={s.label}>Work Email *</Text>
                <TextInput
                  style={[s.input, focused === 'email' && s.inputFocused]}
                  placeholder="adnan@company.com"
                  placeholderTextColor={C.textDim}
                  value={fields.email}
                  onChangeText={update('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={s.fieldWrap}>
              <Text style={s.label}>Company</Text>
              <TextInput
                style={[s.input, focused === 'company' && s.inputFocused]}
                placeholder="Ten04 Ltd."
                placeholderTextColor={C.textDim}
                value={fields.company}
                onChangeText={update('company')}
                onFocus={() => setFocused('company')}
                onBlur={() => setFocused(null)}
              />
            </View>

            <View style={s.fieldWrap}>
              <Text style={s.label}>Message</Text>
              <TextInput
                style={[s.input, s.textarea, focused === 'message' && s.inputFocused]}
                placeholder="Tell us about your payment use-case..."
                placeholderTextColor={C.textDim}
                value={fields.message}
                onChangeText={update('message')}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
              <Text style={s.submitText}>Send Message →</Text>
            </TouchableOpacity>

            <Text style={s.privacy}>🔒 Your data is encrypted and never shared.</Text>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: C.bg },
  scroll:        { flex: 1 },
  scrollContent: { flexGrow: 1 },
  body:          { padding: 20, paddingBottom: 48 },

  header:      { marginBottom: 24 },
  headerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: C.accentDim, borderWidth: 1, borderColor: `${C.accent}30`,
    borderRadius: R.full, paddingVertical: 5, paddingHorizontal: 12, marginBottom: 16,
  },
  headerBadgeText: { fontSize: F.xs, color: C.accent, fontWeight: F.semi, letterSpacing: 1 },
  title: {
    fontSize: F['2xl'], fontWeight: F.black, color: C.text,
    letterSpacing: -0.5, lineHeight: F['2xl'] * 1.2, marginBottom: 8,
  },
  subtitle: { fontSize: F.sm, color: C.textSub, lineHeight: 22 },

  card: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: R['2xl'], padding: 24, marginBottom: 16,
  },
  row:       { flexDirection: 'row', gap: 12 },
  fieldWrap: { flex: 1, marginBottom: 16 },
  label: {
    fontSize: F.xs, fontWeight: F.semi, color: C.textDim,
    marginBottom: 6, letterSpacing: 0.5,
  },
  input: {
    backgroundColor: C.surface2,
    borderWidth: 1, borderColor: C.border,
    borderRadius: R.lg, paddingVertical: 12, paddingHorizontal: 14,
    color: C.text, fontSize: F.base,
  },
  inputFocused: { borderColor: C.accent, backgroundColor: `${C.accent}08` },
  textarea:     { minHeight: 100, paddingTop: 12 },

  submitBtn: {
    backgroundColor: C.accent,
    borderRadius: R.xl, paddingVertical: 16,
    alignItems: 'center', marginTop: 4,
  },
  submitText: { fontSize: F.base, fontWeight: F.bold, color: '#000' },
  privacy:    { fontSize: F.xs, color: C.textDim, textAlign: 'center', marginTop: 12 },

  successWrap: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  successBox:    { alignItems: 'center', maxWidth: 320 },
  successCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: C.greenDim, borderWidth: 2, borderColor: C.green,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  successIcon:  { fontSize: 28, color: C.green },
  successTitle: { fontSize: F.xl, fontWeight: F.black, color: C.text, marginBottom: 8, textAlign: 'center' },
  successSub:   { fontSize: F.sm, color: C.textSub, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successBtn: {
    backgroundColor: C.accent,
    borderRadius: R.full, paddingVertical: 14, paddingHorizontal: 28,
  },
  successBtnText: { fontSize: F.sm, fontWeight: F.bold, color: '#000' },
});
