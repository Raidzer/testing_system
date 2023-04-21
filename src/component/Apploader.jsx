import { useDispatch, useSelector } from "react-redux"
import { getUserId } from "../service/localStorage.service";
import { useEffect } from "react";
import { getInfoUser, getStatusLoadingUser } from "../store/user";
import { Circles } from "react-loader-spinner";
import { getStatusLoadingThemes, loadingDataThemes } from "../store/themes";


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
                        <Circles
                            height="50"
                            width="50"
                            color="rgb(0, 0, 0)"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default AppLoader;