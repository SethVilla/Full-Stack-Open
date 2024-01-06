import "./Notification.css"
export const Notification = ({ notification: {type, message} }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${ type === "error" ? "error" : "success" }`}>
            {message}
        </div>
    )
}