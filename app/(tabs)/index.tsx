import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([
    { id: '1', name: 'React Native' },
    { id: '2', name: 'Expo' },
    { id: '3', name: 'JavaScript' },
    { id: '4', name: 'Mobile Development' },
    { id: '5', name: 'Assignment 2' },
  ]);

  const handleSearch = () => {
    console.log('Search triggered:', search);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Assignment 2 📱</Text>

      <TextInput
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    width: '100%',
    textAlign: 'center',
  },
});
