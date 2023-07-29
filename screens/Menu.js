import { useEffect, useState, } from "react";
import { View, Text, Image, StyleSheet, Modal, Pressable,TouchableOpacity, } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown,faMagnifyingGlass,faCircleXmark,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { SafeArea } from "../utility/safearea";


export function Menu({ navigation }) {
    
    return (
        <SafeArea>
            <View style={{ flex: 1,backgroundColor:"#0f0e0e" }}>
            <View style={styles.contanier}>
            <Pressable onPress={() => navigation.navigate("Swap")}>
            <Image source={require('../assets/ttt4.png')} 
            style={{height:35,width:35}}/>
            </Pressable>
            
            {/* <View style={{flexDirection:"row"}}>
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
            </View> */}
            
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Swap")}>
        <View style={{padding:12,marginBottom:20}}>
            <Text style={{fontSize:20,color:"gray",fontWeight:"500"}}>Ecosystem</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Info")}>
        <View style={{padding:12,marginBottom:20}}>
            <Text style={{fontSize:20,color:"gray",fontWeight:"500"}}>Governance</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{padding:12,marginBottom:20}}>
            <Text style={{fontSize:20,color:"gray",fontWeight:"500"}}>Blog</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{padding:12,marginBottom:20}}>
            <Text style={{fontSize:20,color:"gray",fontWeight:"500"}}>Feedback</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{padding:12,marginBottom:20}}>
            <Text style={{fontSize:20,color:"gray",fontWeight:"500"}}>Support</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{padding:12,marginBottom:25}}>
            <Text style={{fontSize:20,color:"gray",fontWeight:"500"}}>FAQ</Text>
        </View>
        </TouchableOpacity>
        
        
        
                
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
    
})