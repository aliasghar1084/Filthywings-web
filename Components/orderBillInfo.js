import React, { useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { styles } from "../stylesheet";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { useFocusEffect } from "@react-navigation/native";
import FilthyRewards from "../screens/filthyRewards";
export default function OrderBillInfo({ }) {
  var [{ totalprice, overallprice, discount, filthyRewardsCoins, filthyRewards, nomore }, dispatch] =
    useDataLayerValue();
  if (totalprice) {
    totalprice = parseFloat(totalprice);
    totalprice = totalprice.toFixed(2);
  }
  let price = totalprice - discount - filthyRewardsCoins
  price = price.toFixed(2)
  if (price < 0) {
    filthyRewardsCoins = filthyRewardsCoins - filthyRewards
    dispatch({
      type: actionTypes.SET_FILTHYREWARDSCOINS,
      filthyRewardsCoins: filthyRewardsCoins,
    });
  }
  else {
  }
  return (
    <View style={{ paddingTop: 15, paddingBottom: 15 }}>
      {!nomore ? <View></View> : <View ><Text style={{
        marginBottom: 15,
        color: "red",
        fontSize: 12,
        fontFamily: "Raleway_600SemiBold",
      }}>Unable to Redeem Reward</Text></View>}
      <View style={styles.flexrow}>
        <Text style={styles.orderInfoText5}>Subtotal</Text>
        <Text style={styles.orderInfoText5}>£{totalprice}</Text>
      </View>
      <View style={styles.flexrow}>
        <Text style={styles.orderInfoText5}>Discount</Text>
        <Text style={styles.orderInfoText5}>£{discount}</Text>
      </View>
      <View style={styles.flexrow}>
        <Text style={styles.orderInfoText5}>Redeemed coins</Text>
        <Text style={styles.orderInfoText5}>£{filthyRewardsCoins}</Text>
      </View>
      <View style={styles.flexrow}>
        <Text style={styles.orderInfoText3}>Order Total</Text>
        <Text style={styles.orderInfoText3}>
          £{price}
        </Text>
      </View>
    </View>
  );
}
