import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 20,
    backgroundColor: '#008577',
    minWidth: 60,
    maxWidth: 60,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 220,
    textTransform: 'uppercase',
  },
  buttonPosition: {position: 'absolute', bottom: 10, left: 6},
});

type SectionProps = PropsWithChildren<{
  onPressFunc: () => void;
  order: string;
}>;

export const OrderTaskButton = ({
  onPressFunc,
  order,
}: SectionProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.buttonPosition} onPress={onPressFunc}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {order} </Text>
      </View>
    </TouchableOpacity>
  );
};
