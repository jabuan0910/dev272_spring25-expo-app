import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from './TaskContext';

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState('');
  const { tasks, setTasks } = useTasks();
  const router = useRouter();

  const handleAddTask = () => {
    if (!taskText.trim()) {
      Alert.alert('Please enter a task.');
      return;
    }

    if (tasks.includes(taskText.trim())) {
      Alert.alert('This task already exists.');
      return;
    }

    setTasks(prev => [...prev, taskText.trim()]);
    router.back(); // Navigate back to Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});
