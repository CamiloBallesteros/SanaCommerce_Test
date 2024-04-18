export const useSessionStorage = (key: string) => {
    const setSessionItem = (value: unknown) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const getSessionItem = () => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.log(error);
        }
    };

    const removeSessionItem = () => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setSessionItem, getSessionItem, removeSessionItem };
}