import { useNavigate } from "react-router-dom";

// Create a HOC to pass navigate as a prop to class components
export function withNavigation(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
