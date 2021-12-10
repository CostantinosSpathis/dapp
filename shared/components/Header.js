import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    backgroundColor: 'blue'
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10
  }
});

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>I'm a shared component.</Text>
    </View>
  );
};

export default Header;