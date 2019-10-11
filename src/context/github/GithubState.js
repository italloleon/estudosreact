import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USERS, GET_REPOS } from '../types'
import gitHubContext from './githubContext';

const GithubState = props => {
    const initialState = {
        user: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search User

    //Get User

    //Get Repos

    //Clear Users

    //Set Loading

    return <gitHubContext.Provider
    value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
    }}
    >
        {props.children}

    </gitHubContext.Provider>;

}

export default GithubState;