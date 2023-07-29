import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable, FlatList, TextInput, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faArrowDown, faArrowUp, faMagnifyingGlass, faTimes, } from "@fortawesome/free-solid-svg-icons";
import { SafeArea } from "../utility/safearea";



export function Tokens({ navigation }) {
    const [modalOpen, setmodalOpen] = useState(false);
    const [modalShow, setmodalShow] = useState(false);
     const [allCoin, setAllCoin] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([{ current_price: 0, image: null, price_change_percentage_24h: 0 }]);


    function visible() {
        setmodalShow(!modalShow)

    }
    const getCoinList = async () => {
        const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false";
        try {
            const response = await fetch(url);
            const coindata = await response.json();
            setAllCoin(coindata)
            setFilteredCoins(coindata);
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
                    <TouchableOpacity onPress={() => navigation.navigate("Swap")}>
                    <Image source={require('../assets/ttt4.png')} style={{ height: 32,width:32,}}
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
                <ScrollView nestedScrollEnabled={true}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 35, marginTop: 5 }}>Top tokens on</Text>
                    <Text style={{ fontSize: 35, }}>Uniswap</Text>

                    <View style={styles.filterTokens}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={{ color: "gray", left: 10 }} />
                        <TextInput
                            style={{ marginLeft: 20 }}
                            placeholder="Filter tokens"
                            onChangeText={(text) => HandleSubmit(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setmodalOpen(true)}>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        
                        <View style={{
                            flexDirection: "row", backgroundColor: "#d9dbdb", justifyContent: "center",
                            alignItems: 'center', borderRadius: 10, width: "37%"
                        }}>
                            <Image source={require("../assets/eth.png")} style={{ width: 22, height: 22, borderRadius: 15, margin: 8 }} />
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Ethereum</Text>
                            <FontAwesomeIcon icon={faAngleDown} size={17} style={{ margin: 5, color: "gray" }} />
                        </View>
                        

                        <View style={{
                            flexDirection: "row", marginLeft: 8, backgroundColor: "#d9dbdb",
                            justifyContent: "center", alignItems: "center", borderRadius: 10, width: "20%"
                        }}>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>1D</Text>
                            <FontAwesomeIcon icon={faAngleDown} size={17} style={{ margin: 5, color: "gray" }} />
                        </View>
                        
                    </View>
                    </TouchableOpacity>
                    <View style={styles.TokensName}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text>Token name</Text>
                            <Text>Price</Text>
                        </View>
                        <View style={{ marginTop: 5, borderTopWidth: 1, borderColor: "#c5c6c7" }}>
                            <FlatList
                                initialNumToRender={30}
                                data={filteredCoins}
                                renderItem={({ item }) => {
                                    let percent = item.price_change_percentage_24h
                                    percent = Number(percent).toFixed(2);
                                    return (
                                        <View style={{ padding: 13, flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image source={{ uri: item.image }} style={{ width: 25, height: 25, margin: 5 }} />
                                                <View>
                                                    <Text>{item.name}</Text>
                                                    <Text style={{ color: "#8c8f8e", fontSize: 12 }}>{item.symbol}</Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: "flex-end" }}>
                                                <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>${item.current_price.toFixed(2)}</Text>
                                                <View style={{ flexDirection: "row", }}>
                                                    <FontAwesomeIcon icon={percent >= 0 ? faArrowUp : faArrowDown} size={10}
                                                        color={percent >= 0 ? "#06c78a" : "red"} style={{ margin: 5, }} />
                                                    <Text style={{ color: percent >= 0 ? "#06c78a" : "red" }}>{percent}%</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                key={({ item }) => item.id}
                                
                            />

                        </View>
                        <View>
                        </View>
                        <Modal animationType='fade'
                            visible={visible}
                            transparent={true}>
                                <View>

                                </View>

                        </Modal>
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
                                    navigation.navigate('WalletConnect')
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
                                    navigation.navigate('WalletConnect')
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
                </View>
                </ScrollView>
            </View>
            
        </SafeArea>
    )
}
const styles = StyleSheet.create({
    contanier: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between"
    },
    filterTokens: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 13,
        marginTop: 50,
        backgroundColor: "#f5f7f7",
        borderColor: "#b6baba",
        alignItems: "center",
        marginBottom: 10,
        padding: 5
    },
    TokensName: {
        borderColor: "#c5c6c7",
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
    SetWallet: {
        backgroundColor: '#c9c7c5',
        height: 60,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 2
    },
    SetWallet2: {
        backgroundColor: '#c9c7c5',
        height: 60,
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
    times: {
        //marginLeft: "auto"
    },

})