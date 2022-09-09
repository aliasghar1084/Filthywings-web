import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "../stylesheet";
export default function Choose(props) {
  return (
    <View style={[styles.chooseSet]}>
      <View style={styles.width2}></View>
      <Image
        style={styles.chooseImage}
        source={require("../assets/chooseImage.png")}
      ></Image>
      <View style={styles.width1}></View>
      <View style={styles.chooseAlign}>
        <Text style={styles.chooseText1}>{props.location}</Text>
        <Text style={styles.chooseText2}>{props.distance}</Text>
        <Text style={styles.chooseText2}>{props.time}</Text>
      </View>
    </View>
  );
}
