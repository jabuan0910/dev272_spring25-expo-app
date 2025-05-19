import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";

export default function AddBreedScreen() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    const { error } = await supabase
      .from("dog_breeds")
      .insert([{ name, origin }]);
    if (error) {
      console.log("Insert error:", error);
    } else {
      router.replace("/"); // Go back to home
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Breed Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Origin</Text>
      <TextInput style={styles.input} value={origin} onChangeText={setOrigin} />

      <Button title="Save Breed" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 10,
  },
});
