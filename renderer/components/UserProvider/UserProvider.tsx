import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import AuthenticationScreen from "../AuthenticationScreen";
import User from "@lib/User";
import { useSnackbar } from "notistack";

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);

    return {
        user,
        setUser,
    };
};

const UserContext = createContext<UserContextType>(null);

const UserProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User>();
    const [isLoading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        try {
            const user = await User.load();
            if(user) setUser(user);
        } catch(e) {
            enqueueSnackbar("Hiba lépett fel a bejelentkezés. Kérlek jelentkezz be újra!", {
                variant: "error",
            });
        }

        setLoading(false);        
    };
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {isLoading ? (
                <LoadingScreen />
            ) : !user ? (
                <AuthenticationScreen />
            ) : children}
        </UserContext.Provider>
    );
};

export default UserProvider;