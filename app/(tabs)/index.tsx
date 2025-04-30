import { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([
    'React Native',
    'Expo',
    'JavaScript',
    'Mobile Development',
    'Assignment 3',
  ]);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = () => {
    const filtered = items.filter(item =>
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
        placeholder="Search items..."
        value={searchText}
        onChangeText={setSearchText}
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
