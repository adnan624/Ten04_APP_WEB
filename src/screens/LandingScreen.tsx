import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Animated, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F, R } from '../theme';
import type { LandingScreenProps } from '../types/navigation';

type Props = LandingScreenProps;

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant Transfers',
    desc: 'Move money across accounts in real-time. Zero delays, full transparency.',
  },
  {
    icon: '🔒',
    title: 'Bank-Grade Security',
    desc: 'AES-256 encryption with biometric authentication on every session.',
  },
  {
    icon: '📊',
    title: 'Live Analytics',
    desc: 'Track spending patterns, cash flow, and insights updated every second.',
  },
];

const STATS = [
  { value: '₹2.4B+', label: 'Processed Daily' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '180ms', label: 'Avg. Latency' },
  { value: '500K+', label: 'Merchants' },
];

export default function LandingScreen({ navigation }: Props) {
  const insets    = useSafeAreaInsets();
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;
  const pulseAnim  = useRef(new Animated.Value(1)).current;
  const glowAnim   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 2200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 2200, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2800, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2800, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });

  return (
    <View style={s.screen}>
      {/* ── NAV — outside ScrollView, always fixed ──────────── */}
      <View style={[s.nav, { paddingTop: insets.top + 16 }]}>
        <View style={s.navLogo}>
          <View style={s.navDot} />
          <Text style={s.navLogoText}>TEN04</Text>
        </View>
        <TouchableOpacity
          style={s.navCta}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={s.navCtaText}>Open App</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >

      {/* ── HERO ────────────────────────────────────────────── */}
      <View style={s.hero}>
        {/* Background orbs */}
        <Animated.View style={[s.orb1, { opacity: glowOpacity }]} />
        <Animated.View style={[s.orb2, { opacity: glowOpacity }]} />

        {/* Grid overlay */}
        <View style={s.gridOverlay} />

        <Animated.View style={[s.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={s.heroBadge}>
            <View style={s.heroBadgeDot} />
            <Text style={s.heroBadgeText}>Payments ye to chal gaya bhai</Text>
          </View>

          <Text style={s.heroTitle}>
            <Text style={s.heroTitleAccent}>Next-Gen</Text>
            {'\n'}Payment{'\n'}Infrastructure
          </Text>

          <Text style={s.heroSub}>
            Unified payment rails for the modern enterprise.{'\n'}
            Fast, compliant, and built to scale.
          </Text>

          <View style={s.heroCtas}>
            <TouchableOpacity
              style={s.heroPrimary}
              onPress={() => navigation.navigate('Home')}
            >
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Text style={s.heroPrimaryText}>Launch Dashboard →</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.heroSecondary}
              onPress={() => navigation.navigate('Form')}
            >
              <Text style={s.heroSecondaryText}>Get in Touch</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* ── STATS ───────────────────────────────────────────── */}
      <View style={s.statsRow}>
        {STATS.map((st, i) => (
          <View key={i} style={s.statCard}>
            <Text style={s.statValue}>{st.value}</Text>
            <Text style={s.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <View style={s.section}>
        <Text style={s.sectionEyebrow}>Why Ten04</Text>
        <Text style={s.sectionTitle}>Built for scale.{'\n'}Designed for speed.</Text>

        <View style={s.featureGrid}>
          {FEATURES.map((f, i) => (
            <View key={i} style={s.featureCard}>
              <Text style={s.featureIcon}>{f.icon}</Text>
              <Text style={s.featureTitle}>{f.title}</Text>
              <Text style={s.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── TERMINAL BLOCK ──────────────────────────────────── */}
      <View style={s.terminalWrap}>
        <View style={s.terminalHeader}>
          <View style={[s.dot, { backgroundColor: '#f43f5e' }]} />
          <View style={[s.dot, { backgroundColor: '#f59e0b' }]} />
          <View style={[s.dot, { backgroundColor: '#10b981' }]} />
        </View>
        <View style={s.terminalBody}>
          <Text style={s.termLine}><Text style={s.termKey}>POST </Text><Text style={s.termUrl}>/v1/transactions</Text></Text>
          <Text style={s.termLine}><Text style={s.termPunct}>{'{'}</Text></Text>
          <Text style={s.termLine}>{'  '}<Text style={s.termProp}>"amount"</Text><Text style={s.termPunct}>: </Text><Text style={s.termVal}>250000</Text><Text style={s.termPunct}>,</Text></Text>
          <Text style={s.termLine}>{'  '}<Text style={s.termProp}>"currency"</Text><Text style={s.termPunct}>: </Text><Text style={s.termStr}>"INR"</Text><Text style={s.termPunct}>,</Text></Text>
          <Text style={s.termLine}>{'  '}<Text style={s.termProp}>"mode"</Text><Text style={s.termPunct}>: </Text><Text style={s.termStr}>"UPI"</Text></Text>
          <Text style={s.termLine}><Text style={s.termPunct}>{'}'}</Text></Text>
          <Text style={[s.termLine, { marginTop: 8 }]}><Text style={s.termComment}>// ✓ 200 OK — settled in 180ms</Text></Text>
        </View>
      </View>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <View style={s.ctaSection}>
        <Animated.View style={[s.ctaOrb, { opacity: glowOpacity }]} />
        <Text style={s.ctaTitle}>Ready to move{'\n'}money smarter?</Text>
        <Text style={s.ctaSub}>Join 500,000+ merchants using Ten04 today.</Text>
        <TouchableOpacity
          style={s.ctaBtn}
          onPress={() => navigation.navigate('Form')}
        >
          <Text style={s.ctaBtnText}>Start for Free →</Text>
        </TouchableOpacity>
      </View>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <View style={s.footer}>
        <View style={s.footerLogo}>
          <View style={s.navDot} />
          <Text style={s.footerLogoText}>TEN04</Text>
        </View>
        <Text style={s.footerCopy}>© 2025 Ten04. All rights reserved.</Text>
      </View>

      </ScrollView>
    </View>
  );
}

const ORBS_SIZE = Math.min(width * 0.9, 600);

const s = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: C.bg },
  scroll:        { flex: 1, backgroundColor: C.bg },
  scrollContent: { flexGrow: 1 },

  // NAV
  nav: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32, paddingBottom: 16,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1, borderBottomColor: '#0ea5e930',
  },
  navLogo:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navDot:      { width: 8, height: 8, borderRadius: 4, backgroundColor: C.accent },
  navLogoText: { fontSize: F.md, fontWeight: F.black, color: C.text, letterSpacing: 4 },
  navCta: {
    backgroundColor: C.accent, borderRadius: R.full,
    paddingVertical: 8, paddingHorizontal: 20,
  },
  navCtaText: { fontSize: F.sm, fontWeight: F.bold, color: '#000' },

  // HERO
  hero: {
    minHeight: 620, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 24, paddingVertical: 80,
    overflow: 'hidden',
  },
  orb1: {
    position: 'absolute', width: ORBS_SIZE, height: ORBS_SIZE,
    borderRadius: ORBS_SIZE / 2, top: -ORBS_SIZE * 0.3, left: -ORBS_SIZE * 0.2,
    backgroundColor: 'rgba(14,165,233,0.07)',
  },
  orb2: {
    position: 'absolute', width: ORBS_SIZE * 0.8, height: ORBS_SIZE * 0.8,
    borderRadius: ORBS_SIZE * 0.4, bottom: -ORBS_SIZE * 0.3, right: -ORBS_SIZE * 0.2,
    backgroundColor: 'rgba(245,158,11,0.05)',
  },
  gridOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.04,
    borderWidth: 1, borderColor: C.accent,
  },
  heroContent: { alignItems: 'center', zIndex: 1 },

  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: C.accentDim, borderWidth: 1, borderColor: `${C.accent}33`,
    borderRadius: R.full, paddingVertical: 6, paddingHorizontal: 14, marginBottom: 32,
  },
  heroBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent },
  heroBadgeText: { fontSize: F.xs, fontWeight: F.semi, color: C.accent, letterSpacing: 1 },

  heroTitle: {
    fontSize: Math.min(F['5xl'], width * 0.14),
    fontWeight: F.black, color: C.text,
    textAlign: 'center', lineHeight: Math.min(F['5xl'], width * 0.14) * 1.05,
    letterSpacing: -2, marginBottom: 24,
  },
  heroTitleAccent: { color: C.accent },
  heroSub: {
    fontSize: F.base, color: C.textSub, textAlign: 'center',
    lineHeight: 26, marginBottom: 40, maxWidth: 440,
  },
  heroCtas: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  heroPrimary: {
    backgroundColor: C.accent, borderRadius: R.full,
    paddingVertical: 16, paddingHorizontal: 32,
  },
  heroPrimaryText: { fontSize: F.base, fontWeight: F.bold, color: '#000' },
  heroSecondary: {
    borderWidth: 1, borderColor: C.border, borderRadius: R.full,
    paddingVertical: 16, paddingHorizontal: 32,
  },
  heroSecondaryText: { fontSize: F.base, fontWeight: F.medium, color: C.textSub },

  // STATS
  statsRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border,
    backgroundColor: C.surface,
  },
  statCard: {
    flex: 1, minWidth: 140, alignItems: 'center',
    paddingVertical: 32, paddingHorizontal: 16,
    borderRightWidth: 1, borderRightColor: C.border,
  },
  statValue: { fontSize: F['2xl'], fontWeight: F.black, color: C.text, letterSpacing: -1 },
  statLabel: { fontSize: F.xs, color: C.textDim, marginTop: 4, letterSpacing: 0.5 },

  // FEATURES
  section:      { padding: 64, alignItems: 'center' },
  sectionEyebrow: {
    fontSize: F.xs, fontWeight: F.semi, color: C.accent,
    letterSpacing: 3, marginBottom: 16,
  },
  sectionTitle: {
    fontSize: F['3xl'], fontWeight: F.black, color: C.text,
    textAlign: 'center', letterSpacing: -1, lineHeight: F['3xl'] * 1.15, marginBottom: 48,
  },
  featureGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 16,
    justifyContent: 'center', width: '100%', maxWidth: 960,
  },
  featureCard: {
    flex: 1, minWidth: 260, maxWidth: 300,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
    borderRadius: R.xl, padding: 28,
  },
  featureIcon:  { fontSize: 32, marginBottom: 16 },
  featureTitle: { fontSize: F.md, fontWeight: F.bold, color: C.text, marginBottom: 8 },
  featureDesc:  { fontSize: F.sm, color: C.textSub, lineHeight: 22 },

  // TERMINAL
  terminalWrap: {
    marginHorizontal: 32, marginBottom: 64,
    borderWidth: 1, borderColor: C.border,
    borderRadius: R.xl, overflow: 'hidden',
    maxWidth: 600, alignSelf: 'center', width: '100%',
  },
  terminalHeader: {
    flexDirection: 'row', gap: 6, padding: 14,
    backgroundColor: C.surface2, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  dot:         { width: 12, height: 12, borderRadius: 6 },
  terminalBody: { backgroundColor: '#080d18', padding: 24 },
  termLine:    { fontFamily: 'monospace', fontSize: F.sm, marginBottom: 4, color: C.textSub },
  termKey:     { color: '#f472b6', fontFamily: 'monospace' },
  termUrl:     { color: C.accentBright, fontFamily: 'monospace' },
  termPunct:   { color: C.textSub, fontFamily: 'monospace' },
  termProp:    { color: '#818cf8', fontFamily: 'monospace' },
  termVal:     { color: '#fb923c', fontFamily: 'monospace' },
  termStr:     { color: '#4ade80', fontFamily: 'monospace' },
  termComment: { color: C.textDim, fontStyle: 'italic', fontFamily: 'monospace' },

  // CTA SECTION
  ctaSection: {
    alignItems: 'center', justifyContent: 'center',
    padding: 80, overflow: 'hidden',
    borderTopWidth: 1, borderTopColor: C.border,
    backgroundColor: C.surface,
  },
  ctaOrb: {
    position: 'absolute', width: 600, height: 600, borderRadius: 300,
    backgroundColor: 'rgba(14,165,233,0.06)',
  },
  ctaTitle: {
    fontSize: Math.min(F['3xl'], width * 0.09),
    fontWeight: F.black, color: C.text,
    textAlign: 'center', letterSpacing: -1.5,
    lineHeight: Math.min(F['3xl'], width * 0.09) * 1.15, marginBottom: 16, zIndex: 1,
  },
  ctaSub:  { fontSize: F.base, color: C.textSub, marginBottom: 36, zIndex: 1 },
  ctaBtn: {
    backgroundColor: C.accent, borderRadius: R.full,
    paddingVertical: 18, paddingHorizontal: 40, zIndex: 1,
  },
  ctaBtnText: { fontSize: F.md, fontWeight: F.bold, color: '#000' },

  // FOOTER
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 24, paddingHorizontal: 32,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  footerLogo:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerLogoText: { fontSize: F.sm, fontWeight: F.black, color: C.textDim, letterSpacing: 3 },
  footerCopy:     { fontSize: F.xs, color: C.textDim },
});
