import { FiUser } from "react-icons/fi";
import useAuthStore from "~/stores/authStore";
import HeaderElement from "./HeaderElement";

const AuthHeaderElement = () => {
  const setIsAuthModalOpen = useAuthStore((state) => state.setIsAuthModalOpen);
  return (
    <HeaderElement onClick={() => setIsAuthModalOpen(true)}>
      <FiUser size={20} />
    </HeaderElement>
  );
};

export default AuthHeaderElement;
