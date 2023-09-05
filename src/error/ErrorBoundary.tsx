import { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      toast.error("Some error occurred. Please try again");
      return (
        <div className="card w-full p-5 lg:w-auto lg:p-5 bg-white">
          <div className="card-inner flex flex-col">
            <h1 className="title m-5 text-red-900">
              Some error occurred. Please try again later
            </h1>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
