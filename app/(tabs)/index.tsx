import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../TaskContext'; // adjust path as needed
import { Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, setTasks } = useTasks(); // ✅ Use global task list
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>(tasks); // ✅ Based on context

  // Optional: Debug check
  console.log('✅ Tasks from context:', tasks);

  useEffect(() => {
    setFilteredItems(tasks); // ✅ Refresh when tasks update
  }, [tasks]);

  const handleSearch = () => {
    const filtered = tasks.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handlePress = (item: string) => {
    router.push({
      pathname: '/detail',
      params: { item },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignment 3 Task List 📱</Text>

      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch} // triggers search on Enter
      />

      {/* ✅ Test Button */}
      {/* <Button
        title="Add Test Task"
        onPress={() => {
          if (!tasks.includes('Test Task from Context')) {
            setTasks(prev => [...prev, 'Test Task from Context']);
          }
        }}
      /> */}

      <View style={{ height: 10 }} />

      <Button
        title="+ Add New Task"
        onPress={() => router.push('/add-task')}
      />
        
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => handlePress(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
});
