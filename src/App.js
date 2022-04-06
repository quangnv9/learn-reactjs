import { Button } from '@mui/material';
import Header from 'components/Header';
import CounterFeature from 'features/Counter';
import { useSnackbar } from 'notistack';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import ProductFeature from './features/Product';
import TodoFeature from './features/Todo';

function App() {

  const { enqueueSnackbar } = useSnackbar()

  const showNoti = () => {
    enqueueSnackbar('Register successfully', { variant: 'success' })
  }

  return (
    <div className="app">
      <Header />

      <Button onClick={showNoti}>Show Noti</Button>
      <Switch>
        <Redirect from="/home" to="/todos" />
        <Redirect from="/post-list/:postId" to="/posts/:postId" />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} exact />
        <Route path="/albums" component={AlbumFeature} exact />
        <Route path="/products" component={ProductFeature} exact />

        <Route component={NotFound} />
      </Switch>

      {/* <ProductFeature /> */}
      <h1>Footer</h1>
    </div>
  );
}

export default App;
