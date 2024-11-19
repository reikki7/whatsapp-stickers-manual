// index.tsx
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

export default function Index() {
  return <App />;
}

AppRegistry.registerComponent('main', () => Index);