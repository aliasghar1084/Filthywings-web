import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, TextInput
    , SafeAreaView, ScrollView
} from 'react-native';
import ImgViewer from 'react-native-image-viewer-web';
import React from 'react';



const Signup = () => {
    return (
        <SafeAreaView style={styles.scrollcontainer}>
            <ScrollView style={styles.scrollView}>

                <View style={styles.container}>

                    <View style={styles.logocontainer}>
                        <ImgViewer imgs={[

                            require('../assets/Logo-White.jpg')
                        ]

                        }
                        />

                    </View>
                    <View style={styles.backcontainer}>
                        <ImgViewer imgs={[

                            require('../assets/back-button.png')
                        ]

                        }
                        />
                    </View>
                    <View style={styles.fixToText}>
                        <TouchableOpacity
                            activeOpacity={0.95} style={styles.button1}>
                            <Text style={styles.text}>
                                SIGN IN
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.95} style={styles.button2}>
                            <Text style={styles.text}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{
                        backgroundColor: 'transparent', marginLeft: 20, height: 51, top: 270,
                        marginRight: 25,
                        borderColor: 'black'
                    }}>
                        <Text style={styles.baseText}>
                            Email
                        </Text>
                        <TextInput style={{
                            backgroundColor: '#828282', width: 370, height: 51, marginLeft: 1,
                            marginRight: 25,
                            borderColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 2, borderWidth: 2, paddingLeft: 20, paddingRight: 25
                        }} value={''} />
                        <Text style={styles.innerText}>
                            Password
                        </Text>
                        <TextInput style={{
                            backgroundColor: '#828282', width: 370, height: 51, marginLeft: 1,
                            marginRight: 25, top: 10,
                            borderColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 2, borderWidth: 2, paddingLeft: 20, paddingRight: 25
                        }} value={''} />
                        <Text style={styles.forgotText}>
                            FORGOT PASSWORD?
                        </Text>


                        <Text style={styles.baseText}>
                            Email
                        </Text>
                        <TextInput style={{
                            backgroundColor: '#828282', width: 370, height: 51, marginLeft: 1,
                            marginRight: 25,
                            borderColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 2, borderWidth: 2, paddingLeft: 20, paddingRight: 25
                        }} value={''} />
                        <Text style={styles.innerText}>
                            Password
                        </Text>
                        <TextInput style={{
                            backgroundColor: '#828282', width: 370, height: 51, marginLeft: 1,
                            marginRight: 25, top: 10,
                            borderColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 2, borderWidth: 2, paddingLeft: 20, paddingRight: 25
                        }} value={''} />

                    </View>
                    <TouchableOpacity
                        activeOpacity={0.95} style={styles.signinButton} onPress={() => { }}>
                        <Text style={styles.signintext}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.or}>
                        <ImgViewer imgs={[

                            require('../assets/divider.png')
                        ]

                        }
                        />
                    </View>
                    <View style={styles.checkout}>
                        <ImgViewer imgs={[

                            require('../assets/ride.png')
                        ]

                        }
                        />
                    </View>
                    <View style={styles.line}>
                        <ImgViewer imgs={[

                            require('../assets/Vector.png')
                        ]

                        }
                        />
                    </View>



                    <TouchableOpacity
                        activeOpacity={0.95} style={styles.googleButton} onPress={() => { }}>
                        <Image style={{ height: 23, width: 23 }} source={require("../assets/google-icon.png")} />
                        <Text style={styles.signintext}>  Continue with Google
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.95} style={styles.fbButton} onPress={() => { }}>
                        <Image style={{ height: 41, width: 365 }} source={require("../assets/fb.png")} />
                    </TouchableOpacity>



                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    line: {

        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100,
        marginRight: 20,
        position: 'absolute',
        top: 725,
        height: 5,
        width: 200,
        marginTop: 80
    },
    checkout: {

        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100,
        marginRight: 20,
        position: 'absolute',
        top: 615,
        height: 5,
        width: 200,
        marginTop: 80
    },
    or: {

        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginRight: 20,
        position: 'absolute',
        top: 570,
        height: 35,
        width: 355,
        marginTop: 80
    },
    forgotText: {
        top: 10,
        color: 'white',
        marginLeft: 210
    },
    baseText: {
        color: 'white',
        fontWeight: 'bold'
    },
    innerText: {
        top: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    signintext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    button2: {
        marginLeft: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

        position: 'absolute',
        width: 170,
        height: 41,
        right: 14.5,

        backgroundColor: 'transparent',
        borderRadius: 2
    },
    button1: {
        marginLeft: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

        position: 'absolute',
        width: 170,
        height: 41,
        left: 14.5,

        backgroundColor: 'transparent',
        borderRadius: 2
    },
    fbButton: {
        marginLeft: 15,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

        position: 'absolute',
        width: 365,
        height: 41,
        left: 10,
        top: 790,

        backgroundColor: '#4267B2',
        borderRadius: 2
    },
    googleButton: {
        marginLeft: 15,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

        position: 'absolute',
        width: 365,
        height: 41,
        left: 10,
        top: 730,

        backgroundColor: 'white',
        borderRadius: 2
    },
    signinButton: {
        marginLeft: 15,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

        position: 'absolute',
        width: 365,
        height: 41,
        left: 10,
        top: 600,

        backgroundColor: '#F2C400',
        borderRadius: 2
    },
    fixToText: {
        top: 230,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backcontainer: {
        marginLeft: 20,
        position: 'absolute',
        height: 30,
        width: 30,
        marginTop: 50
    },
    logocontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 110,
        position: 'absolute',
        top: 20,
        height: 115,
        width: 201,
        marginTop: 80
    },
    scrollcontainer: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#121212',
    },
    container: {
        flex: 1,
        height: 865
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },

});

export default Signup;