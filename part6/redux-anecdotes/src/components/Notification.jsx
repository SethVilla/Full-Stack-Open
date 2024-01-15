import {useSelector} from "react-redux";

export const Notification = () => {

  const notification = useSelector((state) => state.notification)
    const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
      <>
        {notification.message &&
            <div style={style}>
          {notification.message}
        </div>
        }
      </>
  )
}