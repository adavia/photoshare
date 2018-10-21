import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Box } from 'rebass/emotion';
import { graphql, compose, withApollo } from 'react-apollo';

import { InputField } from '../shared/Fields';
import { Button } from '../shared';

import { LOGIN_MUTATION } from '../../modules/users/mutations';

const Login = ({ login, history, client }) => {
  return ( 
    <Formik
      initialValues={{ 
        email: '', 
        password: '' 
      }}
      onSubmit={ async (values, actions) => {
        try {
          await login({ variables: values });
          await client.resetStore();
          history.push('/');
        } catch (error) {
          console.log(error.message)
          actions.setSubmitting(false);
        }
      }}
      render={props => (
        <Box mx="auto" p={3} width={[ 1, 1/3 ]}>
          <Title>Sign In to the site!</Title>
          <Form>
            <Field 
              name="email" 
              label="Email" 
              placeholder="Your email" 
              component={InputField} 
            />
            <Field 
              name="password" 
              label="Password" 
              type="password"
              placeholder="Your super secret password!" 
              component={InputField} 
            />
            <Button 
              disabled={props.isSubmitting}
              type="submit">
              {props.isSubmitting ? <span>Signing in...</span> : <span>Sign in!</span>}
            </Button>
            <Register>Or <Link to="/users/new">register</Link> now</Register>
          </Form>
        </Box>
      )}
    />
  );
}

const Title = styled('h1')`
  font-family: ${props => props.theme.fonts.Dosis};
  font-size: 2rem;
  margin-bottom: 0;
  text-align: center;
`

const Register = styled('span')`
  margin-left: 20px;
`

export default compose(
  graphql(LOGIN_MUTATION, { name: 'login' }),
  withApollo,
)(Login);