import React from 'react';
import RepoItem from './RepoItem'
import PropTypes from 'prop-types'


const Repos = ({ repos }) => {
    return repos.map(repos => <RepoItem repo={repos} key={repos.id} />)
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default Repos
