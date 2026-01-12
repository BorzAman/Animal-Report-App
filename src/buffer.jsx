import { useAuth } from "./authContext";
import Logging from "./logging.jsx";

function Buffer() {
  const {loading } = useAuth();

  if (!loading) {
    return null;
  }

  return <Logging />;
}

export default Buffer;
