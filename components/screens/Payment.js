import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/EvilIcons";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import color from "../../contains/color";

import Product_pay from "../task/product_pay";
import { db, ref, set, child, get, onValue, update } from "../DAL/Database";
import { User, Carts } from "../screens/Login";
//import { CartProduct } from '../screens/Home';

export default function Payment({ route }) {
  const navigation = useNavigation();

  const [CashCheck, setCashCheck] = useState(true);
  const [MomoCheck, setMomoCheck] = useState(false);
  const [CreditCheck, setCreditCheck] = useState(false);

  const [Discount, setDiscount] = useState([
    {
      ID: "",
      Type: "",
      expirationDate: "",
      name: "",
      ratio: "",
      state: "",
      user_ID: "",
    },
    {
      ID: "",
      Type: "",
      expirationDate: "",
      name: "",
      ratio: "",
      state: "",
      user_ID: "",
    },
  ]);

  const [OriginValue, setOriginValue] = useState({
    Sum: 0,
    ShipFee: 10,
  });

  const [Email, setEmail] = useState(User.email);
  const [Phone, setPhone] = useState(User.phone);

  const [Quantity, setQuantity] = useState(0);
  const [Sum, setSum] = useState(0);

  const [Total, setTotal] = useState(0);

  const [ShipFee, setShipFee] = useState(10);

  const [Address, setAddress] = useState([]);

  const [address, setaddress] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_SemiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
    Inter_Medium: require("../../assets/fonts/Inter-Medium.ttf"),
    Inter_Light: require("../../assets/fonts/Inter-Light.ttf"),
  });

  function LoadAddress() {
    starCountRef = ref(db, "Address/");

    onValue(
      starCountRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let data = childSnapshot.val();

          if (data && data.user_ID == User.ID) {
            setAddress((pre) => [...pre, data]);
            console.log(data.address);
            setaddress((pre) => [...pre, data.address]);
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  }

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    console.log(route.params.productData);
    //console.log(route.params.carts)

    let q = 0;
    let t = 0;
    route.params.productData.forEach((e) => {
      q += e.quantity;
      t += e.quantity * e.SaleOff;
    });

    LoadAddress();

    setQuantity(q);
    setSum(t.toFixed(2));
    setTotal((parseFloat(ShipFee) + parseFloat(t)).toFixed(2).toString());

    let temp = { ...OriginValue };
    temp.Sum = t.toFixed(2);

    setOriginValue(temp);
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  const renderItem = () => {
    return <Product_pay />;
  };

  function RemoveElementByID(array, id) {
    let index = 0;

    for (let i = 0; i < array.length; i++) {
      if (array.at(i).ID == id || array.at(i).product_ID == id) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      array.splice(index, 1);
    }
  }
  //// update order_ID for cart ////
  function UpdateCart(id) {
    if (route.params.carts != []) {
      route.params.carts.forEach((e) => {
        const updates = {};
        updates["/Cart/" + e.ID + "/" + "order_ID"] = id;

        RemoveElementByID(Carts, e.ID);
        update(ref(db), updates);
      });
    }
  }

  function CreateOrder(id) {
    const date = new Date();
    set(ref(db, "Order/" + id), {
      ID: id,
      user_ID: User.ID,
      order_date: date.toString(),
      order_status: "Delivering",
      order_total: Total,
    }).catch((error) => {
      console.error(error);
    });
    Create_Payment_Cache(id);
  }
  function CreatePayment(id, type) {
    const day = new Date();
    set(ref(db, "Payment/" + id), {
      ID: id,
      order_ID: id,
      card_Number: "",
      type: type,
      holder_Name: "",
      expiry_month: day.getMonth(),
      expiry_year: day.getFullYear(),
      total: Total,
    }).catch((error) => {
      console.error(error);
    });
  }

  function CreateShipping(id) {
    address_id = Address.at(0) != undefined ? Address.at(0).id : "";
    set(ref(db, "Shipping/" + id), {
      ID: id,
      address_ID: address_id,
      email: User.email,
      order_ID: id,
      phone: User.phone,
      receiver: User.first_Name + User.last_Name,
    }).catch((error) => {
      console.error(error);
    });
  }
  ////  3 step to order product           ////
  ////  firstly: Create Order             ////
  ////  secondly: Update order_ID in cart ////
  ////  finally: create payment           ////
  function Order() {
    console.log("Address");
    console.log(Address);
    if (Address != undefined) {
      const unique = (+new Date()).toString(36);

      //// Pay by cash ////
      if (CashCheck) {
        CreateOrder(unique);
        UpdateCart(unique);
        CreatePayment(unique, "Cash");
        CreateShipping(unique);

        Discount.forEach((e) => {
          UseDiscount(e.ID);
          console.log(e.ID);
        });
        //LoadCartProduct()

        alert("Pay by cash.");
      }
      //// Pay by Momo ////
      else if (MomoCheck) {
        // thanh toán momo thành công thì tạo payment
      }
      //// Pay by Credit Card ////
      else if (CreditCheck) {
        // thanh toán creditcard thành công thì tạo payment
        CreateOrder(unique);
        UpdateCart(unique);
        CreatePayment(unique, "Card");
        CreateShipping(unique);

        Discount.forEach((e) => {
          UseDiscount(e.ID);
          console.log(e.ID);
        });
        //LoadCartProduct()
        navigation.navigate("Paypal", {
          data: route.params.productData,
        });
      }
    } else {
      alert("Please, fill your address");
    }
  }

  function ChoosePaymentMethod(type) {
    setCashCheck(false);
    setCreditCheck(false);
    setMomoCheck(false);
    if (type == "Cash") setCashCheck(true);
    else if (type == "Momo") setMomoCheck(true);
    else setCreditCheck(true);
  }

  function UseDiscount(ID) {
    const updates = {};
    updates["/Discount/" + ID + "/" + "state"] = "Used";

    update(ref(db), updates);
  }
  function Create_Payment_Cache(id) {
    set(ref(db, "Payment_info/74"), {
      ID: id,
    }).catch((error) => {
      console.error(error);
    });
  }
  GetDiscountFromMyDiscount = (discount) => {
    /////// Có 3 loại discount: Product (loại này giảm giá trục tiếp vô sản phẩm)             ///////
    /////// Có 3 loại discount: Free Ship (loại này phải áp dụng mới dc)                      ///////
    /////// Có 3 loại discount: Sale Off (loại này phải áp dụng)                              ///////
    /////// Có 3 loại discount: Phần chọn discount này thì chọn dc 2 loại Free Ship, Sale Off ///////
    // console.log("use discount")
    // console.log(discount);

    var temp = [...Discount];
    if (discount != undefined) {
      temp = [...discount];
    }

    console.log("Temp: ");
    console.log(temp);

    var ship = OriginValue.ShipFee;
    var sale = OriginValue.Sum;
    if (temp != undefined) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].Type == "Free Ship") {
          ship =
            OriginValue.ShipFee - (OriginValue.ShipFee * temp[i].ratio) / 100;
        } else if (temp[i].Type == "Sale Off") {
          sale = OriginValue.Sum - (OriginValue.Sum * temp[i].ratio) / 100;
        }
      }
    }

    // console.log(ship)
    // console.log(sale)
    // console.log((ship + sale / 1).toFixed(2).toString())

    setShipFee(ship);
    setSum(sale);
    setTotal((parseFloat(ship) + parseFloat(sale)).toFixed(2).toString());
    //setShipFee(ship.toFixed(2).toString())
    //setSum(sale.toFixed(2).toString())
    //setTotal()

    setDiscount(temp);

    //console.log(temp)
  };

  UpdateAddressFromChild = (address, email, phone) => {
    console.log("Update parent from child");
    console.log(address);
    console.log(email);
    console.log(phone);
    if (address != undefined) {
      setAddress([]);
      setAddress((pre) => [...pre, address]);
      setaddress(address.address);
    }
    setEmail(email);
    setPhone(phone);
  };

  const Set = () => {
    writeUserData(Total, Email);
  };

  function onPressButton() {
    Order();
  }
  return (
    <View style={styles.container}>
      <Icon2
        name="arrow-left"
        size={35}
        color={color.white}
        marginLeft={15}
        marginTop={30}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title} marginLeft={162} marginTop={-35}>
        Payment
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flexDirection="row" marginLeft={30} marginTop={20}>
          <Icon3 name="location" size={40} color={color.white} />
          <View marginLeft={10} width={270}>
            <Text style={styles.address}>Delivery address</Text>
            <View flexDirection="row">
              <Text style={styles.user}>{Email}</Text>
              <Text style={styles.user} marginHorizontal={5}>
                |
              </Text>
              <Text style={styles.user}>{Phone}</Text>
            </View>
            <Text style={styles.user} marginTop={2}>
              {address}
            </Text>
          </View>
          <Icon3
            name="chevron-right"
            size={40}
            color={color.white}
            marginTop={20}
            marginLeft={15}
            onPress={() =>
              navigation.navigate("New_address", {
                address: Address,
                updateAddress: UpdateAddressFromChild,
              })
            }
          />
        </View>
        <View paddingHorizontal={15}>
          <View style={styles.line} />
        </View>
        <FlatList
          marginTop={22}
          marginLeft={22}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={route.params.productData}
          renderItem={({ item }) => <Product_pay data={item} />}
        ></FlatList>
        <View style={styles.pay_choose}>
          <View flexDirection="row">
            <Icon4
              name="ticket-percent-outline"
              size={30}
              color={color.white}
            />
            <Text style={styles.section} marginTop={5}>
              Discount
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("My_discount", {
                  from: "Payment",
                  getDiscount: GetDiscountFromMyDiscount,
                })
              }
            >
              <View flexDirection="row">
                <Text style={styles.dis_check}>Choose discount</Text>
                <Icon3
                  name="chevron-right"
                  size={25}
                  color={color.white}
                  marginTop={7}
                  marginLeft={5}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View flexDirection="row" marginTop={10}>
            <Icon
              name="dollar"
              size={25}
              color={color.white}
              marginLeft={8}
            ></Icon>
            <Text style={styles.section}>Payment method</Text>
          </View>
          <View marginTop={10} marginLeft={35}>
            <View flexDirection="row">
              <Checkbox
                style={styles.checkbox}
                value={CashCheck}
                onValueChange={() => ChoosePaymentMethod("Cash")}
                color={CashCheck ? color.red : undefined}
              />
              <View style={styles.avatar_view} marginTop={-5}>
                <Image
                  style={styles.image}
                  source={require("../image/ship.png")}
                />
              </View>
              <Text style={styles.section}>Cash on delivery</Text>
            </View>
            <View flexDirection="row" marginTop={10}>
              <Checkbox
                style={styles.checkbox}
                value={MomoCheck}
                onValueChange={() => ChoosePaymentMethod("Momo")}
                color={MomoCheck ? color.red : undefined}
              />
              <View style={styles.avatar_view} marginTop={-5}>
                <Image
                  style={styles.image}
                  source={require("../image/momo.png")}
                />
              </View>
              <Text style={styles.section}>Pay by Momo</Text>
            </View>
            <View flexDirection="row" marginTop={10}>
              <Checkbox
                style={styles.checkbox}
                value={CreditCheck}
                onValueChange={() => ChoosePaymentMethod("Credit")}
                color={CreditCheck ? color.red : undefined}
              />
              <View style={styles.avatar_view} marginTop={-5}>
                <Image
                  style={styles.image}
                  source={require("../image/card.png")}
                />
              </View>
              <Text style={styles.section}>Pay by credit card</Text>
            </View>
          </View>
        </View>
        <View style={styles.pay_choose} marginTop={21}>
          <View flexDirection="row">
            <View style={styles.avatar_view}>
              <Image
                style={styles.image}
                source={require("../image/invoice.png")}
              />
            </View>
            <Text style={styles.section} marginTop={5}>
              Payment details
            </Text>
          </View>
          <View flexDirection="row">
            <View>
              <Text style={styles.section} marginLeft={0} marginTop={10}>
                Shipping fee
              </Text>
              <Text style={styles.section} marginLeft={0} marginTop={10}>
                Goods price
              </Text>
              <Text style={styles.list} marginLeft={0} marginTop={10}>
                Total (Included VAT)
              </Text>
            </View>
            <View marginLeft={100}>
              <Text
                style={styles.section}
                marginLeft={0}
                marginTop={10}
                textAlign="right"
              >
                ${ShipFee}
              </Text>
              <Text
                style={styles.section}
                marginLeft={0}
                marginTop={10}
                textAlign="right"
              >
                ${Sum}
              </Text>
              <Text
                style={styles.section2}
                marginLeft={0}
                marginTop={10}
                textAlign="right"
              >
                ${Total}
              </Text>
            </View>
          </View>
        </View>
        <View flexDirection="row" marginLeft={18} marginVertical={21}>
          <View style={styles.avatar_view}>
            <Image style={styles.image} source={require("../image/note.png")} />
          </View>
          <View marginLeft={10}>
            <Text style={styles.note}>
              Clicking order means that you agree to{" "}
            </Text>
            <Text style={styles.note2}>Techconnect's regulations</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom_view}>
        <View marginLeft={200}>
          <Text style={styles.total} marginTop={10}>
            Total Prices
          </Text>
          <Text style={styles.price}>${Total}</Text>
        </View>
        <TouchableOpacity onPress={onPressButton}>
          <View style={styles.button2}>
            <Text style={styles.buttonText2}>Oder</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  title: {
    fontSize: 26,
    color: color.white,
    fontFamily: "Inter_Medium",
  },
  list: {
    fontSize: 20,
    color: color.white,
    fontFamily: "Inter_Medium",
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.grey_BE,
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
  address: {
    fontSize: 20,
    color: color.white,
    fontFamily: "Inter_Medium",
  },
  user: {
    fontSize: 15,
    color: color.white,
    fontFamily: "Inter_Light",
  },
  pay_choose: {
    width: 380,
    height: "auto",
    marginLeft: 19,
    backgroundColor: color.grey_text,
    borderRadius: 10,
    padding: 13,
  },
  section: {
    fontSize: 15,
    color: color.white,
    fontFamily: "Inter_Medium",
    marginLeft: 10,
  },
  dis_check: {
    fontSize: 12,
    color: color.white,
    fontFamily: "Inter_Light",
    marginTop: 7,
    marginLeft: 133,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderColor: color.white,
    borderRadius: 50,
    borderWidth: 2,
    marginRight: 15,
  },
  avatar_view: {
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  section2: {
    fontSize: 15,
    color: color.red,
    fontFamily: "Inter_Medium",
    marginLeft: 10,
  },
  note: {
    fontSize: 16,
    color: color.white,
    fontFamily: "Inter_Medium",
  },
  note2: {
    fontSize: 16,
    color: color.red,
    fontFamily: "Inter_Medium",
  },
  bottom_view: {
    backgroundColor: color.white,
    height: 70,
    flexDirection: "row",
  },
  total: {
    fontSize: 14,
    color: color.grey_text,
    fontFamily: "Inter_Medium",
  },
  price: {
    fontSize: 18,
    color: color.red,
    fontFamily: "Inter_Medium",
    textAlign: "right",
  },
  button2: {
    backgroundColor: color.red,
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 15,
    marginHorizontal: 15,
  },
  buttonText2: {
    fontStyle: "normal",
    fontSize: 16,
    color: "white",
    letterSpacing: 1,
    fontFamily: "Inter_SemiBold",
  },
});
