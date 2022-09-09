export const initialState = {
  categoryStores: [
    {
      description: "Hello",
    },
  ],
  products: "",
  fname: "",
  customerid: "",
  alert: "",
  token: "",
  zip: [],
  store: "",
  product: "",
  storeAddress: "",
  storeid: "",
  cart: [],
  starttime: "",
  endtime: "",
  fulfilmentType: "",
  fulfilmentDate: "",
  fixTime: "",
  ordritms: [],
  cartid: "",
  postcode: "",
  locationState: false,
  lname: "",
  email: "",
  updatedaddress: "",
  clientSecret: "",
  ephemeralKey: "",
  stripecustomerid: "",
  lists: [],
  eachzip: [],
  city: "",
  totalprice: 0,
  timelist: [],
  account: false,
  orders: [],
  rewards: [],
  customerapikey: "",
  ordertotalprice: 0,
  orderitems: [],
  orderaddress: {},
  ordertime: "",
  overallprice: 0,
  discount: 0,
  saveorder: [],
  filthyRewardsCoins: 0,
  tab: "",
  screen: "",
  editTime: false,
  filthyRewards: 0,
  nomore: false,
  transid: "",
  ordercartid: "",
  storeSlug: "",
  productSlug: "",
  productModifiers: [],
  finalProduct: [],
  addBaskets: false,
  totalproductPrice: 0,
  prize: 0,
  priz: 0,
  categoryArrangements: {},
  phoneno: ''
};
export const actionTypes = {
  SET_CATEGORYSTORES: "SET_CATEGORYSTORES",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_FNAME: "SET_FNAME",
  SET_CUSTOMERID: "SET_CUSTOMERID",
  SET_ALERT: "SET_ALERT",
  SET_TOKEN: "SET_TOKEN",
  SET_ZIP: "SET_ZIP",
  SET_STORE: "SET_STORE",
  SET_PRODUCT: "SET_PRODUCT",
  SET_STOREADDRESS: "SET_STOREADDRESS",
  SET_STOREID: "SET_STOREID",
  SET_CART: "SET_CART",
  SET_STARTTIME: "SET_STARTTIME",
  SET_ENDTIME: "SET_ENDTIME",
  SET_FULFILMENTTYPE: "SET_FULFILMENTTYPE",
  SET_FULFILMENTDATE: "SET_FULFILMENTDATE",
  SET_FIXTIME: "SET_FIXTIME",
  SET_ORDRITMS: "SET_ORDRITMS",
  SET_CARTID: "SET_CARTID",
  SET_POSTCODE: "SET_POSTCODE",
  SET_LOCATIONSTATE: "SET_LOCATIONSTATE",
  SET_LNAME: "SET_LNAME",
  SET_EMAIL: "SET_EMAIL",
  SET_UPDATEDADDRESS: "SET_UPDATEDADDRESS",
  SET_CLIENTSECRET: "SET_CLIENTSECRET",
  SET_EPHEMERALKEY: "SET_EPHEMERALKEY",
  SET_STRIPECUSTOMERID: "SET_STRIPECUSTOMERID",
  SET_LISTS: "SET_LISTS",
  SET_EACHZIP: "SET_EACHZIP",
  SET_CITY: "SET_CITY",
  SET_TOTALPRICE: "SET_TOTALPRICE",
  SET_TIMELIST: "SET_TIMELIST",
  SET_ACCOUNT: "SET_ACCOUNT",
  SET_ORDERS: "SET_ORDERS",
  SET_REWARDS: "SET_REWARDS",
  SET_CUSTOMERAPIKEY: "SET_CUSTOMERAPIKEY",
  SET_ORDERTOTALPRICE: "SET_ORDERTOTALPRICE",
  SET_ORDERITEMS: "SET_ORDERITEMS",
  SET_ORDERADDRESS: "SET_ORDERADDRESS",
  SET_ORDERTIME: "SET_ORDERTIME",
  SET_OVERALLPRICE: "SET_OVERALLPRICE",
  SET_DISCOUNT: "SET_DISCOUNT",
  SET_FILTHYREWARDSCOINS: "SET_FILTHYREWARDSCOINS",
  SET_SAVEORDER: "SET_SAVEORDER",
  SET_SCREEN: "SET_SCREEN",
  SET_TAB: "SET_TAB",
  SET_EDITTIME: "SET_EDITTIME",
  SET_FILTHYREWARDS: "SET_FILTHYREWARDS",
  SET_NOMORE: "SET_NOMORE",
  SET_TRANSID: "SET_TRANSID",
  SET_ORDERCARTID: "SET_ORDERCARTID",
  SET_STORESLUG: "SET_STORESLUG",
  SET_PRODUCTSLUG: "SET_PRODUCTSLUG",
  SET_PRODUCTMODIFIERS: "SET_PRODUCTMODIFIERS",
  SET_FINALPRODUCT: "SET_FINALPRODUCT",
  SET_ADDBASKET: "SET_ADDBASKET",
  SET_TOTALPRODUCTPRICE: "SET_TOTALPRODUCTPRICE",
  SET_PRIZE: "SET_PRIZE",
  SET_PRIZ: "SET_PRIZ",
  SET_CATEGORYARRANGEMENTS: "SET_CATEGORYARRANGEMENTS",
  SET_PHONENO: "SET_PHONENO",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORYSTORES:
      return {
        ...state,
        categoryStores: action.categoryStores,
      };
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case actionTypes.SET_FNAME:
      return {
        ...state,
        fname: action.fname,
      };
    case actionTypes.SET_CUSTOMERID:
      return {
        ...state,
        customerid: action.customerid,
      };
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.SET_ZIP:
      return {
        ...state,
        zip: action.zip,
      };
    case actionTypes.SET_STORE:
      return {
        ...state,
        store: action.store,
      };
    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };

    case actionTypes.SET_STOREADDRESS:
      return {
        ...state,
        storeAddress: action.storeAddress,
      };
    case actionTypes.SET_STOREID:
      return {
        ...state,
        storeid: action.storeid,
      };
    case actionTypes.SET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case actionTypes.SET_STARTTIME:
      return {
        ...state,
        starttime: action.starttime,
      };
    case actionTypes.SET_ENDTIME:
      return {
        ...state,
        endtime: action.endtime,
      };
    case actionTypes.SET_FULFILMENTTYPE:
      return {
        ...state,
        fulfilmentType: action.fulfilmentType,
      };
    case actionTypes.SET_FULFILMENTDATE:
      return {
        ...state,
        fulfilmentDate: action.fulfilmentDate,
      };
    case actionTypes.SET_FIXTIME:
      return {
        ...state,
        fixTime: action.fixTime,
      };
    case actionTypes.SET_ORDRITMS:
      return {
        ...state,
        ordritms: action.ordritms,
      };
    case actionTypes.SET_CARTID:
      return {
        ...state,
        cartid: action.cartid,
      };
    case actionTypes.SET_POSTCODE:
      return {
        ...state,
        postcode: action.postcode,
      };
    case actionTypes.SET_LOCATIONSTATE:
      return {
        ...state,
        locationState: action.locationState,
      };
    case actionTypes.SET_LNAME:
      return {
        ...state,
        lname: action.lname,
      };
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case actionTypes.SET_UPDATEDADDRESS:
      return {
        ...state,
        updatedaddress: action.updatedaddress,
      };
    case actionTypes.SET_CLIENTSECRET:
      return {
        ...state,
        clientSecret: action.clientSecret,
      };
    case actionTypes.SET_EPHEMERALKEY:
      return {
        ...state,
        ephemeralKey: action.ephemeralKey,
      };
    case actionTypes.SET_STRIPECUSTOMERID:
      return {
        ...state,
        stripecustomerid: action.stripecustomerid,
      };
    case actionTypes.SET_LISTS:
      return {
        ...state,
        lists: action.lists,
      };
    case actionTypes.SET_EACHZIP:
      return {
        ...state,
        eachzip: action.eachzip,
      };
    case actionTypes.SET_CITY:
      return {
        ...state,
        city: action.city,
      };
    case actionTypes.SET_TOTALPRICE:
      return {
        ...state,
        totalprice: action.totalprice,
      };
    case actionTypes.SET_TIMELIST:
      return {
        ...state,
        timelist: action.timelist,
      };
    case actionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case actionTypes.SET_REWARDS:
      return {
        ...state,
        rewards: action.rewards,
      };
    case actionTypes.SET_CUSTOMERAPIKEY:
      return {
        ...state,
        customerapikey: action.customerapikey,
      };
    case actionTypes.SET_ORDERTOTALPRICE:
      return {
        ...state,
        ordertotalprice: action.ordertotalprice,
      };
    case actionTypes.SET_ORDERITEMS:
      return {
        ...state,
        orderitems: action.orderitems,
      };
    case actionTypes.SET_ORDERADDRESS:
      return {
        ...state,
        orderaddress: action.orderaddress,
      };
    case actionTypes.SET_ORDERTIME:
      return {
        ...state,
        ordertime: action.ordertime,
      };
    case actionTypes.SET_DISCOUNT:
      return {
        ...state,
        discount: action.discount,
      };
    case actionTypes.SET_OVERALLPRICE:
      return {
        ...state,
        overallprice: action.overallprice,
      };
    case actionTypes.SET_SAVEORDER:
      return {
        ...state,
        saveorder: action.saveorder,
      };
    case actionTypes.SET_FILTHYREWARDSCOINS:
      return {
        ...state,
        filthyRewardsCoins: action.filthyRewardsCoins,
      };
    case actionTypes.SET_SCREEN:
      return {
        ...state,
        screen: action.screen,
      };
    case actionTypes.SET_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    case actionTypes.SET_EDITTIME:
      return {
        ...state,
        editTime: action.editTime,
      };
    case actionTypes.SET_FILTHYREWARDS:
      return {
        ...state,
        filthyRewards: action.filthyRewards,
      };
    case actionTypes.SET_NOMORE:
      return {
        ...state,
        nomore: action.nomore,
      };
    case actionTypes.SET_TRANSID:
      return {
        ...state,
        transid: action.transid,
      };
    case actionTypes.SET_ORDERCARTID:
      return {
        ...state,
        ordercartid: action.ordercartid,
      };
    case actionTypes.SET_STORESLUG:
      return {
        ...state,
        storeSlug: action.storeSlug,
      };
    case actionTypes.SET_PRODUCTSLUG:
      return {
        ...state,
        productSlug: action.productSlug,
      };
    case actionTypes.SET_PRODUCTMODIFIERS:
      return {
        ...state,
        productModifiers: action.productModifiers,
      };
    case actionTypes.SET_FINALPRODUCT:
      return {
        ...state,
        finalProduct: action.finalProduct,
      };
    case actionTypes.SET_ADDBASKET:
      return {
        ...state,
        addBaskets: action.addBaskets,
      };
    case actionTypes.SET_TOTALPRODUCTPRICE:
      return {
        ...state,
        totalproductPrice: action.totalproductPrice,
      };
    case actionTypes.SET_PRIZE:
      return {
        ...state,
        prize: action.prize,
      };
    case actionTypes.SET_PRIZ:
      return {
        ...state,
        priz: action.priz,
      };
    case actionTypes.SET_CATEGORYARRANGEMENTS:
      return {
        ...state,
        categoryArrangements: action.categoryArrangements,
      };
    case actionTypes.SET_PHONENO:
      return {
        ...state,
        phoneno: action.phoneno,
      };
    default:
      return state;
  }
};
export default reducer;
