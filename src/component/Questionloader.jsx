import { getStatusLoadigQuestion } from "../store/question";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";


const QuestionLoader = ({ children }) => {
    const isLoadingQuestion = useSelector(getStatusLoadigQuestion());
    const isLoading = !isLoadingQuestion;

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

export default QuestionLoader;