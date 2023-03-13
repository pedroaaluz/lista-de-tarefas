import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

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

  const [date, setDate] = useState('');

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    const currentDate = selectedDate;

    if (!currentDate) {
      throw new Error('Error in datepicker');
    }

    const formatString = 'MM/dd/yyyy, HH:mm:ss';
    const formatDate = format(currentDate, formatString);

    setShowDatePicker(false);

    fieldValue(id, formatDate);
    setDate(formatDate);
  };

  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}>
        <Text style={styles.date}>{date}</Text>

        {showDatePicker && (
          <DateTimePicker
            onChange={onChange}
            value={new Date()}
            display="clock"
            mode="time"
            is24Hour={true}
          />
        )}
      </TouchableOpacity>
    </>
  );
};
