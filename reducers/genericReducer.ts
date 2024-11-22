import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'
import moment from "moment";

interface genericState {
    mute: boolean
}

const initialState: genericState = {
    mute: true
}

export const genericSlice = createSlice({
    name: "generic",
    initialState,
    reducers: {
        setMute: (state, action) => {
            state.mute = action.payload;
        }

    }
});

// Action creators are generated for each case reducer function
export const {
    setMute
} = genericSlice.actions;

export const getMute = (state: RootState) => state.generic.mute;

export default genericSlice.reducer;

