// app/(tabs)/edit-breed/[id].tsx

// import { View, Text } from "react-native";
// import { useLocalSearchParams } from "expo-router";

// export default function EditBreedScreen() {
//   const { id } = useLocalSearchParams();

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Edit Breed Screen</Text>
//       <Text>Breed ID: {id}</Text>
//     </View>
//   );
// }

import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function EditBreedScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Home",
      title: "Edit Breed",
    });
  }, [navigation, name]);

  useEffect(() => {
    if (!id) return;

    const fetchBreed = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("dog_breeds")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        Alert.alert("Error loading breed", error.message);
      } else {
        setName(data.name);
        setOrigin(data.origin);
      }
      setIsLoading(false);
    };

    fetchBreed();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim() || !origin.trim()) {
      Alert.alert("Validation", "Name and origin cannot be empty.");
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from("dog_breeds")
      .update({ name, origin })
      .eq("id", id);

    setIsSaving(false);

    if (error) {
      Alert.alert("Update failed", error.message);
    } else {
      Alert.alert("Success", "Breed updated successfully.");
      router.back(); // go back to previous screen
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading breed...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Edit Dog Breed</Text> */}

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Breed Name"
      />

      <TextInput
        style={styles.input}
        value={origin}
        onChangeText={setOrigin}
        placeholder="Breed Origin"
      />

      <Button
        title={isSaving ? "Saving..." : "Save Changes"}
        onPress={handleSave}
        disabled={isSaving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});
