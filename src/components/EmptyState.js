import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import AppButton from './AppButton';

// props: icon (Feather name), message, actionLabel, onAction
export default function EmptyState({ icon, message, actionLabel, onAction }) {
  return (
    <View style={styles.wrap}>
      <Feather name={icon} size={40} color={colors.lineStrong} />
      <Text style={styles.message}>{message}</Text>
      {actionLabel && (
        <AppButton
          label={actionLabel}
          onPress={onAction}
          variant="secondary"
          style={styles.btn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.lg,
    paddingHorizontal: space.xl,
    paddingVertical: space.xxl * 2,
  },
  message: {
    ...type.body,
    color: colors.muted,
    textAlign: 'center',
  },
  btn: { alignSelf: 'stretch' },
});
