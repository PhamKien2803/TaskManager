import { useNavigate } from "react-router-dom";
export function isAuthenticated() {
    const token = localStorage.getItem("id");

    if (!token) {
        window.location.href = "/login";
    }
}

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();

        const isAuthenticated = () => {
            return !!localStorage.getItem("id");
        };

        if (isAuthenticated()) {
            return <WrappedComponent {...props} />;
        } else {
            navigate("/login");
            return null;
        }
    };
};

export default withAuth;
