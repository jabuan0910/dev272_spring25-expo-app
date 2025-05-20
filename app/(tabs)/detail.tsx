import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function BreedDetail() {
  const { name, origin } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (typeof name === "string") {
      navigation.setOptions({
        title: name,
        headerLeft: () => (
          <Text
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 12, color: "#007AFF", fontSize: 17 }}
          >
            ← Home
          </Text>
        ),
      });
    }
  }, [navigation, name]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.origin}>Origin: {origin}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  name: { fontSize: 24, fontWeight: "bold" },
  origin: { marginTop: 10 },
});
