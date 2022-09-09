import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";

const ScanQr = ({ navigation, userJourney }) => {
  return (
    <SafeAreaView style={styles.scrollcontainer}>
      <ScrollView bounces={false} style={styles.scrollView}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/gg.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={{ padding: 12 }}>
              <TouchableOpacity onPress={() => navigation.navigate("All")}>
                <Image
                  style={styles.backicon}
                  source={require("../assets/BackIcon.png")}
                />
              </TouchableOpacity>
              <View style={{ display: "flex", alignItems: "center" }}>
                <Image
                  style={{
                    top: 178,
                    position: "absolute",
                    height: 632,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                  }}
                  source={require("../assets/blurLoading.png")}
                ></Image>
                <View style={styles.logocontainer}>
                  <Image
                    style={styles.tinyLogo}
                    source={require("../assets/trans.png")}
                  />
                </View>
                <Text style={styles.text2}>TIME TO GET SAUCY</Text>
                <Text style={styles.text1}>
                  ensure the qr code is in the frame elow
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("plpcollection", {
                      userJourney: userJourney,
                    })
                  }
                  style={{
                    width: "93%",
                    height: "48%",
                    marginTop: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: "95%", height: "100%" }}
                    source={require("../assets/scnQR.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text2: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 24,
    color: "white",
    marginLeft: 10,
    marginTop: 85,
    borderRadius: 2,
  },
  text1: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
    color: "white",
    width: "82%",
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 10,
  },

  button1: {
    alignItems: "center",
    padding: 8,
    width: "90 %",
    height: 41,
    marginTop: 32,

    backgroundColor: "white",
    borderRadius: 2,
  },
  button2: {
    marginLeft: 20,
    marginRight: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 361,
    height: 41,
    left: 14.5,
    top: 485.42,

    backgroundColor: "white",
    borderRadius: 2,
  },
  button3: {
    marginLeft: 20,
    marginRight: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 361,
    height: 41,
    left: 14.5,
    top: 553.42,

    backgroundColor: "white",
    borderRadius: 2,
  },
  text: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
    color: "black",
  },
  backicon: {
    height: 23,
    width: 23,
  },
  pos: {
    marginTop: 100,
  },
  logocontainer: {
    marginTop: 35,
  },
  scrollcontainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    height: 810,
  },
  image: {
    flex: 1,
  },
});

export default ScanQr;
