import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
/* import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'; */
import DateTimePicker from 'react-native-date-picker';
import {formatDate} from '../utils/formatDate';

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
  date: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: 'black',
  },
});

type SectionProps = PropsWithChildren<{
  label: string;
  fieldValue: (fieldId: string, value: string) => void;
  id: string;
  value?: string;
}>;

export const DatePicker = ({
  label,
  fieldValue,
  id,
}: SectionProps): JSX.Element => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const currentDate = new Date();

  const onChange = (selectedDate?: Date | undefined) => {
    if (!selectedDate) {
      throw new Error('Error in datepicker');
    }

    setShowDatePicker(false);

    fieldValue(id, formatDate(selectedDate));
    setDate(selectedDate);
  };

  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </TouchableOpacity>
      <DateTimePicker
        open={showDatePicker}
        date={date}
        modal={true}
        is24hourSource={'locale'}
        mode={'datetime'}
        onConfirm={newDate => {
          setShowDatePicker(false);
          onChange(newDate);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        confirmText="Confirmar"
        cancelText="Cancelar"
        minimumDate={currentDate}
      />
    </>
  );
};
