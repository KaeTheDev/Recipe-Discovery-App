import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(()=> {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // silent fail (storage might be full or unavailable)
        }
    }, [key, value]);

    return [value, setValue] as const;
}
export default useLocalStorage;