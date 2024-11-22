import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface userState {
    data: any;
    token: any;
    lang: string;
    langSet: boolean;
    firstRun: boolean;
    biometrics: boolean;
    singedIn: boolean;
    ply: boolean;
    orientation: any;
    rtl: boolean;
    deviceId: string | null;
    device: any
}

const initialState: userState = {
    data: {},
    token: false,
    lang: "en",
    langSet: false,
    firstRun: true,
    biometrics: false,
    singedIn: false,
    ply: false,
    orientation: false,
    rtl: false,
    deviceId: null,
    device: {}
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        reset: (state) => {
            state.data = {};
            state.token = false;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetToken: (state) => {
            state.token = false;
        },
        setLang: (state, action) => {
            state.lang = action.payload

            //if the language is RTL
            if (action.payload === "ar") {
                state.rtl = true;
            }
            else {
                state.rtl = false;
            }
        },
        setLangSet: (state, action) => {
            state.langSet = action.payload
        },
        setFirstRun: (state, action) => {
            state.firstRun = action.payload
        },
        enableBiometrics: (state) => {
            state.biometrics = true
        },
        disableBiometrics: (state) => {
            state.biometrics = false
        },
        setSingedIn: (state, action) => {
            state.singedIn = action.payload
        },
        setOrientation: (state, action) => {
            state.orientation = action.payload
        },
        saveDeviceId: (state, action) => {
            state.deviceId = action.payload
        },
        saveDevice: (state, action) => {
            state.device = action.payload
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    set, reset, setToken,
    resetToken, setLang, setLangSet,
    setFirstRun, enableBiometrics,
    disableBiometrics, saveDeviceId,
    setSingedIn, setOrientation, saveDevice
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data
export const selectToken = (state: RootState) => state.user.token
export const selectLang = (state: RootState) => state.user.lang
export const selectLangSet = (state: RootState) => state.user.langSet
export const selectFirstRun = (state: RootState) => state.user.firstRun
export const selectBiometrics = (state: RootState) => state.user.biometrics
export const selectSingedIn = (state: RootState) => state.user.singedIn
export const selectOrientation = (state: RootState) => state.user.orientation
export const deviceId = (state: RootState) => state.user.deviceId
export const device = (state: RootState) => state.user.device

export default userSlice.reducer;

