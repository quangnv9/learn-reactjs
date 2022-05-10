import Header from 'components/Header';
import CartFeature from 'features/Cart';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import ProductFeature from './features/Product';

function App() {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route path="/" component={ProductFeature} exact />
                <Route path="/products" component={ProductFeature} />
                <Route path="/cart" component={CartFeature} />
            </Switch>
            {/* <ProductFeature /> */}
        </div>
    );
}

export default App;
