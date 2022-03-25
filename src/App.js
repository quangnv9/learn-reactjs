import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import ProductFeature from './features/Product';
import TodoFeature from './features/Todo';

function App() {


  return (
    <div className="app">
      <h1>Header</h1>
      <p><NavLink to="/todos">Todos</NavLink></p>
      <p><NavLink to="/albums">Albums</NavLink></p>
      <p><NavLink to="/products">Product</NavLink></p>

      <Switch>
        <Redirect from="/home" to="/todos" />
        <Redirect from="/post-list/:postId" to="/posts/:postId" />

        <Route path="/todos" component={TodoFeature} exact/> 
        <Route path="/albums" component={AlbumFeature} exact/> 
        <Route path="/products" component={ProductFeature} exact/>

        <Route component={NotFound} />
      </Switch>
      
      {/* <ProductFeature /> */}
      <h1>Footer</h1>
    </div>
  );
}

export default App;
