import React from "react";
import IndexNavigation from "./src/Router/IndexNavigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {


  return (
    <SafeAreaProvider>
      <IndexNavigation></IndexNavigation>
    </SafeAreaProvider>

  );
};


export default App;