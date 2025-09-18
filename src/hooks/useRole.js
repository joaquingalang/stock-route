import { useAuth } from '../contexts/AuthContext';

export const useRole = () => {
    const { user } = useAuth();
    
    const roleId = user?.userData?.role_id;
    const roleTitle = user?.userData?.roles?.role_title;
    const username = user?.userData?.username;
    
    
    return {
        roleId,
        roleTitle,
        username,
        userData: user?.userData
    };
};