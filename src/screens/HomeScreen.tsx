import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Animated,
} from 'react-native';
import StickyHeader from '../components/StickyHeader';
import PlatformHeader from '../components/PlatformHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F, R } from '../theme';
import type { HomeScreenProps } from '../types/navigation';

const QUICK_ACTIONS = [
  { icon: '↑', label: 'Send',    color: C.accent },
  { icon: '↓', label: 'Receive', color: C.green },
  { icon: '⟳', label: 'History', color: C.gold },
  { icon: '⋯', label: 'More',    color: C.textSub },
];

const TRANSACTIONS = [
  { name: 'Razorpay Settlement',   amount: '+₹84,200',   time: '2 min ago',  tag: 'credit', icon: '💳' },
  { name: 'AWS Infrastructure',    amount: '-₹12,450',   time: '1 hr ago',   tag: 'debit',  icon: '☁️' },
  { name: 'Stripe Payout',         amount: '+₹1,20,000', time: '3 hr ago',   tag: 'credit', icon: '💰' },
  { name: 'Team Payroll — Jun',    amount: '-₹3,40,000', time: 'Yesterday',  tag: 'debit',  icon: '👥' },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const insets   = useSafeAreaInsets();
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={s.screen}>
      {/* ── STICKY HEADER — always fixed above scroll ───────── */}
      <StickyHeader
        title="Dashboard"
        rightLabel="Settings"
        onRight={() => navigation.navigate('Settings')}
      />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[s.body, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          <PlatformHeader />

          <View style={s.greeting}>
            <Text style={s.greetLabel}>Good morning</Text>
            <Text style={s.greetName}>Dashboard</Text>
          </View>

          {/* Balance card */}
          <View style={s.balanceCard}>
            <View style={s.balanceGlow} />
            <Text style={s.balanceLabel}>Total Balance</Text>
            <Text style={s.balanceAmount}>₹24,82,150<Text style={s.balanceCents}>.00</Text></Text>
            <View style={s.balanceFooter}>
              <View style={s.balancePill}>
                <Text style={s.balancePillText}>↑ 12.4%  this month</Text>
              </View>
              <Text style={s.balanceUpdated}>Live</Text>
            </View>
          </View>

          {/* Quick actions */}
          <View style={s.quickRow}>
            {QUICK_ACTIONS.map((a, i) => (
              <TouchableOpacity key={i} style={s.quickBtn}>
                <View style={[s.quickIcon, { backgroundColor: `${a.color}18`, borderColor: `${a.color}30` }]}>
                  <Text style={[s.quickIconText, { color: a.color }]}>{a.icon}</Text>
                </View>
                <Text style={s.quickLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Stats row */}
          <View style={s.statsRow}>
            <View style={[s.statCard, { borderColor: `${C.green}30`, backgroundColor: C.greenDim }]}>
              <Text style={s.statLabel}>Income</Text>
              <Text style={[s.statVal, { color: C.green }]}>₹2,04,200</Text>
              <Text style={[s.statDelta, { color: C.green }]}>↑ 8.1%</Text>
            </View>
            <View style={[s.statCard, { borderColor: `${C.red}30`, backgroundColor: C.redDim }]}>
              <Text style={s.statLabel}>Expenses</Text>
              <Text style={[s.statVal, { color: C.red }]}>₹3,52,450</Text>
              <Text style={[s.statDelta, { color: C.red }]}>↓ 3.2%</Text>
            </View>
          </View>

          {/* Transactions */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={s.sectionLink}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={s.txList}>
            {TRANSACTIONS.map((tx, i) => (
              <View key={i} style={[s.txRow, i < TRANSACTIONS.length - 1 && s.txBorder]}>
                <View style={s.txIcon}>
                  <Text style={{ fontSize: 20 }}>{tx.icon}</Text>
                </View>
                <View style={s.txMeta}>
                  <Text style={s.txName}>{tx.name}</Text>
                  <Text style={s.txTime}>{tx.time}</Text>
                </View>
                <Text style={[s.txAmount, { color: tx.tag === 'credit' ? C.green : C.red }]}>
                  {tx.amount}
                </Text>
              </View>
            ))}
          </View>

          {/* Nav buttons */}
          <View style={s.navRow}>
            <TouchableOpacity style={s.navBtn} onPress={() => navigation.navigate('Form')}>
              <Text style={s.navBtnText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.navBtn, s.navBtnOutline]} onPress={() => navigation.navigate('Settings')}>
              <Text style={s.navBtnOutlineText}>Settings</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen:       { flex: 1, backgroundColor: C.bg },
  scroll:        { flex: 1 },
  scrollContent: { flexGrow: 1 },
  body:          { padding: 20, paddingBottom: 48 },

  greeting:   { marginBottom: 20 },
  greetLabel: { fontSize: F.sm, color: C.textDim, marginBottom: 2 },
  greetName:  { fontSize: F['2xl'], fontWeight: F.black, color: C.text, letterSpacing: -0.5 },

  balanceCard: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.borderBright,
    borderRadius: R['2xl'], padding: 24, marginBottom: 16,
    overflow: 'hidden',
  },
  balanceGlow: {
    position: 'absolute', top: -60, right: -60,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: C.accentDim,
  },
  balanceLabel:  { fontSize: F.sm, color: C.textDim, marginBottom: 6 },
  balanceAmount: { fontSize: F['4xl'], fontWeight: F.black, color: C.text, letterSpacing: -2 },
  balanceCents:  { fontSize: F.xl, color: C.textDim },
  balanceFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  balancePill: {
    backgroundColor: `${C.green}18`, borderWidth: 1, borderColor: `${C.green}30`,
    borderRadius: R.full, paddingVertical: 4, paddingHorizontal: 10,
  },
  balancePillText: { fontSize: F.xs, color: C.green, fontWeight: F.semi },
  balanceUpdated:  { fontSize: F.xs, color: C.accent, fontWeight: F.semi },

  quickRow:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  quickBtn:     { alignItems: 'center', flex: 1 },
  quickIcon: {
    width: 52, height: 52, borderRadius: R.lg,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, marginBottom: 6,
  },
  quickIconText: { fontSize: F.lg, fontWeight: F.bold },
  quickLabel:    { fontSize: F.xs, color: C.textSub },

  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, borderWidth: 1, borderRadius: R.xl, padding: 16 },
  statLabel: { fontSize: F.xs, color: C.textDim, marginBottom: 6 },
  statVal:   { fontSize: F.xl, fontWeight: F.black },
  statDelta: { fontSize: F.xs, marginTop: 2 },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { fontSize: F.base, fontWeight: F.bold, color: C.text },
  sectionLink:  { fontSize: F.sm, color: C.accent },

  txList: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: R.xl, overflow: 'hidden', marginBottom: 24,
  },
  txRow:    { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  txBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  txIcon: {
    width: 42, height: 42, borderRadius: R.md,
    backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center',
  },
  txMeta:   { flex: 1 },
  txName:   { fontSize: F.sm, fontWeight: F.semi, color: C.text },
  txTime:   { fontSize: F.xs, color: C.textDim, marginTop: 2 },
  txAmount: { fontSize: F.sm, fontWeight: F.bold },

  navRow: { flexDirection: 'row', gap: 12 },
  navBtn: {
    flex: 1, backgroundColor: C.accent,
    borderRadius: R.xl, paddingVertical: 14, alignItems: 'center',
  },
  navBtnText:        { fontSize: F.sm, fontWeight: F.bold, color: '#000' },
  navBtnOutline:     { backgroundColor: 'transparent', borderWidth: 1, borderColor: C.border },
  navBtnOutlineText: { fontSize: F.sm, fontWeight: F.medium, color: C.textSub },
});
