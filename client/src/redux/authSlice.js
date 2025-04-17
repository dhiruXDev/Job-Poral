import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        allRatingAndReview:[],  
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setAllRatingAndReview :(state ,action)=>{
            state.allRatingAndReview = action.payload
        }
    }
});
export const {setLoading, setUser ,setAllRatingAndReview} = authSlice.actions;
export default authSlice.reducer;