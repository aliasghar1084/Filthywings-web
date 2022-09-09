import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import ImgViewer from "react-native-image-viewer-web";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

import { useForm, Controller } from "react-hook-form";

const Signin = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    const url = ""
    const [data, setData] = useState({
        firstname: "",
        lastname: ""
    })

    const { control, handleSubmit } = useForm();

    const onsignuppressed = (data) => {
        navigation.navigate('Homescreen')
    };

    return (
        <SafeAreaView style={styles.scrollcontainer}>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[{ margin: 10 }]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../assets/BackIcon.png")}
                    />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.logocontainer}>
                        <ImgViewer imgs={[require("../assets/Logo-White.jpg")]} />
                    </View>

                    <View style={styles.containe}>
                        <View style={styles.butto}>
                            <TouchableOpacity
                                activeOpacity={0.95}
                                style={styles.Bitton}
                                onPress={() => navigation.navigate("Signin")}
                            >
                                <Text style={styles.tixt}> SIGN IN</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    marginTop: 20,
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <View style={{ width: "10%" }}></View>
                                <Image
                                    style={{ width: "90%" }}
                                    source={require("../assets/Vector.png")}
                                />
                            </View>
                        </View>
                        <View style={styles.rightbutto}>
                            <TouchableOpacity
                                activeOpacity={0.95}
                                style={styles.Bitton}
                            >
                                <Text style={styles.tixt}> SIGN UP</Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    marginTop: 20,
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Image
                                    style={{ width: "90%" }}
                                    source={require("../assets/yline.png")}
                                />
                                <View style={{ width: "10%" }}></View>
                            </View>
                        </View>
                    </View>




                    <View style={styles.containe13}>
                        <View>
                            <Text style={styles.text1}>First Name</Text>



                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="#fff"
                                style={{
                                    marginTop: 8,
                                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                                    borderWidth: 1,
                                    borderColor: "rgba(155, 155, 155, 0.2)",
                                    fontFamily: "Raleway_400Regular",
                                    fontSize: 14,
                                    color: "#ffffff",
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.containe1}>
                        <View>
                            <Text style={styles.text1}>Last Name</Text>

                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="#fff"
                                style={{
                                    marginTop: 8,
                                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                                    borderWidth: 1,
                                    borderColor: "rgba(155, 155, 155, 0.2)",
                                    fontFamily: "Raleway_400Regular",
                                    fontSize: 14,
                                    color: "#ffffff",
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.containe1}>
                        <View>
                            <Text style={styles.text1}>Email</Text>

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#fff"
                                style={{
                                    marginTop: 8,
                                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                                    borderWidth: 1,
                                    borderColor: "rgba(155, 155, 155, 0.2)",
                                    fontFamily: "Raleway_400Regular",
                                    fontSize: 14,
                                    color: "#ffffff",
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.containe2}>
                        <View>
                            <Text style={styles.text1}>Password</Text>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                style={{
                                    marginTop: 8,
                                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                                    borderWidth: 1,
                                    borderColor: "rgba(155, 155, 155, 0.2)",
                                    fontFamily: "Raleway_400Regular",
                                    fontSize: 14,
                                    color: "#ffffff",
                                }}
                                secureTextEntry={passwordVisible}
                                right={
                                    <TextInput.Icon
                                        name={passwordVisible ? "eye" : "eye-off"}
                                        onPress={() => setPasswordVisible(!passwordVisible)}
                                    />
                                }
                            />
                        </View>
                        <View style={{ marginTop: 15, width: "100%" }}>
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: "#828282",
                                    fontFamily: "Raleway_500Medium",
                                }}
                            >
                                Passwords must include a minimum of 8 characters, a lowercase
                                letter, an uppercaseletter and a number.
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                alignContent: "center",
                                backgroundColor: "#F2C400",
                                width: "90%",
                                marginTop: 30,
                                height: 41,
                            }}
                            activeOpacity={0.95}
                            onPress={() => navigation.navigate("CollectYourFilth")}
                        >
                            <Text style={styles.signintext}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "2.5%",
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 30,
                        }}
                    >
                        <View
                            style={{ height: "5%", width: "42%", backgroundColor: "#828282" }}
                        ></View>
                        <Text
                            style={{
                                width: "16%",
                                textAlign: "center",
                                fontSize: 16,
                                height: "100%",
                                fontFamily: "MonumentExtended-Regular",
                                textTransform: "uppercase",
                                color: "#828282",
                            }}
                        >
                            or
                        </Text>
                        <View
                            style={{ height: "5%", width: "42%", backgroundColor: "#828282" }}
                        ></View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text
                            style={{
                                color: "#828282",
                                fontSize: 12,
                                fontFamily: "MonumentExtended-Regular",
                                marginTop: 10,
                            }}
                        >
                            CHECKOUT AS GUEST
                        </Text>
                    </View>

                    <View
                        style={{
                            marginTop: 5,
                            width: "100%",
                            height: "1%",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                height: "20%",
                                width: "45%",
                                backgroundColor: "#828282",
                            }}
                        ></View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity activeOpacity={0.95} style={styles.googleButton}>
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require("../assets/google.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            alignContent: "center",
                            alignItems: "center",
                            marginTop: 30,
                            marginBottom: 30,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.95}
                            style={styles.fbButton}
                            onPress={() => { }}
                        >
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require("../assets/facebook.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
    },
    containe13: {
        marginTop: 48,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "90%",
    },
    containe1: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "90%",
    },
    containe2: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "90%",
    },
    containe: {
        marginTop: 46,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    butto: {
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        height: 40,
    },
    rightbutto: {
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        height: 40,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        backgroundColor: "yellow",
    },
    leftHeader: {
        marginLeft: 20,
        padding: 10,
        alignSelf: "flex-start",
        backgroundColor: "red",
    },
    rightHeader: {
        marginRight: 20,
        padding: 10,
        alignSelf: "flex-end",
        backgroundColor: "red",
    },
    line1: {
        height: 1,
        width: 195,
        backgroundColor: "#ffffff",
        top: 80,
        display: "flex",
    },
    line: {
        alignItems: "center",
        justifyContent: "center",
        top: 20,
        height: 5,
        width: 200,
        marginTop: 20,
        color: "white",
    },
    checkout: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 100,
        marginRight: 20,
        top: 615,
        height: 5,
        width: 200,
        marginTop: 80,
    },
    or: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 25,
        marginRight: 20,
        height: 35,
        width: "90%",
        marginTop: 10,
    },
    ore: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 25,
        marginRight: 20,
        height: 35,
        width: "90%",
        marginTop: 10,
    },
    forgotText: {
        top: 10,
        color: "white",
        marginLeft: 210,
    },
    baseText: {
        color: "white",
        fontWeight: "bold",
    },
    innerText: {
        top: 10,
        color: "white",
        fontWeight: "bold",
    },
    continuewithgoogle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    tixt: {
        fontSize: 16,
        color: "white",
        fontFamily: "MonumentExtended-Regular",
    },
    signintext: {
        marginTop: 10,
        fontSize: 14,
        color: "black",
        fontFamily: "MonumentExtended-Regular",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textDecorationLine: "underline",
        fontFamily: "MonumentExtended-Ultrabold",
    },
    text1: {
        fontSize: 12,
        color: "white",
        fontFamily: "Raleway_500Medium",
    },
    button2: {
        marginLeft: 20,
        marginRight: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        width: 170,
        height: 41,
        right: 14.5,
        top: 30,

        backgroundColor: "transparent",
        borderRadius: 2,
    },
    button1: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        width: 170,
        height: 41,
        left: 14.5,
        top: 40,

        backgroundColor: "transparent",
        borderRadius: 2,
    },
    fbButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: 41,

        backgroundColor: "#4267B2",
        borderRadius: 2,
    },
    googleButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        top: 20,
        width: "90%",
        height: 41,
        backgroundColor: "white",
        borderRadius: 2,
    },
    signinButton: {
        marginLeft: 15,
        marginRight: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        width: 365,
        height: 41,
        left: 10,
        top: 600,

        backgroundColor: "#F2C400",
        borderRadius: 2,
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backcontainer: {
        height: 30,
        width: 30,
    },
    logocontainer: {
        height: 60,
        width: 118,
    },
    scrollcontainer: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: "#121212",
    },

    image: {
        flex: 1,
        justifyContent: "center",
    },
});

export default Signin;
