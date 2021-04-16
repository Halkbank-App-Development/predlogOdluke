import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Aneks } from './components/Aneks/Aneks';
import { DataPreview } from './components/DataPreview';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={DataPreview} />
            <Route exact path='/Aneks/Aneks' component={Aneks} />
            <Route exact path='/Home' component={Home}/>
      </Layout>
    );
  }
}
