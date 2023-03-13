import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#008577',
    minWidth: 60,
    maxWidth: 60,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    borderRadius: 220,
  },
  buttonPosition: {position: 'absolute', bottom: 10, right: 6},
});

type SectionProps = PropsWithChildren<{
  onPressFunc: () => void;
}>;

export const AddTaskButton = ({onPressFunc}: SectionProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.buttonPosition} onPress={onPressFunc}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> + </Text>
      </View>
    </TouchableOpacity>
  );
};
