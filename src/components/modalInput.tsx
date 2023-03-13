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

type ButtonSelectorInterface = Omit<SectionProps, 'type'>;

const buttonSelector = {
  date: (params: ButtonSelectorInterface) => (
    <DatePicker
      label={params.label}
      id={params.id}
      value={params.value}
      fieldValue={params.fieldValue}
    />
  ),
  text: (params: ButtonSelectorInterface) => (
    <>
      <Text style={styles.inputLabel}>{params.label}</Text>
      <TextInput
        onChangeText={text => params.fieldValue(params.id, text)}
        value={params.value}
        style={styles.input}
      />
    </>
  ),
};

export const ModalInput = ({
  label,
  fieldValue,
  id,
  type,
  value,
}: SectionProps): JSX.Element => {
  return <View>{buttonSelector[type]({label, id, value, fieldValue})}</View>;
};
