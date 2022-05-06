import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {};

function CounterFeature(props) {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter);

    const handleIncrease = () => {
        const action = increase();
        dispatch(action);
    };

    const handleDecrease = () => {
        const action = decrease();
        dispatch(action);
    };

    return (
        <div>
            <h1>Counter : {counter}</h1>
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Decrease</button>
        </div>
    );
}

export default CounterFeature;
