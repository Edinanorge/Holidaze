import { useAuth } from "../../context/authContext";
import LoginForm from "../../features/authentication/Login";
import CreteVenueForm from "../../features/venues/CreateVenueForm";

function CreateVenuePage() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <CreteVenueForm /> : <LoginForm />}</>;
}

export default CreateVenuePage;
