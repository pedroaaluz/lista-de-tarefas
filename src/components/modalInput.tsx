import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {DatePicker} from './datePicker';
import {enumModelInput} from '../types/enumModelInput';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#008577',
    borderRadius: 10,
  },
  inputLabel: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'black',
  },
});

type SectionProps = PropsWithChildren<{
  label: string;
  fieldValue: (fieldId: string, value: string) => void;
  id: string;
  value?: string;
  type: enumModelInput;
}>;

export const ModalInput = ({
  label,
  fieldValue,
  id,
  type,
  value,
}: SectionProps): JSX.Element => {
  return (
    <View>
      {type === 'text' ? (
        <>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            onChangeText={text => fieldValue(id, text)}
            value={value}
            style={styles.input}
          />
        </>
      ) : (
        <>
          <DatePicker
            label={label}
            id={id}
            value={value}
            fieldValue={fieldValue}
          />
        </>
      )}
    </View>
  );
};
