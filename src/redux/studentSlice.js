import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    students: [],
    totalPage: 0,
    status: "start",
    error: null,
    message: null,
    statusback: 0,
}
const url = "http://localhost:8080/api/student"

export const fetchStudent = createAsyncThunk("student/fetchStudent", async (page, thunkAPI) => {
    try {
        const response = await axios.get(url + "/pagination", {
            params: {
                page: page,
                size: 3
            }
        })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const fetchCreateStudent = createAsyncThunk("student/fetchCreateStudent", async (student, thunkAPI) => {
    try {
        const response = await axios.post(url + "/create", student);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateStudent = createAsyncThunk("student/updateStudent", async ({ st, id }, thunkAPI) => {
    try {
        const response = await axios.put(url + "/update/" + id, st)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteStudent = createAsyncThunk("student/deleteStudent", async (id, thunkAPI) => {
    try {
        const response = await axios.delete(url + "/delete/" + id)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const searchStudentByName = createAsyncThunk("student/searchStudentByName", async (name, thunkAPI)=>{
    try{
        const response = await axios.get(url+ "/search?name=" + name)
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const searchStudentByYear = createAsyncThunk("student/searchStudentByYear", async ({startYear, endYear}, thunkAPI)=>{
    try{
        const response = await axios.get(url+ "/search1", {
            params:{
                startYear: startYear,
                endYear: endYear
            }
        })
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const searchStudentByRank = createAsyncThunk("student/searchStudentByRank", async (rank, thunkAPI)=>{
    try{
        const response = await axios.get(url+ "/search2", {
            params:{
                rank: rank
            }
        })
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const searchStudentByPro = createAsyncThunk("student/searchStudentByPro", async ({name, startYear,endYear, rank}, thunkAPI)=>{
    try{
        const response = await axios.get(url+ "/search3", {
            params:{
                name: name,
                startYear: startYear,
                endYear: endYear,
                rank: rank
            }
        })
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        removeMessageError:(state)=>{
            state.message=null;
            state.error =null;
            state.status=""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudent.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchStudent.fulfilled, (state, action) => {
                state.status = "successfully"
                state.students = action.payload.data.listStudent
                state.totalPage = action.payload.data.totalPage
            })
            .addCase(fetchStudent.rejected, (state, action) => {
                state.status = action.payload.status
                state.error = action.payload.message
            })
            .addCase(fetchCreateStudent.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                console.log(action.payload)
            })
            .addCase(fetchCreateStudent.rejected, (state, action) => {
                console.log(action)
                state.message = action.payload.message
                state.status = action.payload.status
                state.error = action.payload.data
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.students = state.students.filter(student => student.id !== action.meta.arg)
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.students = state.students.map(st => st.id == action.meta.arg.id ? { ...st, ...action.payload.data } : st)
            })
            .addCase(updateStudent.rejected,(state, action)=>{
                state.status = action.payload.status
                state.message = action.payload.message
                state.error = action.payload.data
            })
            .addCase(searchStudentByName.fulfilled,(state, action)=>{
                state.students = action.payload.data.listStudent
                state.totalPage = action.payload.data.totalPage
            })
            .addCase(searchStudentByYear.fulfilled,(state, action)=>{
                state.students = action.payload.data.listStudent
                state.totalPage = action.payload.data.totalPage
            })
            .addCase(searchStudentByRank.fulfilled,(state, action)=>{
                state.students = action.payload.data.listStudent
                state.totalPage = action.payload.data.totalPage
            })
            .addCase(searchStudentByPro.fulfilled,(state, action)=>{
                state.students = action.payload.data.listStudent
                state.totalPage = action.payload.data.totalPage
            })
    }
})
export const { removeMessageError} = studentSlice.actions
export default studentSlice.reducer 