import React from "react";
import { Text, View, StyleSheet } from "react-native";

const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Climbing App</Text>
      <Text style={styles.subtitle}>Welcome to your climbing journey!</Text>
      <Text style={styles.description}>
        Track your routes, log your ascents, and discover new climbing spots.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default index;
