import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Switch, ScrollView,
} from 'react-native';
import { C, F, R } from '../theme';
import StickyHeader from '../components/StickyHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SettingsScreenProps } from '../types/navigation';

type ToggleKey = 'notifications' | 'biometric' | 'darkMode' | 'analytics';

const PROFILE = {
  name:     'Adnan Sheikh',
  role:     'Account Administrator',
  plan:     'Enterprise',
  initials: 'AS',
};

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const insets = useSafeAreaInsets();
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    notifications: true,
    biometric:     true,
    darkMode:      true,
    analytics:     false,
  });

  const toggle = (key: ToggleKey) =>
    setToggles(t => ({ ...t, [key]: !t[key] }));

  return (
    <View style={s.screen}>
      {/* ── STICKY HEADER — always fixed above scroll ───────── */}
      <StickyHeader title="Settings" onBack={() => navigation.goBack()} />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.body}>

          {/* Profile card */}
          <View style={s.profileCard}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{PROFILE.initials}</Text>
            </View>
            <View style={s.profileMeta}>
              <Text style={s.profileName}>{PROFILE.name}</Text>
              <Text style={s.profileRole}>{PROFILE.role}</Text>
            </View>
            <View style={s.planBadge}>
              <Text style={s.planText}>{PROFILE.plan}</Text>
            </View>
          </View>

          {/* Security */}
          <Text style={s.groupLabel}>Security</Text>
          <View style={s.group}>
            <ToggleRow
              icon="🔔"
              title="Push Notifications"
              desc="Transaction alerts and updates"
              value={toggles.notifications}
              onToggle={() => toggle('notifications')}
            />
            <View style={s.divider} />
            <ToggleRow
              icon="🔑"
              title="Biometric Login"
              desc="Face ID / Fingerprint authentication"
              value={toggles.biometric}
              onToggle={() => toggle('biometric')}
            />
          </View>

          {/* Preferences */}
          <Text style={s.groupLabel}>Preferences</Text>
          <View style={s.group}>
            <ToggleRow
              icon="🌙"
              title="Dark Mode"
              desc="Always use dark interface"
              value={toggles.darkMode}
              onToggle={() => toggle('darkMode')}
            />
            <View style={s.divider} />
            <ToggleRow
              icon="📊"
              title="Usage Analytics"
              desc="Help improve the product"
              value={toggles.analytics}
              onToggle={() => toggle('analytics')}
            />
          </View>

          {/* Account */}
          <Text style={s.groupLabel}>Account</Text>
          <View style={s.group}>
            {[
              { icon: '🧾', label: 'Billing & Invoices' },
              { icon: '👥', label: 'Team Members' },
              { icon: '🔗', label: 'API Keys' },
              { icon: '📋', label: 'Audit Log' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={s.linkRow}>
                  <Text style={s.linkIcon}>{item.icon}</Text>
                  <Text style={s.linkLabel}>{item.label}</Text>
                  <Text style={s.linkArrow}>›</Text>
                </TouchableOpacity>
                {i < arr.length - 1 && <View style={s.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Buttons */}
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backBtnText}>← Back to Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.signOutBtn}>
            <Text style={s.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          <Text style={s.version}>Ten04 v1.0.0 · Build 2025</Text>

        </View>
      </ScrollView>
    </View>
  );
}

function ToggleRow({ icon, title, desc, value, onToggle }: {
  icon: string; title: string; desc: string;
  value: boolean; onToggle: () => void;
}) {
  return (
    <View style={s.toggleRow}>
      <Text style={s.toggleIcon}>{icon}</Text>
      <View style={s.toggleMeta}>
        <Text style={s.toggleTitle}>{title}</Text>
        <Text style={s.toggleDesc}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: C.border, true: C.accentGlow }}
        thumbColor={value ? C.accent : C.textDim}
        ios_backgroundColor={C.border}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: C.bg },
  scroll:        { flex: 1 },
  scrollContent: { flexGrow: 1 },
  body:          { padding: 20, paddingBottom: 48 },

  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: R['2xl'], padding: 16, marginBottom: 28, gap: 12,
  },
  avatar: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: C.accentDim, borderWidth: 1.5, borderColor: C.accentGlow,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText:  { fontSize: F.base, fontWeight: F.black, color: C.accent },
  profileMeta: { flex: 1 },
  profileName: { fontSize: F.base, fontWeight: F.bold, color: C.text },
  profileRole: { fontSize: F.xs, color: C.textDim, marginTop: 2 },
  planBadge: {
    backgroundColor: C.goldDim, borderWidth: 1, borderColor: `${C.gold}40`,
    borderRadius: R.full, paddingVertical: 4, paddingHorizontal: 10,
  },
  planText: { fontSize: F.xs, fontWeight: F.bold, color: C.gold },

  groupLabel: {
    fontSize: F.xs, fontWeight: F.semi, color: C.textDim,
    letterSpacing: 1, marginBottom: 8, marginLeft: 4,
  },
  group: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: R.xl, overflow: 'hidden', marginBottom: 24,
  },
  divider: { height: 1, backgroundColor: C.border, marginLeft: 52 },

  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  toggleIcon:  { fontSize: 20, width: 28, textAlign: 'center' },
  toggleMeta:  { flex: 1 },
  toggleTitle: { fontSize: F.sm, fontWeight: F.semi, color: C.text },
  toggleDesc:  { fontSize: F.xs, color: C.textDim, marginTop: 1 },

  linkRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  linkIcon:  { fontSize: 18, width: 28, textAlign: 'center' },
  linkLabel: { flex: 1, fontSize: F.sm, color: C.text, fontWeight: F.medium },
  linkArrow: { fontSize: F.lg, color: C.textDim },

  backBtn: {
    backgroundColor: C.accentDim,
    borderWidth: 1, borderColor: `${C.accent}30`,
    borderRadius: R.xl, paddingVertical: 14,
    alignItems: 'center', marginBottom: 12,
  },
  backBtnText: { fontSize: F.sm, fontWeight: F.bold, color: C.accent },

  signOutBtn: {
    borderWidth: 1, borderColor: `${C.red}30`,
    backgroundColor: C.redDim,
    borderRadius: R.xl, paddingVertical: 14,
    alignItems: 'center', marginBottom: 24,
  },
  signOutText: { fontSize: F.sm, fontWeight: F.semi, color: C.red },

  version: { fontSize: F.xs, color: C.textDim, textAlign: 'center' },
});
