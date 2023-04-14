export const Button = (props) => {
    return (
        <div>
            <button onClick={() => props.request()}>{props.name}</button>
        </div>
    )
}