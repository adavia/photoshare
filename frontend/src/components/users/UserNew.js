import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';
import { Box } from 'rebass/emotion';
import { graphql, compose } from 'react-apollo';

import { InputField } from '../shared/Fields';
import { Button } from '../shared';

import { CREATE_USER_MUTATION } from '../../modules/users/mutations';

const UserNew = ({ createUser, history }) => {
  return (
    <Formik
      initialValues={{ 
        username: '',
        email: '', 
        password: '' 
      }}
      validationSchema={
        Yup.object().shape({
          username: Yup.string()
            .min(2, 'Username cannot be so short!')
            .max(50, 'Username cannot be to long!')
            .required('You must add a username!'),
          email: Yup.string()
            .email('Invalid email!')
            .required('You must add an email!'),
          password: Yup.string()
            .min(2, 'Password cannot be so short!')
            .required('You must add a password!')
        })
      }
      onSubmit={ async (values, actions) => {
        try {
          await createUser({ variables: values });
          history.push('/auth/login');
        } catch (error) {
          actions.setSubmitting(false);
          console.log(error.message)
        }
      }}
      render={props => (
        <Box mx="auto" p={3} width={[ 1, 1/3 ]}>
          <Title>Sign Up for a new account!</Title>
          <Form>
            <Field 
              name="username" 
              label="Username" 
              placeholder="Your username" 
              component={InputField} 
            />
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
              disabled={props.isSubmitting && isEmpty(props.errors)}
              type="submit">
              {props.isSubmitting ? <span>Signing Up...</span> : <span>Join us!</span>}
            </Button>
            <Login>Or <Link to="/auth/login">login</Link> now</Login>
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

const Login = styled('span')`
  margin-left: 20px;
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUser' })
)(UserNew);