import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import Alert from './components/layout/Alert';
import axios from 'axios'

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  /*async componentDidMount(){
    setLoading( true)

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data)
setLoading(false);
    this.setState({users: res.data, loading: false})
  }*/

  const searchUsers = async text => {
    setLoading( true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&per_page=50&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res)
    setUsers(res.data.items);
    setLoading(false);
    
  }

  const getUser = async (username) => {
    setLoading( true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data)
    setUser(res.data);
    setLoading(false);
    
  }

  const getUserRepos = async (username) =>{
    setLoading( true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data)
    setRepos(res.data);
    setLoading(false);
    
  }



  const clearUsers = () =>{
    setLoading(false);
    setUsers([]);
  }

  const showAlert = (msg,type)=>{
    setAlert({msg, type})
    
    setTimeout(()=>setAlert(null), 3000)
  }


  return (
    <GithubState>
    
    <Router>
      <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search searchUsers={searchUsers}
              clearUsers={clearUsers}
              showClear={users.length > 0 ? true : false  }
              setAlert={showAlert}
            />
            <Users loading={loading} users={users}/>

            </Fragment>
          )} />
          <Route exact path='/about' component={About} />
          <Route exact path="/user/:login" render={props =>(
            <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
          )

          } />
        </Switch>
        
      </div>
    </div>
    </Router>
    </GithubState>
  
    
  );
  
}

export default App;
