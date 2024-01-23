import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext(null);

const NotificationDispatchContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notification, dispatch] = useReducer(
        notificationReducer,
        initialNotification
    );

    return (
        <NotificationContext.Provider value={notification}>
            <NotificationDispatchContext.Provider value={dispatch}>
                {children}
            </NotificationDispatchContext.Provider>
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    return useContext(NotificationContext);
}

export const useNotificationDispatch = () => {
    return useContext(NotificationDispatchContext);
}

function notificationReducer(notification, action) {
    switch (action.type) {
        case 'notify': {
            return {...action.payload};
        }
        case 'reset': {
            return {
                ...initialNotification
            }
        }
        default: {
            return notification;
        }
    }
}

const initialNotification = {
    message: null,
    type: ''
}
