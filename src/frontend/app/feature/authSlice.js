import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../../services/authServices"
const initialState={name:"",
email:"",
password:"",
token:"",
loading:false,
error:"",
confirmPassword:"",
isLoggedin:false,
status:false,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setName:(state,action)=>{
            state.name=action.payload
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        },
        setPassword:(state,action)=>{
            state.password=action.payload
        },
        loadAuth:(state)=>{
            const token=localStorage.getItem("token");
            const userName=localStorage.getItem("userName");
            state={
                ...state,
                token:token,
                name:userName
            }
        },
        userToken:(state,action)=>{
            state={
                ...state,
                token:action.payload.token,
                name:action.payload.name,
                email:action.payload.email
            }
        },
        logoutUser:(state,action)=>{
            const token=localStorage.removeItem("token");
            const userName=localStorage.removeItem("userName");
            state=initialState;
        },
        
    },
    extraReducers:builder=>{
        builder.addCase(loginUser.pending)
    }
})