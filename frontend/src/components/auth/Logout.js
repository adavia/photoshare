import { PureComponent} from 'react';
import { graphql, compose, withApollo } from 'react-apollo';

import { LOGOUT_MUTATION } from '../../modules/users/mutations';

class Logout extends PureComponent {
  componentDidMount = async () => {
    const { logout, client, history } = this.props;

    await logout();
    await client.resetStore();
    history.push('/auth/login');
  }

  render() {
    return null;
  }
}

export default compose(
  graphql(LOGOUT_MUTATION, { name: 'logout' }),
  withApollo,
)(Logout);

