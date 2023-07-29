import {
    Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Modal,
    FlatList,Alert,Dimensions
} from 'react-native';
import { SafeArea } from '../utility/safearea';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faMagnifyingGlass,faGear,faTimes,faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Tokens } from './Tokens';
import { Menu } from './Menu';





export function Swap({ navigation }) {
    const [modalVisibility, setmodalVisibility] = useState(false);
    const [modalVisibility2, setmodalVisibility2] = useState(false);
    const [modalOpen, setmodalOpen] = useState(false);
    const [allCoin, setAllCoin] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState({ img: "", symbol: "", name: "" });
    const [selectedCoin2, setSelectedCoin2] = useState({ img: "", symbol: "", name: "" });
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [onSwap, setOnSwap] = useState(true);
    const [onSettings, setOnSettings] = useState(false);
    

    function visibility() {
        setmodalVisibility(!modalVisibility)
    }
    function visibility2() {
        setmodalVisibility2(!modalVisibility2)
    }
    function HandleSwap() {
        setOnSwap(!onSwap)
    }
    function HandleSettings() {
        Alert.alert(
            'Setttings',
            `Your settings are currently automated.`,
            [{text:'Okay'}]
        );
        setOnSettings(!onSettings)
    }

    const getCoinList = async () => {
        const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false";
        try {
            const response = await fetch(url);
            const coindata = await response.json();
            setAllCoin(coindata)
            setFilteredCoins(coindata)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCoinList();
    }, []);

    const HandleSubmit = (input) => {
        const exData = [...allCoin];
        const newData = exData.filter(ecion => {
            return ecion.id.includes(input.toLowerCase()) || ecion.symbol.includes(input.toLowerCase())
        })
        setFilteredCoins(newData)
    }
   

    return (
        <SafeArea>
            <View style={{ flex: 1, backgroundColor: "#fff0f5" }}>
                <View style={styles.contanier}>
                     <TouchableOpacity>
                    <Image source={require('../assets/ttt4.png')} style={{height:32,width:32,}}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setmodalOpen(true)}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require('../assets/eth.png')} style={{ height: 20, width: 20, marginRight: 5, margin: 5, borderRadius: 10 }} />
                            <FontAwesomeIcon icon={faAngleDown} size={17} style={{ margin: 5, color: "gray" }} />
                        </View>
                    </TouchableOpacity>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={22} style={{ margin: 5, color: "gray" }} />
                    <TouchableOpacity onPress={() => setmodalOpen(true)}>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#fad4ea",
                            justifyContent: "center", borderRadius: 25, padding: 8,
                        }}>
                            <Text style={{ fontSize: 16, marginRight: 9, color: "#F60415" }}>Connect</Text>
                            <View style={{ borderWidth: 0.3, height: 20, marginRight: 7, borderColor: "#F60415" }}></View>
                            <FontAwesomeIcon icon={faAngleDown} size={17} style={{ marginRight: 15, color: "#F60415" }} />
                        </View>
                    </TouchableOpacity>


                </View>

                <View style={styles.center}>
                    <View style={styles.swapIcon}>
                        <Text style={{ color: '#8b8c8c', fontWeight:"700",fontSize:15 }}>Swap</Text>
                        <Pressable onPress={() => HandleSettings(true)}>
                        <FontAwesomeIcon icon={faGear} size={20} style={{ color: '#8b8c8c' }} />
                        </Pressable>
                    </View>
                    <View style={styles.contanier2}>
                        {onSwap ?
                            <View style={styles.swapBox}>
                                <TextInput placeholder='0' style={styles.input} keyboardType="phone-pad" cursorColor={'gray'} />
                                <TouchableOpacity onPress={visibility} style={styles.selectCoin}>
                                    {selectedCoin.img == "" ?
                                        <Image source={require('../assets/eth.png')} style={styles.EthLogo} />
                                        :
                                        <Image source={{ uri: selectedCoin.img }} style={styles.EthLogo} />
                                    }
                                    <Text style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 3, textTransform: "uppercase" }}>{selectedCoin.symbol == "" ? "ETH" : selectedCoin.symbol}</Text>
                                    <FontAwesomeIcon icon={faAngleDown} size={15} color="gray" style={{ marginHorizontal: 5 }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.swapBox2}>
                                <View style={{ width: "44%" }}>
                                    <TextInput placeholder='0' style={styles.input} keyboardType="phone-pad" cursorColor={'gray'} />
                                </View>
                                <TouchableOpacity onPress={visibility2}>
                                    <View style={styles.selectCoin}>
                                        {selectedCoin2.img != "" ?
                                            <Image source={{ uri: selectedCoin2.img }} style={styles.EthLogo} />
                                            : null
                                        }
                                        <Text style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 5, color: "#08090a", textTransform: "uppercase" }}>
                                            {selectedCoin2.symbol == "" ? "Select token" : selectedCoin2.symbol}
                                        </Text>
                                        <FontAwesomeIcon icon={faAngleDown} size={15} color="gray" style={{ marginHorizontal: 5 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }


                        <TouchableOpacity onPress={() => HandleSwap()} style={styles.swapBTN}>
                            <View style={{ backgroundColor: "#ebeefa",padding:8, borderRadius:5 }}>
                                <FontAwesomeIcon icon={faArrowDown} size={15} color="gray" />
                            </View>
                        </TouchableOpacity>

                        {onSwap ?
                            <View style={styles.swapBox2}>
                                <View style={{ width: "44%" }}>
                                    <TextInput placeholder='0' style={styles.input} keyboardType="phone-pad" cursorColor={'gray'} />
                                </View>
                                <TouchableOpacity onPress={visibility2}>
                                    <View style={styles.selectCoin}>
                                        {selectedCoin2.img != "" ?
                                            <Image source={{ uri: selectedCoin2.img }} style={styles.EthLogo} />
                                            : null
                                        }
                                        <Text style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 5, color: "red",textTransform: "uppercase" }}>
                                            {selectedCoin2.symbol == "" ? "Select token" : selectedCoin2.symbol}
                                        </Text>
                                        <FontAwesomeIcon icon={faAngleDown} size={15} color="red" style={{ marginHorizontal: 5 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.swapBox}>
                                <TextInput placeholder='0' style={styles.input} keyboardType="phone-pad" cursorColor={'gray'} />
                                <TouchableOpacity onPress={visibility} style={styles.selectCoin}>
                                    {selectedCoin.img == "" ?
                                        <Image source={require('../assets/eth.png')} style={styles.EthLogo} />
                                        :
                                        <Image source={{ uri: selectedCoin.img }} style={styles.EthLogo} />
                                    }
                                    <Text style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 3, textTransform: "uppercase" }}>{selectedCoin.symbol == "" ? "ETH" : selectedCoin.symbol}</Text>
                                    <FontAwesomeIcon icon={faAngleDown} size={15} color="gray" style={{ marginHorizontal: 5 }} />
                                </TouchableOpacity>
                            </View>
                        }

                        <TouchableOpacity onPress={() => setmodalOpen(true)}>
                            <View style={styles.swap3}>
                                <Text style={{ color: "#f72f28", fontSize: 21, fontWeight: '600' }}>Connect Wallet</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal animationType='fade'
                        visible={modalOpen}
                        transparent={true}>
                        <View style={styles.modalView}>
                            <Pressable
                                onPress={() => setmodalOpen(false)}
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                }}
                            >
                            </Pressable>
                            <View style={styles.modercontent2}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center',
                                }}>
                                    <Text style={{ color: '#0d000c', fontSize: 16, fontWeight: 'bold' }}>Connect a wallet</Text>
                                    <TouchableOpacity onPress={() => setmodalOpen(false)}>
                                        <FontAwesomeIcon icon={faTimes} size={25} color="#0d000c" style={styles.times} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    setmodalOpen(false)
                                    navigation.navigate('WalletConet')
                                }}>
                                    <View style={styles.SetWallet}>
                                        <View style={styles.SetWalletLogo}>
                                            <Image source={require('../assets/cont2.png')} style={{ height: 30, width: 30 }} />
                                            <Text style={{ marginLeft: 10, fontSize: 16,fontWeight:"600" }}>Open in coinbase wallet</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setmodalOpen(false)
                                    navigation.navigate('WalletConet')
                                }}>
                                    <View style={styles.SetWallet2}>
                                        <View style={styles.SetWalletLogo2}>
                                            <Image source={require('../assets/cont3.png')} style={{ height: 30, width: 30,borderRadius:50 }} />
                                            <Text style={{ marginLeft: 10,fontSize: 16,fontWeight:"600" }}>WalletConnect</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{padding:10}}>
                                    <Text>By connecting a wallet, you agree to Uniswap Lab's</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                                        <Text style={{ color: 'red', fontSize: 15, fontWeight: '400' }}>Terms of Service</Text>
                                    </TouchableOpacity>
                                    <Text> and consent to its</Text>
                                    
                                    <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                                        <Text style={{ color: 'red', fontSize: 15, fontWeight: '400' }}>Privacy Policy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* ================ First Modal Start ================ */}
                <Modal
                    animationType='fade'
                    visible={modalVisibility}
                    transparent={true}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0, 0.4)"
                        }}
                    >
                        <Pressable
                            onPress={visibility}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                            }}

                        >
                        </Pressable>
                        <View style={styles.modercontent}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Select a token</Text>
                                <TouchableOpacity onPress={visibility}>
                                    <FontAwesomeIcon icon={faTimes} size={22} color="gray" style={styles.times} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchIcon}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size={18}
                                    style={{ color: 'gray', marginLeft: 10 }}
                                />

                                <View style={{ marginLeft: 15 }}>
                                    <TextInput
                                        placeholder='Search name'
                                        onChangeText={(text) => HandleSubmit(text)}
                                    />
                                </View>

                            </View>
                            <View style={{
                                borderTopColor: "gray",
                                borderTopWidth: 1,
                                marginTop: 10,
                                paddingTop: 10
                            }}>
                                {/*  ========================= 1 ===================== */}
                                <FlatList
                                    initialNumToRender={30}
                                    data={filteredCoins}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setmodalVisibility(false)
                                                    setSelectedCoin({
                                                        img: item.image,
                                                        name: item.name,
                                                        symbol: item.symbol
                                                    })
                                                }}
                                                style={{ flexDirection: "row", marginBottom: 20 }}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.coinImg}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                                    <Text style={{ fontSize: 10, color: 'gray', textTransform: "uppercase" }}>{item.symbol}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    key={({ item }) => item.id}
                                    
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* ================ First Modal End ================ */}
                {/* ================ First Modal Start ================ */}
                <Modal
                    animationType='fade'
                    visible={modalVisibility2}
                    transparent={true}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0, 0.4)"
                        }}
                    >
                        <Pressable
                            onPress={visibility2}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                            }}

                        >
                        </Pressable>
                        <View style={styles.modercontent}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Select a token</Text>
                                <TouchableOpacity onPress={visibility2}>
                                    <FontAwesomeIcon icon={faTimes} size={22} color="gray" style={styles.times} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchIcon}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size={18}
                                    style={{ color: 'gray', marginLeft: 10 }}
                                />

                                <View style={{ marginLeft: 15 }}>
                                    <TextInput
                                        placeholder='Search name'
                                        onChangeText={(text) => HandleSubmit(text)}
                                    />
                                </View>

                            </View>
                            <View style={{
                                borderTopColor: "gray",
                                borderTopWidth: 1,
                                marginTop: 10,
                                paddingTop: 10
                            }}>
                                {/*  ========================= 1 ===================== */}
                                <FlatList
                                    initialNumToRender={30}
                                    data={filteredCoins}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setmodalVisibility2(false)
                                                    setSelectedCoin2({
                                                        img: item.image,
                                                        name: item.name,
                                                        symbol: item.symbol
                                                    })
                                                }}
                                                style={{ flexDirection: "row", marginBottom: 20 }}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.coinImg}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                                    <Text style={{ fontSize: 10, color: 'gray', textTransform: "uppercase" }}>{item.symbol}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    key={({ item }) => item.id}
                                
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* ================ First Modal End ================ */}

            </View>
        </SafeArea>
    )
    

}

const Tab = createBottomTabNavigator();

export function Home() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Swap') {
                        iconName = focused
                        ? 'swap-vertical'
                            : 'swap-vertical-outline';
                    } else if (route.name === 'Tokens') {
                        iconName = focused ? 'cube' : 'cube-outline';
                    
                    
                    }else if (route.name === 'Menu') {
                    iconName = focused ? 'reorder-three' : 'reorder-three-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: color = 'gray',
                tabBarInactiveTintColor: color = 'gray',
            })}
        >
           <Tab.Screen name="Swap" component={Swap} options={{ headerShown: false }} />
            <Tab.Screen name="Tokens" component={Tokens} options={{ headerShown: false }} />
            
            
            <Tab.Screen name="Menu" component={Menu} options={{ headerShown: false }} />

        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    contanier: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between"
    },
    logo: {
        height: 32,
        width: 32,
    },
    EthLogo: {
        height: 20,
        width: 20,
        borderRadius: 50
    },
    connectView: {
        flexDirection: 'row',
        left: 25,
        backgroundColor: '#FEB4DD',
        width: 125,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    connectText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F60415'
    },
    line: {
        borderWidth: 0.5,
        height: 25,
        marginLeft: 10,
        borderColor: '#F60415'
    },
    center: {
        position: "relative",
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        borderColor: '#C6C2C4',
        borderWidth: 1,
        marginHorizontal: 8,
    },
    contanier2: {
        margin: 7,
        marginTop: 0,
    },
    swapIcon: {
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'space-between',

    },
    swapBox: {
        backgroundColor: '#ebeefa',
        borderRadius: 12,
        marginBottom: 3,
        padding: 22,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    swapBox2: {
        backgroundColor: '#ebeefa',
        borderRadius: 12,
        marginBottom: 3,
        padding: 22,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    swapBTN: {
        position: "absolute",
        top: 69,
        marginVertical: "auto",
        zIndex: 11,
        backgroundColor: "white",
        padding: 3,
        borderRadius: 7,
        right: Number(Dimensions.get("screen").width) / 2 - 30
    },
    selectCoin: {
        flexDirection: "row",
        backgroundColor: "rgba(128,128,128,0.15)",
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
        height: 30
    },
    selectCoin2: {
        flexDirection: "row",
        backgroundColor: "#F60415",
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
        height: 30
    },
    swap3: {
        height: 60,
        backgroundColor: '#fad4ea',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: "67%",
        fontSize: 35,
        margin: 0
    },
    modercontent: {
        height: "80%",
        backgroundColor: "white",
        padding: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    coinImg: {
        width: 30,
        height: 30,
        borderRadius: 60
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.6)",
    },
    modercontent2: {
        height: '40%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        paddingTop: 15,
        backgroundColor: 'white'
    },
    times: {
        //marginLeft: "auto"
    },
    SetWallet: {
        backgroundColor: '#e9eef7',
        height: 55,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 2
    },
    SetWallet2: {
        backgroundColor: '#e9eef7',
        height: 55,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 2
    },
    SetWalletLogo: {
        margin: 10,
        flexDirection: 'row',
        alignContent: 'center',
        //justifyContent:'space-evenly'
    },
    SetWalletLogo2: {
        margin: 10,
        flexDirection: 'row',
        alignContent: 'center',
        //justifyContent:'space-evenly'
    },
    searchIcon: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 3,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#f0eeeb',
        borderColor: '#b0b0b0',
        marginBottom: 5,
        marginTop: 15

    }


})