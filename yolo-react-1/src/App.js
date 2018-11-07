
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';



import './App.css';
import HomePage from './pages/HomePage.js';
import MapImage from './components/MapImage/MapImage.js'
import AddPhotoPage from './pages/AddPhotoPage';
require('dotenv').config()

class App extends Component {
  render() {
    const renderAddPhotoPage = () => {
      return (
        <AddPhotoPage/>
      )
    }
    return (
      <BrowserRouter>
        <div>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/add-photos" render={renderAddPhotoPage} />
{/*          
          <Route exact path="/articles/:articleID" component={ArticlePage} />
          <Route exact path="/sections/:sectionID" component={SectionPage} />
          <Route exact path="/add-article" render={renderAddArticlePage} />
          <Route exact path="/login" render={renderLoginPage} />
          <Route exact path="/logout" render={renderLogout} /> */}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
