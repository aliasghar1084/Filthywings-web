import React from "react";
import { Text, View } from "react-native";
import { styles } from "../stylesheet";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
export default function YourOrder() {
  const [{ cart, saveorder }, dispatch] = useDataLayerValue();
  return (
    <View>
      {cart.map((element, index) => {
        return (
          <View >
            <View key={index} style={styles.infoSet}>
              <Text style={{
                color: "#828282",
                // textTransform: "uppercase",
                fontFamily: "Raleway_700Bold",
                fontSize: 12,
                width: 250,
              }}>
                The {element.productName} - {element.productCategory} chicken 😈
              </Text>
              <Text style={{
                color: "#828282",
                // textTransform: "uppercase",
                fontFamily: "Raleway_700Bold",
                fontSize: 10,
              }}>X{element.quantity}</Text>
            </View>
            {element.productTotal === undefined ? <View></View> :
              element.productTotal.map((ele, index) => {
                return (
                  <View style={{
                    width: '100%', flexDirection: 'row', alignItems: 'space-between'
                    , justifyContent: 'space-between'
                  }} >
                    <Text style={{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 10,
                      width: '75%'
                    }}>{ele.productVariantName}</Text>
                    <View style={{ width: '5%' }}></View>
                    <Text></Text>
                    <Text style={{
                      color: "#828282",
                      textAlign: 'right',
                      fontFamily: "Raleway_700Bold",
                      fontSize: 10,
                      width: '15%'
                    }}>+£{ele.addsOnPrize}</Text></View>
                )
              })}
          </View>
        );
      })}
    </View>
  );
}
