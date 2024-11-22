import { Input, Text, Button } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ScrollView, View, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Alert01Icon, EyeIcon, ViewOffIcon } from "@agworld/icons"
import Api from "Api";
import { useAppDispatch } from "hooks";
import { setToken } from "reducers/userReducer";
import { useToast } from "react-native-toast-notifications";
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const toast = useToast();
    const navigation = useNavigation();

    useEffect(() => {
        check()
    }, [])

    const toggleSecureEntry = (): void => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props: any): React.ReactElement => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            {secureTextEntry ?
                <EyeIcon color="red" />
                :
                <ViewOffIcon color="green" />
            }
        </TouchableWithoutFeedback>
    );

    const check = async () => {
        try {

            let { data } = await Api.get('admin/me')

            //console.log(data)

            //test
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Results' }],
                })
            );
        }
        catch (e) {
            console.log(e)
        }
    }

    //login
    const login = async () => {
        if (loading) return

        setLoading(true)

        try {

            let { data } = await Api.post('admin/login', { email, password })



            dispatch(setToken(data.token.token))

            //navigate
            toast.show('Login successful. Please wait...', {
                type: 'success',
                placement: "top"
            });

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Results' }],
                })
            );
        }
        catch (err) {
            console.log(err)
            toast.show('Error, check your email or password', {
                type: 'warning',
                placement: "top"
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#ffffff"
            }}
        >

            <View
                style={{
                    width: "100%",
                    paddingTop: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                }}
            >
                <Image
                    source={require("~assets/icon.png")}
                    style={{
                        height: 100,
                        width: 100,
                        resizeMode: "contain"
                    }}
                />

                <Text
                    style={{
                        marginTop: 50
                    }}
                >
                    PredictMate Administration App
                </Text>
                <Text
                    style={{
                        marginVertical: 10
                    }}
                >
                    Please login to continue
                </Text>
            </View>

            <View
                style={{
                    paddingHorizontal: 20
                }}
            >
                <Input
                    value={email}
                    label='Email'
                    placeholder='joe@doe.com'
                    onChangeText={nextValue => setEmail(nextValue)}
                    style={{
                        marginBottom: 10
                    }}
                />

                <Input
                    value={password}
                    label='Password'
                    placeholder='Place your Text'
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={nextValue => setPassword(nextValue)}
                    style={{
                        marginBottom: 20
                    }}
                />

                <Button
                    disabled={loading}
                    onPress={login}
                >
                    Login
                </Button>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#8F9BB3',
    },
});