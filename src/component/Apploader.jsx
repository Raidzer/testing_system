import { useDispatch, useSelector } from "react-redux"
import { getUserId } from "../service/localStorage.service";
import { useEffect } from "react";
import { getInfoUser, getStatusLoadingUser } from "../store/user";
import { getStatusLoadingThemes, loadingDataThemes } from "../store/themes";
import { CircularProgress } from "@mui/material";


const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const userId = getUserId();

    useEffect(() => {
        const getData = async () => {
            try {
                if (userId) {
                    await dispatch(getInfoUser());
                    await dispatch(loadingDataThemes());
                }
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const isLoadingUser = useSelector(getStatusLoadingUser());
    const isLoadingThemes = useSelector(getStatusLoadingThemes());
    const isLoading = !isLoadingUser && !isLoadingThemes;

    return (
        <>
            {isLoading ? (
                children
            ) :
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <div>
                        <CircularProgress color="inherit" />
                    </div>
                </div>
            }
        </>
    )
}

export default AppLoader;