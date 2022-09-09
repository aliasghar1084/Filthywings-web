import { View } from 'react-native';
import React, { createContext } from 'react';
import Alert from './alert';
const FirstName = createContext();
const LastName = createContext();

export function App1() {
  let [data, setData] = React.useState("Hello");
  function chang() {
    setData("Hello brother");
  }
  let alert1 = {
    data: data,
    func: chang
  };
  return (
    <View>
      <FirstName.Provider value={alert1}>
        <Alert />

      </FirstName.Provider>

    </View>
  );
}
export function App2() {

  return (
    <View>
      <LastName.Provider value={alert1}>
        <Alert />

      </LastName.Provider>

    </View>
  );
}
export { FirstName };
export { LastName };
