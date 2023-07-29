import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Swap';
import { Tokens } from './Tokens';

import { Trustwallet } from './Trustwallet';
import { Metamask } from './Metamask';

import { Menu } from './Menu';
import { WalletConet } from './WalletConet';

const Stack = createNativeStackNavigator();

export function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Tokens' component={Tokens}/>
            
            <Stack.Screen name='Trustwallet' component={Trustwallet} options={{ headerShown: false}}/>
            <Stack.Screen name='Metamask' component={Metamask} />
            
            <Stack.Screen name='Menu' component={Menu} />
            <Stack.Screen name='WalletConet' component={WalletConet} />
        </Stack.Navigator>
    )
}