import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";




export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);



  const initializePaymentSheet = async () => {


    const { error } = await initPaymentSheet({
      customerId: "cus_Lw8D204JQiTHQl",
      customerEphemeralKeySecret: "ek_test_YWNjdF8xSUJzNmFBdVlTSVBEcWZJLDhFZG43aDZQa3JUSFFmTjlVY3ZSbVlwZ3ZZVWJoRTA_00qrdom9Jg",
      paymentIntentClientSecret: "pi_3LEFxRAuYSIPDqfI1nsFsiaZ_secret_t1TBuAv9lbOU7rdCZziKUu5Uz",
      merchantDisplayName: 'Merchant Name',


      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }


  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>

      <Button


        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});