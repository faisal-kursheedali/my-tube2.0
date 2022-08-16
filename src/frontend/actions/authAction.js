import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
import { setLocalStorage } from "../utility/localStorage";

export const signupUser = createAsyncThunk("auth/signup", async (navFnc, {
    getState
}) => {
    try {
        const state = getState();
        const value = {
            email: state.email,
            password: state.password,
            name: state.name
        }
        console.log(state);
        const {data}=await axios.post(`/api/auth/signup`,value);
        setLocalStorage("token",data.encodedToken);
        setLocalStorage("userName",data.createdUser.name);
        setLocalStorage("userMail",data.createdUser.email); 
        navFnc();
        return data
    } catch (error) {
        console.log(error);
        return error;
    }
    
})


export const loginUser=createAsyncThunk("auth/login",async(navFnc,{getState})=>{
const state=getState();
    try {
        const {data}=await axios.post("/api/auth/login",{
            email:state.email,
            password:state.password,
        })
        console.log(data);

        setLocalStorage("token",data.encodedToken);
        setLocalStorage("userName",data.foundUser.name);
        setLocalStorage("userEmail",data.foundUser.email);
        navFnc();
       return data
        // authDispatch({
        //     type:AUTH_LOADING_FALSE
        // })
    } catch (error) {
        console.log(error);
        return error
    }
})

