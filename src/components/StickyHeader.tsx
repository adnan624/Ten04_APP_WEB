import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F, R } from '../theme';

type Props = {
  title: string;
  onBack?: () => void;
  rightLabel?: string;
  onRight?: () => void;
};

const StickyHeader: React.FC<Props> = ({ title, onBack, rightLabel, onRight }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.header, { paddingTop: insets.top + 14 }]}>
      <View style={s.side}>
        {onBack ? (
          <TouchableOpacity style={s.backBtn} onPress={onBack}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={s.logoRow}>
            <View style={s.logoDot} />
            <Text style={s.logoText}>TEN04</Text>
          </View>
        )}
      </View>

      <Text style={s.title}>{title}</Text>

      <View style={[s.side, s.sideRight]}>
        {rightLabel && onRight ? (
          <TouchableOpacity style={s.rightBtn} onPress={onRight}>
            <Text style={s.rightBtnText}>{rightLabel}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default StickyHeader;

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: `${C.accent}30`,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  side:      { width: 90, alignItems: 'flex-start' },
  sideRight: { alignItems: 'flex-end' },

  logoRow:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoDot:  { width: 7, height: 7, borderRadius: 4, backgroundColor: C.accent },
  logoText: { fontSize: F.sm, fontWeight: F.black, color: C.text, letterSpacing: 3 },

  title: {
    flex: 1, textAlign: 'center',
    fontSize: F.base, fontWeight: F.bold, color: C.text,
  },

  backBtn: {
    width: 32, height: 32, borderRadius: R.md,
    backgroundColor: C.surface2, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: C.text, lineHeight: 26, marginTop: -2 },

  rightBtn: {
    backgroundColor: C.accentDim,
    borderWidth: 1, borderColor: `${C.accent}30`,
    borderRadius: R.full,
    paddingVertical: 5, paddingHorizontal: 12,
  },
  rightBtnText: { fontSize: F.xs, fontWeight: F.bold, color: C.accent },
});
