import React, { Component } from 'react';
import Logrocket from 'logrocket';
Logrocket.init('pkf27n/pikopiko');

interface Props {
  info: string;
  error: string;
}
interface State {
  hasError: boolean;
  error: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: '' };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.toString() };
  }
  componentDidCatch(error: any, info: React.ErrorInfo) {
    console.log(error, info);
    Logrocket.log(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>App Crashed!!!</h1>
          <h2>Something went terribly wrong</h2>
        </>
      );
    }
    return this.props.children;
  }
}
