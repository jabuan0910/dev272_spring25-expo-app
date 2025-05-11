import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function DetailScreen() {
  const { item } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (item) {
      navigation.setOptions({ title: item });
    }
  }, [navigation, item]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Text style={styles.subtitle}>You selected: {item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
});
