import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { ME_QUERY } from '../../modules/users/queries';

import Header from '../shared/Header';
import Spinner from '../shared/Spinner';

class Private extends Component {
  render() {
    const { data, component: Component, ...rest } = this.props;
    
    return (
      <Route component={matchProps => {
        if (!data || data.loading) {
          return <Spinner />;
        }

        if (!data.me) {
          return <Redirect to="/auth/login" />;
        }
        
        return (
          <Container>
            <Fragment>
              <Header currentUser={data.me} />
              <Sidebar />
              <Content>
                <Component {...rest} {...matchProps} />
              </Content>
            </Fragment>
          </Container>
        );   
      }} />
    );
  }
}

const Container = styled('div')`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "sidebar header"
                      "sidebar content";
`

const Sidebar = styled('aside')`
  grid-area: sidebar;
  background: #F1F1F1;
  grid-column: ${props => props.collapsed ? '1' : '3 / span 3'};
`

const Content = styled('main')`
  grid-area: content;
  grid-column: 1 / span 3;
`

export default withRouter(compose(
  graphql(ME_QUERY)
)(Private));