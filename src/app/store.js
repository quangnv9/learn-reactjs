import { configureStore } from "@reduxjs/toolkit";
import counterRedecer from "features/Counter/counterSlice"
import userRedecer from 'features/Auth/userSlice'
import todoRedecer from "features/Todo/todoSlice"


const rootRudecer = {
    counter: counterRedecer,
    user: userRedecer,
    todos: todoRedecer,
}

const store = configureStore({
    reducer: rootRudecer,
})

export default store