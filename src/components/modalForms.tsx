import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {ModalInput} from './modalInput';
import type {TaskInterface} from '../types/task';
import {enumModelInput} from '../types/enumModelInput';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputLabel: {
    marginLeft: 12,
    fontSize: 18,
  },
  modalButton: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#008577',
    padding: 15,
    borderRadius: 20,
  },
  modalBody: {
    padding: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textTransform: 'capitalize',
  },
});

type SectionProps = PropsWithChildren<{
  fields: Record<string, string>[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}>;

export const ModalForms = ({
  fields,
  setVisible,
  setTasks,
}: SectionProps): JSX.Element => {
  const [fieldsValues, setFieldsValues] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldsValues({...fieldsValues, [fieldId]: value});
  };

  const finishedModal = (task: {
    name: string;
    description: string;
    date: string;
  }) => {
    console.log('ss', {x: Object.values(task).length, task});

    if (Object.values(task).length >= 3) {
      setTasks(oldTasks => [...oldTasks, {id: oldTasks.length + 1, ...task}]);
      setVisible(false);
    } else {
      Alert.alert('Necessário preencher todos os campos');
    }
  };

  return (
    <View style={styles.modalBody}>
      {fields.map(({label, value, type}, index) => (
        <ModalInput
          label={label}
          id={value}
          fieldValue={handleFieldChange}
          type={type as enumModelInput}
          // @ts-ignore help meeeeeeeeeeeeeee
          value={fieldsValues[index]}
          key={index}
        />
      ))}

      <TouchableOpacity
        onPress={() =>
          // @ts-ignore
          finishedModal(fieldsValues)
        }>
        <View style={styles.modalButton}>
          <Text style={styles.buttonText}>Adicionar tarefa</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
