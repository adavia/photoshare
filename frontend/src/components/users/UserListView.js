import React from 'react';
import { Query } from 'react-apollo';

import { ALL_USERS_QUERY } from '../../modules/users/queries';

import Spinner from '../shared/Spinner';
import UserList from './UserList';

const UserListView = () => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({data, loading}) => loading ?
        <Spinner /> :
        <UserList count={data.totalUsers} users={data.allUsers} />
      }
    </Query>
  );
}

export default UserListView;