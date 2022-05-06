import Header from 'components/Header';
import CartFeature from 'features/Cart';
import CounterFeature from 'features/Counter';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import AlbumFeature from './features/Album';
import ProductFeature from './features/Product';
import TodoFeature from './features/Todo';

function App() {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route path="/" component={CounterFeature} exact />
                <Route path="/products" component={ProductFeature} />
                <Route path="/todos" component={TodoFeature} />
                <Route path="/albums" component={AlbumFeature} />
                <Route path="/cart" component={CartFeature} />
            </Switch>
            {/* <ProductFeature /> */}
        </div>
    );
}

export default App;
