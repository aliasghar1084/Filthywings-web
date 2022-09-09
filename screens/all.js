import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../stylesheet';

export default function All({ navigation }) {
  return (

    <View style={[styles.container, { padding: 23 }]}>


      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Signin")}>Signin</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("AddToBasket")}>AddTobasket</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("CollectionLocation")}>CollectionLocation</Text></TouchableOpacity>

      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Collections")}>Collections</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("ChooseCollection")}>ChooseCollection</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("collectYourFilth")}>collectYourFilth</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("cookingYourFilth")}>cookingYourFilth</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Deliver")}>Deliver</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Details")}>Details</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("FollowYourFilth")}>Order delivered</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Home")}>Home</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Loading")}>Loading</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("plpcollection")}>plpcollection</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("ScanQR")}>ScanQR</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("Signup")}>Signup</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{
        textDecorationLine: 'underline',
        textDecorationColor: '#F2C400',
        fontFamily: 'Raleway_700Bold',
        color: '#F2C400',
        fontSize: 20
      }} onPress={() => navigation.navigate("YourBasket")}>YourBasket</Text></TouchableOpacity>
    </View>
  );
}
