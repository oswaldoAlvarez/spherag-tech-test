import { Redirect } from 'expo-router';

import { routes } from '../shared/config/routes';

const IndexRoute = () => <Redirect href={routes.login} />;

export default IndexRoute;
