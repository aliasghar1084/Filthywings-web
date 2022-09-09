import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, ImageBackground, TextInput
    , SafeAreaView, ScrollView
} from 'react-native';
import ImgViewer from 'react-native-image-viewer-web';
import React from 'react';

const D_l_s = () => {
    return (
        <SafeAreaView style={styles.scrollcontainer}>
            <ScrollView style={styles.scrollView}>



                <View style={styles.container}>
                    <ImageBackground
                        source={require('../assets/Dripping.png')}
                        resizeMode="cover" style={styles.image}>

                        <View style={styles.logocontainer}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/trans.png')}
                            />

                        </View>
                        <Text style={styles.text2}>
                            FILTHY DELIVERY
                        </Text>



                        <View style={{
                            backgroundColor: 'transparent', marginLeft: 20, height: 51,
                            marginRight: 25,
                        }}>
                            <Text style={styles.baseText}>
                                Enter your Postcode
                            </Text>
                            <TextInput style={{
                                backgroundColor: 'white', width: 370, height: 51, marginLeft: 1,
                                marginRight: 25,
                                borderRadius: 2, paddingLeft: 20, paddingRight: 25
                            }} value={''} />
                        </View>

                        <View style={styles.or}>
                            <ImgViewer imgs={[

                                require('../assets/div.png')
                            ]

                            }
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.95} style={styles.button3}>
                            <Text style={styles.text}>
                                USE MY LOCATION
                            </Text>
                        </TouchableOpacity>


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
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 361,
        height: 41,
        left: 74.5,
        top: 300,
        borderRadius: 2
    },
    text1: {
        fontFamily: "MonumentExtended-Regular",
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        position: 'absolute',
        width: 361,
        height: 41,
        left: 74.5,
        top: 330,
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
        width: 361,
        height: 41,
        left: 14.5,
        top: 417.42,

        backgroundColor: 'white',
        borderRadius: 2
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
        width: 361,
        height: 41,
        left: 14.5,
        top: 485.42,

        backgroundColor: 'white',
        borderRadius: 2
    },
    button3: {
        marginLeft: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

        position: 'absolute',
        width: 370,
        height: 51,
        top: 553.42,

        backgroundColor: 'white',
        borderRadius: 2
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    pos: {
        marginTop: 100
    },
    logocontainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 110,
        position: 'absolute',
        top: 35,
        height: 115,
        width: 201,
        marginTop: 80
    },
    scrollcontainer: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        height: 865
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    baseText: {
        color: 'white',
        fontWeight: 'bold'
    },
    or: {

        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginRight: 20,
        position: 'absolute',
        top: 430,
        height: 3,
        width: 355,
        marginTop: 80
    },

});


export default D_l_s;