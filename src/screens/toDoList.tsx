import {CardTask} from '../components/cardTask';
import {
  SafeAreaView,
  Modal,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import React, {useState} from 'react';
import {ModalForms} from '../components/modalForms';
import type {TaskInterface} from '../types/task';
import {AddTaskButton} from '../components/addTaskButton';
import {parse} from 'date-fns';
import {OrderTaskButton} from '../components/OrderTaskButton';

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FCFCFC',
    marginBottom: 20,
  },
});

export const ToDoList = (): JSX.Element => {
  const sortByDate = (
    tasks: TaskInterface[],
    order: 'asc' | 'desc',
  ): TaskInterface[] => {
    const sortedTasks = tasks.sort((a, b) => {
      const dateA = parse(a.date, 'MM/dd/yyyy, HH:mm:ss', new Date());
      const dateB = parse(b.date, 'MM/dd/yyyy, HH:mm:ss', new Date());

      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    return sortedTasks;
  };

  const [tasks, setTasks] = useState<TaskInterface[]>([
    {
      id: 233,
      name: 'Nova tarefa',
      description: 'crie uma nova tarefa apertando no botão de +',
      date: '03/13/2023, 20:47:37',
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [dateOrder, setDateOrder] = useState<'asc' | 'desc'>('asc');

  const renderItem = ({item}: ListRenderItemInfo<TaskInterface>) => {
    const {name, description, date, id} = item;

    return (
      <CardTask
        name={name}
        description={description}
        date={date}
        index={id}
        setTasks={setTasks}
        tasks={tasks}
        key={id}
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainScreen}>
      <Modal visible={visible} animationType="fade">
        <ModalForms
          fields={[
            {label: 'nome', value: 'name', type: 'text'},
            {label: 'descrição', value: 'description', type: 'text'},
            {label: 'data', value: 'date', type: 'date'},
          ]}
          setVisible={setVisible}
          setTasks={setTasks}
        />
      </Modal>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <OrderTaskButton
        order={dateOrder}
        onPressFunc={() => {
          setDateOrder(order => (order === 'desc' ? 'asc' : 'desc'));
          console.log(dateOrder);

          const orderedTasks = sortByDate(tasks, dateOrder);
          console.log(orderedTasks);
          setTasks(orderedTasks);
        }}
      />
      <AddTaskButton onPressFunc={() => setVisible(true)} />
    </SafeAreaView>
  );
};
