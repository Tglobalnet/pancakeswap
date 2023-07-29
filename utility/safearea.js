import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

export function SafeArea({ children }) {
    return (
        <SafeAreaView style={style.areaContainer}>
            {children}
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    areaContainer: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    }
})