// add this after other import statements
import Header from './shared/components/Header';

// Modify the JSX in App component
const App = () => {
  return (
    <View styles={styles.screenContainer}>
      <Header />
      <Text style={styles.text}>I'm a React Native component</Text>
    </View>
  );
};