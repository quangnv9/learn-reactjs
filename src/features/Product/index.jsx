import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import ProductDetail from './pages/ProductDetail';


function ProductFeature() {

  const match = useRouteMatch()

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:productId`} component={ProductDetail} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;