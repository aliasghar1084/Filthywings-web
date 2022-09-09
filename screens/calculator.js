import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  Pressable,
  ActivityIndicator,
  StatusBar,
  Platform
} from "react-native";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import React, { useState, useCallback } from "react";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";
const WingCalculator = ({ navigation, route }) => {
  const [{ token }, dispatch] = useDataLayerValue();
  const [loader, setLoader] = useState(false);
  const [people, setPeople] = React.useState(5);
  const [multiplication, setMultiplication] = React.useState(4);
  const addToCart = () => {
    const total_wings = people * multiplication;
  };
  useFocusEffect(
    useCallback(() => {
      setPeople(5)
    }, [])
  );
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <View style={styles.scrollcontainer}>
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />

      <ImageBackground
        source={require("../assets/wings.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {Platform.OS === "ios" ? (
          <View></View>
        ) : (
          <View style={{ marginTop: 33 }}></View>
        )}
        <View style={{ marginTop: 15 }}></View>
        <View>
          {/* <View style={{ margin: 5 }}></View> */}
          <TouchableOpacity
            style={{ paddingLeft: 12 }}
            onPress={() => {
              if (token) {
                if (route.params == undefined) {
                  navigation.navigate("Accounts")

                }
                else {
                  navigation.navigate("Homescreen")
                }

              }
              else {
                navigation.navigate("Homescreen")
              }
            }}>
            <Image
              style={styles.backicon}
              source={require("../assets/BackIcon.png")}
            />
          </TouchableOpacity>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{
                width: '100%',
                top: 188,
                position: "absolute",
                height: 370,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
              source={require("../assets/blurWings.png")}
            ></Image>
            <View style={styles.logocontainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/trans.png")}
              />
            </View>
            {loader && (
              <View style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                position: "absolute",
                left: '46%',
                zIndex: 999
                // marginTop: 70,
                // marginBottom: 70
              }}>
                <ActivityIndicator
                  size="large"
                  style={{
                    // position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",

                  }}
                  color="#F2C400"
                ></ActivityIndicator>
              </View>
            )}
            <Text style={styles.text1}>Wing Calculator</Text>

            <Slider
              style={{ width: 300, height: 50, marginTop: 10 }}
              minimumValue={1}
              maximumValue={35}
              value={5}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              step={1}
              onValueChange={(value) => setPeople(value)}
            />

            <View style={{ marginBottom: 50, flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  marginTop: 15,
                  color: "#ffffff",
                  fontSize: 14,
                  fontFamily: "MonumentExtended-Regular",
                }}
              >
                No of People

              </Text>
              <Text style={{ color: "#fff", fontSize: 18, fontFamily: "MonumentExtended-Regular", }}>{people}</Text>
            </View>
          </View>

          <View style={{ display: "flex", alignItems: "center" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "MonumentExtended-Regular",
              }}
            >
              No of Wings
            </Text>
            <Text style={{ color: "#fff", fontSize: 18, fontFamily: "MonumentExtended-Regular", }}>{(people * multiplication).toString()}</Text>
            {/* <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 12,
                marginTop: 10,
                alignItems: "center",
                backgroundColor: "white",
              }}
            >

              <TextInput
                editable={false}
                style={{
                  width: "90%",
                  padding: 12,
                  color: "#000000",
                  fontFamily: "Raleway_500Medium",
                  fontSize: 16,
                  backgroundColor: "#ffffff",
                }}
                placeholder="Number of Wings"
                placeholderTextColor="#828282"
                value={(people * multiplication).toString()}
              />
            </View> */}

          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default WingCalculator;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  backicon: {
    height: 23,
    width: 23,
  },
  text1: {
    fontSize: 20,
    color: "white",
    fontFamily: "MonumentExtended-Regular",
    marginTop: 118,
    borderRadius: 2,
  },
  logocontainer: {
    marginTop: 55,
  },
  image: {
    height: 808,
  },
  scrollcontainer: {
    flex: 1,
  },
});
