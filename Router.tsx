import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
import { useContext, useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import Login from '~Login';
import Results from '~Results';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');


//primary router for the app
export default function Router() {
    const routeNameRef = useRef() as any;
    const navigationRef = useRef() as any;

    useEffect(() => {

        if (Platform.OS === 'android') {
            try {
                NavigationBar.setBackgroundColorAsync('#fff');
                NavigationBar.setButtonStyleAsync('dark')
            }
            catch (e) {
                //console.log(e);
            }
        }

    }, []);

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;

                routeNameRef.current = currentRouteName;
            }}
        >
            <SafeAreaView
                style={{
                    backgroundColor: "#ffffff",
                    flex: 1,
                    paddingTop: Platform.OS == 'android' ? 20 : 0
                }}
            >
                <Stack.Navigator initialRouteName="Login" >
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} />
                </Stack.Navigator>

            </SafeAreaView>
        </NavigationContainer>

    )
}