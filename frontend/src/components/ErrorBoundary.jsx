import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Something went wrong
                </h1>
                <p className="text-gray-600 mb-6">
                  We're sorry, but something unexpected happened. Please try
                  refreshing the page.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-left">
                    <p className="text-sm text-red-800 font-mono break-all">
                      {this.state.error?.toString()}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
