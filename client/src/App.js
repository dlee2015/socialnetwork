import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Alert from './component/layout/Alert';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/routing/PrivateRoute';
import CreateProfile from './component/profile-form/CreateProfile';
import EditProfile from './component/profile-form/EditProfile';
import AddExperience from './component/profile-form/AddExperience';
import AddEducation from './component/profile-form/AddEducation';

//REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions/auth';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Navbar />
					<Route path='/' exact component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route path='/register' component={Register} />
							<Route path='/login' component={Login} />
							<PrivateRoute path='/dashboard' component={Dashboard} />
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path='/edit-profile'
								component={EditProfile}
							/>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEducation}
							/>
						</Switch>
					</section>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
