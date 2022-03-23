import React, { Component, ReactElement } from "react";

import ErrorHandler from "./ErrorHandler";

class ErrorBoundaries extends Component<
  { children: ReactElement },
  { error?: Error }
> {
  static getDerivedStateFromError(error) {
    return { error };
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidCatch(error, errorInfo) {
    // log error here
  }

  render() {
    if (this.state.error) {
      return <ErrorHandler error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundaries;
