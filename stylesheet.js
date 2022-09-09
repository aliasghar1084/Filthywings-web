import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  loadload: {
    // fontFamily: "MonumentExtended-Ultrabold"
    fontSize: 32,
    fontWeight: "400",
    color: 'white',
    textAlign: 'center'
  },
  loadFilth: {
    // fontFamily: "MonumentExtended-Ultrabold"
    fontSize: 32,
    fontWeight: "400",
    color: 'white',
    textAlign: 'center',
    marginBottom: 30
  },
  imgcontainerLoading: {
    flex: 1,
    resizeMode: 'contain',
  },
  textLoading: {
    fontSize: 32,
    fontWeight: "400",
    color: 'white',

  },
  containerLoading: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  imageLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  scrollcontainerLoading: {
    flex: 1,
    height: '100%'
  },
  scrollViewLoading: {
    backgroundColor: 'black',
  },
  top: {
    marginTop: 10,
  },
  locationimg: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  verticleLine: {
    height: 60,
    width: 1,
    backgroundColor: "#909090",
    top: 1,
    left: 7,
    display: "flex",
    // justifyContent: 'flex-start', alignItems: 'flex-start',
    position: "relative",
  },
  line: {
    height: 1,
    width: 148,
    backgroundColor: "#ffffff",
    // top: 1,
    // left: 7,
    display: "flex",
    // justifyContent: 'flex-start', alignItems: 'flex-start',
    // position: 'relative'
  },
  load_screen_text: {
    fontFamily: "MonumentExtended-Ultrabold",
    fontSize: 32,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
  },
  checkbox: {
    borderColor: "#F2C400",
    borderRadius: 40,
  },
  image: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 240,
    paddingTop: 0,
    // opacity: 0.15,
    textAlign: "center",
    // backgroundSize: 'cover'
  },
  image1: {
    // flex: 1,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: "100%",
    height: 293,
    paddingTop: 0,
    // opacity: 0.15,
    // textAlign: 'center'
    // backgroundSize: 'cover'
  },
  image2: {
    height: 828,
    width: "100%",
    display: "flex",
    // padding: 12,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  text: {
    // fontFamily: 'Monument Extended',
    // fontStyle: 'normal',
    // fontWeight: '700',
    width: "80%",
    fontSize: 18,
    fontFamily: "MonumentExtended-Regular",
    // lineHeight: 15,
    /* identical to box height, or 27px */
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
    // opacity: 1.0,
    // fontFamily: 'Monument-Extended'
  },
  texte: {
    // width: 300,
    fontSize: 10,
    fontFamily: "MonumentExtended-Regular",
    // color: "#ffffff",
    // textAlign: 'auto',
    textTransform: "uppercase",
    marginRight: 10,
    marginLeft: 10,
  },
  logo: {
    // fontWeight: 'bold',
    height: 66,
    width: 114,
    marginBottom: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo1: {
    // fontWeight: 'bold',
    height: 66,
    width: 114,
    // top
    // marginBottom: 60,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  flexrow1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexrow2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerset: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoWithText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
    // position: "absolute",
    // top: 60
  },
  checkBoxesSet: {
    position: "relative",
    left: 0,
    top: 0,
    paddingLeft: 35,
    paddingTop: 50,
    color: "#ffffff"
  },
  orderInfosSet: {
    position: "relative",
    padding: 20,
    marginTop: 10,
  },
  checkboxText: {
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 12,
    marginLeft: 10,
  },
  checkBoxTextDown: {
    color: "#828282",
    marginBottom: -19,
    marginLeft: 10,
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
  },
  infoSet1: {
    borderColor: "rgba(130, 130, 130, 0.1)",
    borderWidth: 3,
    padding: 15,
    marginTop: 25,
    marginBottom: 30,
  },
  infoSet2: {
    borderColor: "rgba(130, 130, 130, 0.1)",
    borderWidth: 3,
    padding: 15,
    marginBottom: 25,
  },
  chooseText1: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "MonumentExtended-Regular",
    textTransform: "uppercase",
  },
  chooseText2: {
    fontSize: 10,
    color: "#828282",
    fontFamily: "Raleway_600SemiBold",
    marginTop: 3,
  },
  chooseImage: { width: "19%", height: 65 },
  chooseAlign: { width: "76%", display: "flex", flexDirection: "column" },
  width1: {
    width: "2%",
  },
  width2: {
    width: "3%",
  },
  infoSet3: {
    borderColor: "rgba(130, 130, 130, 0.1)",
    borderWidth: 3,
    padding: 15,
    marginBottom: 13,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  trackYourOrder: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  trackYourOrderButton: {
    fontSize: 14,
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
  },
  orderpay: {
    fontSize: 14,
    color: "#828282",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
  },
  chooseSet: {
    width: "100%",
    height: 105,
    backgroundColor: "#181818",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  payNow: {
    textAlign: "center",
    fontSize: 14,
    color: "#121212",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    backgroundColor: "#F2C400",
    padding: 10,
    width: "100 %",
  },
  chevronSet: {
    height: 15,
    width: 15,
    marginRight: 6,
  },
  payNow1: {
    textAlign: "center",
    fontSize: 14,
    color: "#121212",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    backgroundColor: "#F2C400",
    padding: 10,
    width: "100 %",
  },
  orderInfoHeader: {
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 12,
  },
  orderInfoText1: {
    color: "#828282",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
    width: 250,
  },
  orderInfoText2: {
    color: "#828282",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
  },
  aligndates: {
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // size3: { width: "5%" },
  size2: { width: "100%" },
  datesbutton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 40,
  },
  datestixt: {
    padding: 10,
    fontSize: 16,
    fontFamily: "MonumentExtended-Regular",
    color: "white",
  },
  ylinealign: {
    // marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  orderInfoText3: {
    color: "#FFFFFF",
    textTransform: "capitalize",
    fontFamily: "Raleway_700Bold",
    fontSize: 10,
  },
  orderInfoText4: {
    color: "#828282",
    textTransform: "uppercase",
    fontFamily: "Raleway_700Bold",
    fontSize: 10,
    textDecorationLine: "underline",
  },
  orderInfoText5: {
    color: "#828282",
    textTransform: "capitalize",
    fontFamily: "Raleway_500Medium",
    fontSize: 12,
    // textDecorationLine: 'underline'
  },
  orderInfoText6: {
    color: "#ffffff",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
    width: 221,
    // textDecorationLine: 'underline'
  },
  selectTime: {
    color: "#FFFFFF",
    // textTransform: 'capital',
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
    textTransform: "uppercase",
  },
  infoSet: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  gap1: {
    marginTop: 5,
  },
  gap2: {
    marginTop: 8,
  },
  gap3: { marginRight: 16 },
  gap4: { marginLeft: 16 },
  gap5: { marginBottom: 3 },
  gap6: {
    marginTop: 11,
  },
  gap7: {
    marginTop: 23,
  },
  gap8: {
    marginTop: 40,
  },
  gap9: { padding: 20 },
  gap10: { marginTop: 45 },
  gap11: { marginTop: 90 },
  gap12: { padding: 15 },
  gap13: { marginTop: 14 },
  gap14: { marginLeft: 20, marginTop: 20 },
  header: {
    fontFamily: "MonumentExtended-Ultrabold",
    fontSize: 18,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  header1: {
    fontFamily: "MonumentExtended-Ultrabold",
    fontSize: 10,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  header2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 10,
    color: "#FFFFFF",
  },
  header3: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
    color: "#828282",
  },
  insideimage: {
    fontFamily: "MonumentExtended-Ultrabold",
    alignItems: "center",
    fontSize: 10,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  inimg: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 13,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  heade: {
    fontFamily: "Raleway",
    fontSize: 10,
    color: "#FFFFFF",
    marginLeft: -20,
  },

  align: { display: "flex", alignItems: "center" },
  align1: {
    display: "flex",
    alignItems: "center",
    marginLeft: 5,
    marginBottom: 10,
  },
  align2: { display: "flex", alignItems: "center", marginLeft: -25 },
  align3: { display: "flex", alignItems: "center", marginLeft: -240 },
  inalign1: {
    display: "flex",
    alignItems: "flex-start",
    marginLeft: 5,
    marginTop: 10,
  },
  inalign2: {
    display: "flex",
    alignItems: "flex-start",
    marginLeft: 5,
    marginBottom: 10,
  },

  alert: {
    backgroundColor: "rgba(242, 196, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  postcodeinput: {
    backgroundColor: "#ffffff",
    color: "rgba(130, 130, 130, 0.4)",
    padding: 16,
  },
  inputLabel2: {
    color: "#ffffff",
    fontFamily: "Raleway_600SemiBold",
    fontSize: 12,
  },
  alertImage: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginTop: 1,
  },
  alertText: {
    color: "#F2C400",
    fontFamily: "Raleway_500Medium",
    fontSize: 10,
  },
  alertLink: {
    textDecorationLine: "underline",
    textDecorationColor: "#F2C400",
    fontFamily: "Raleway_700Bold",
    color: "#F2C400",
    fontSize: 12,
  },
  backicon: {
    height: 23,
    width: 23,
  },
  scrollView: {
    backgroundColor: '#121212'
  },
  incdec: {
    height: 20,
    width: 20,
    display: "flex",
  },
  paynowT: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 21,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
  },
  useLocation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    // marginBottom: 21,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  useLocation1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2C400",
    padding: 10,
    // marginBottom: 21,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  heading: {
    marginBottom: 10,
    marginTop: 25,
    textTransform: "uppercase",
    color: "#ffffff",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
  },
  heading1: {
    marginBottom: 25,
    textTransform: "uppercase",
    color: "#ffffff",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
  },
  heading2: {
    marginBottom: 14,
    textTransform: "uppercase",
    color: "#ffffff",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
  },
  inputLabel: {
    color: "#ffffff",
    fontFamily: "Raleway_500Medium",
    fontSize: 12,
    marginBottom: 8,
  },
  inputLabel1: {
    color: "#ffffff",
    fontFamily: "Raleway_500Medium",
    fontSize: 12,
    margin: 8,
    width: "50%",
  },
  inputText: {
    marginTop: 8,
    backgroundColor: "rgba(130, 130, 130, 0.09)",
    borderWidth: 1,
    borderColor: "rgba(155, 155, 155, 0.2)",
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    color: "#ffffff",
    padding: 16,
    width: "100%",
    marginBottom: 13,
  },
  inputsSet: { display: "flex", flexDirection: "row", width: 177 },
  inputRight: { width: "45 %" },
  inputLeft: { width: "100 %" },
  other1: {
    textDecorationLine: "underline",
  },
  setWithSpace: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  foodWithPackage: { width: 88, height: 66 },
  noOfOrders: {
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    color: "#ffffff",
  },
  blurImage: { width: "100 %", height: 610, position: "absolute", top: 200 },
});