import { AuthContext } from "../../providers";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
