import { useEffect, useState } from "react";
import { ScrollView, View, Dimensions, RefreshControl, Image, TouchableOpacity } from "react-native";
import Lottie from 'lottie-react-native';
import { Spinner, Text } from "@ui-kitten/components";
import Api from "Api";
import { EarthIcon, RefreshIcon, Search01Icon } from "@agworld/icons";
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get("window");

export default function Results() {
    const [loading, setLoading] = useState(false)
    const [tip, setTip] = useState({}) as any;
    const [refreshing, setRefreshing] = useState(false);
    const [dis, setDis] = useState(false)
    const [ll, setLL] = useState(0)
    const [err1, setErr] = useState(false)
    const [find, setFind] = useState(null) as any;
    const [show, setShow] = useState(false)
    const [webviewLoading, setWebviewLoading] = useState(false);

    useEffect(() => {
        fetchTip();
    }, [])

    const fetchTip = async () => {
        if (loading) return

        setLoading(true)
        setTip({})
        setShow(false)

        try {

            let { data } = await Api.get('admin/game')

            await setTip(data)

            // console.log(data)
            await search()

        }
        catch (err) {
            console.log(err)
            setErr(true)
        }
        finally {
            setLoading(false)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTip();
        setRefreshing(false);
    };

    const status = async (state: string) => {
        if (dis) return

        setDis(true)

        let won = true;
        let show = true;

        switch (state) {
            case 'won':
                won = true
                setLL(1)
                break;

            case 'lost':
                won = false
                setLL(2)
                break;
            case 'unknown':
                show = false;
                setLL(3)
                break

            default:
                break;
        }

        try {

            let { data } = await Api.post('admin/game', {
                id: tip.id, won, show
            })

            //console.log(data)

            fetchTip()
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setDis(false)
            setLL(0)
        }
    }

    const search = async () => {
        let string = `${tip.home} vs ${tip.away} - ${tip.sport}  - ${tip?.country?.name}`

        setFind('https://www.google.com/search?q=' + string)
        setShow(true)

        // console.log(show, find)

        // try {
        //     Linking.openURL('https://www.google.com/search?q=' + string);

        // }
        // catch (err) {
        //     console.log(err)
        // }
    }

    const privacy = async () => {

        try {
            Linking.openURL('https://freeprivacy7.wordpress.com/2024/11/20/privacy-policy-for-predictmate-admin/');

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#ffffff"
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >


                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        alignContent: "center",
                        alignSelf: "center",
                        height: "auto",
                        backgroundColor: "#fff"
                    }}
                >

                    <Image
                        //source={require(params.icon)}
                        source={require('~assets/icon.png')}
                        style={{
                            width: 60,
                            height: 60,
                            resizeMode: "contain",
                            marginRight: 20
                        }}
                    />

                    <View
                        style={{
                            marginLeft: 2
                        }}
                    >
                        <Text
                            style={{
                                color: "#3fa4ea"
                            }}
                            category='h5'
                        >
                            PredictMate
                        </Text>
                        <Text
                            appearance='hint'
                        >
                            Predictions Management
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={fetchTip}
                        style={{
                            marginLeft: "auto"
                        }}
                    >
                        <RefreshIcon color='#bf1111' size={30} />
                    </TouchableOpacity>

                </View>


                {loading &&
                    <View
                        style={{
                            padding: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%"
                        }}
                    >
                        <Lottie
                            source={require('lottie/loader.zip')}
                            autoPlay
                            loop
                            style={{
                                width: width,
                                height: width * 0.5
                            }}
                            speed={0.5}
                        />

                        <Text
                            appearance="hint"
                            style={{
                                marginBottom: 10
                            }}
                        >
                            Please wait
                        </Text>
                    </View>
                }

                {err1 && !loading &&
                    <>
                        <View
                            style={{
                                padding: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%"
                            }}
                        >
                            <Lottie
                                source={require('lottie/nodata.zip')}
                                autoPlay
                                loop
                                style={{
                                    width: width,
                                    height: width * 0.5
                                }}
                                speed={0.5}
                            />

                            <Text
                                appearance="hint"
                                style={{
                                    marginBottom: 10
                                }}
                            >
                                No Matches to add results
                            </Text>
                        </View>
                    </>
                }

                {!loading && !err1 &&
                    <View
                        style={{
                            paddingHorizontal: 10,
                            paddingBottom: 10
                        }}
                    >

                        <View
                            style={{
                                padding: 0,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 20,
                                        marginBottom: 10,
                                        flex: 1
                                    }}
                                >
                                    {tip.home} vs {tip.away}
                                </Text>

                                <TouchableOpacity onPress={search}>
                                    <Search01Icon color="#3fa4ea" />
                                </TouchableOpacity>

                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    marginBottom: 5,
                                }}
                            >
                                {tip?.country?.iso === "XZ" || tip?.country?.iso === "EN" ?
                                    <EarthIcon size={20} color='#34A853' />
                                    :
                                    <Image
                                        source={{
                                            uri: `https://flagsapi.com/${tip?.country?.iso}/flat/64.png`
                                        }}
                                        height={25}
                                        width={25}
                                    />
                                }


                                <Text
                                    style={{
                                        marginLeft: 5
                                    }}
                                >
                                    {tip?.country?.name} &bull;&bull;&bull; {tip?.sport}
                                </Text>

                            </View>


                            <View
                                style={{
                                    paddingBottom: 3,
                                    flexDirection: 'row',
                                }}
                            >

                                <View
                                    style={{
                                        width: "80%",
                                        marginVertical: 1
                                    }}
                                >

                                    <View
                                        style={{
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            marginVertical: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16
                                            }}
                                        >
                                            Prediction
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                width: "100%"
                                            }}
                                        >
                                            {tip.tip}
                                        </Text>
                                    </View>

                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: "20%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 700
                                        }}
                                    >

                                        Odds
                                    </Text>
                                    <Text

                                    >
                                        {tip?.odds}
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 5,

                            }}
                        >

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "green",
                                    paddingVertical: 8,
                                    paddingHorizontal: 20,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    gap: 2,
                                    alignItems: "center",
                                    width: "33%",
                                    justifyContent: "center"
                                }}
                                disabled={dis}
                                onPress={() => status('won')}
                            >
                                {ll == 1 &&
                                    <View style={{ marginRight: 5 }}>
                                        <Spinner
                                            size="tiny"
                                            status='basic'

                                        />
                                    </View>
                                }

                                <Text
                                    style={{
                                        color: "#fff"
                                    }}
                                >
                                    Won
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "orange",
                                    paddingVertical: 8,
                                    paddingHorizontal: 20,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    gap: 2,
                                    alignItems: "center",
                                    width: "33%",
                                    justifyContent: "center"
                                }}
                                disabled={dis}
                                onPress={() => status('lost')}
                            >
                                {ll == 2 &&
                                    <View style={{ marginRight: 5 }}>
                                        <Spinner
                                            size="tiny"
                                            status='basic'

                                        />
                                    </View>
                                }

                                <Text
                                    style={{
                                        color: "#fff"
                                    }}
                                >
                                    Lost
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    backgroundColor: "gray",
                                    paddingVertical: 8,
                                    paddingHorizontal: 20,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    gap: 2,
                                    alignItems: "center",
                                    width: "33%",
                                    justifyContent: "center"
                                }}
                                disabled={dis}
                                onPress={() => status('unknown')}
                            >
                                {ll == 3 &&
                                    <View style={{ marginRight: 5 }}>
                                        <Spinner
                                            size="tiny"
                                            status='basic'

                                        />
                                    </View>
                                }

                                <Text
                                    style={{
                                        color: "#fff"
                                    }}
                                >
                                    Unknown
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                }

                {show && (
                    <>
                        {webviewLoading && (
                            <View style={{
                                paddingVertical: 5,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Spinner size="tiny" />
                                <Text appearance="hint" style={{ marginTop: 10 }}>Loading...</Text>
                            </View>
                        )}
                        <WebView
                            style={{
                                flex: 1,
                                height: '100%',
                                minHeight: height * .8
                            }}
                            source={{ uri: `${find}&hl=en` }}
                            onLoadStart={() => setWebviewLoading(true)}
                            onLoadEnd={() => setWebviewLoading(false)}
                            nestedScrollEnabled={true}
                        />
                    </>
                )}

            </ScrollView>

        </>
    )
}