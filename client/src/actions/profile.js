import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_PROFILE,
	GET_PROFILES,
	GET_REPOS,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED
} from './types.js';

// Get current users profile

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get All Profiles

export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get('/api/profile');
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get Profile By Id

export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get Github Repo By Username

export const getGithubRepos = username => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`);
		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			// All Profile Error Do The Same thing thats why in all profile errors are same
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Create or Update a Profile
// the history is paramater which contain a method which will redirect to client side route
// here we can create update profile
export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			'Content-Type': 'application/json'
		};

		const res = await axios.post('/api/profile', formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		// If we are not editing the profile then redirect
		// Redirect in actions is diff than react so we do something like this then we have to use history with a react-router-dom-method called withRouter
		history.push('/dashboard');
	} catch (err) {
		// If the form filling person bhool jaye koi field to ye res se errors fetch kr k os error ki array me mapping kr k alers show krta he jitni bhi hon
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add Experience

export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			'Content-Type': 'application/json'
		};

		const res = await axios.put('/api/profile/experience', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Experience Added', 'success'));

		// Redirect in actions is diff than react so we do something like this then we have to use history with a react-router-dom-method called withRouter
		history.push('/dashboard');
	} catch (err) {
		// If the form filling person bhool jaye koi field to ye res se errors fetch kr k os error ki array me mapping kr k alers show krta he jitni bhi hon
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add Education

export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			'Content-Type': 'application/json'
		};

		const res = await axios.put('/api/profile/education', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Education Added', 'success'));

		// Redirect in actions is diff than react so we do something like this then we have to use history with a react-router-dom-method called withRouter
		history.push('/dashboard');
	} catch (err) {
		// If the form filling person bhool jaye koi field to ye res se errors fetch kr k os error ki array me mapping kr k alers show krta he jitni bhi hon
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Delete experience

export const deleteExperience = id => async dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		try {
			const res = await axios.delete(`/api/profile/experience/${id}`);

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data
			});

			dispatch(setAlert('Experience Deleted', 'danger'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status
				}
			});
		}
	}
};

// Delete education

export const deleteEducation = id => async dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		try {
			const res = await axios.delete(`/api/profile/education/${id}`);

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data
			});

			dispatch(setAlert('Education Deleted', 'danger'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status
				}
			});
		}
	}
};

// Delete Accound And Profile

export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		try {
			await axios.delete(`/api/profile`);

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert('Your account has been permanently deleted', 'light'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status
				}
			});
		}
	}
};
