import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {TaskInterface} from '../types/task';

type SectionProps = PropsWithChildren<{
  name: string;
  description: string;
  date: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  index: number;
  tasks: TaskInterface[];
}>;

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    justifyContent: 'space-between',
    borderColor: '#a9a9a9',
    borderWidth: 0.5,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3e4149',
    marginBottom: 10,
    textTransform: 'capitalize',
    flexDirection: 'row',
  },
  cardMiddlewareText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardEmote: {fontSize: 20},
  cardClosedButton: {height: 22, alignItems: 'center'},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardName: {flexDirection: 'row'},
  cardClosedButtonText: {
    color: 'red',
    fontSize: 20,
  },
});

const emotes = ['👀', '⭐', '✨', '😳', '👽', '🖖', '🤧'];

export function CardTask({
  name,
  description,
  date,
  setTasks,
  tasks,
  index,
}: SectionProps): JSX.Element {
  const deleteCardTask = (tasks: TaskInterface[], cardIndex: number) => {
    const newTasks = tasks.filter(task => task.id !== cardIndex);

    setTasks(newTasks);
  };

  const [emote, setEmote] = useState(Math.floor(Math.random() * emotes.length));

  const getEmote = (curEmote: number) => {
    let newEmote = Math.floor(Math.random() * emotes.length);

    while (newEmote === curEmote) {
      newEmote = Math.floor(Math.random() * emotes.length);
    }

    return newEmote;
  };

  return (
    <View style={styles.cardBody}>
      <View style={styles.cardHeader}>
        <View style={styles.cardName}>
          <Text style={styles.cardHeaderText}> {name} </Text>
          <TouchableOpacity
            onPress={() => setEmote(curEmote => getEmote(curEmote))}>
            <Text style={styles.cardEmote}>{emotes[emote]}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cardClosedButton}
          onPress={() => deleteCardTask(tasks, index)}>
          <Text style={styles.cardClosedButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardMiddlewareText}> {description} </Text>
      <Text> {date} </Text>
    </View>
  );
}
