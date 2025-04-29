import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([
    'React Native',
    'Expo',
    'JavaScript',
    'Mobile Development',
    'Assignment 2',
  ]);

  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = () => {
    const filtered = items.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Assignment 2 📱</Text>

      <TextInput
        style={styles.input}
        placeholder="Search items..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
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
