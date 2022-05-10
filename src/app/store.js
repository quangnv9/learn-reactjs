import userReducer from 'features/Auth/userSlice';
import cartRedecer from 'features/Cart/cartSlice';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
    user: userReducer,
    cart: cartRedecer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
