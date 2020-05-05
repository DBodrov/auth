import { useCallback, useRef, useEffect } from 'react';

function useAbortController() {
    const abortControllerRef = useRef<AbortController>();
    const getAbortController = useCallback(() => {
        if (!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }
        return abortControllerRef.current;
    }, []);

    useEffect(() => {
        return () => getAbortController().abort();
    }, [getAbortController]);

    const getSignal = useCallback(() => getAbortController().signal, [getAbortController]);

    return getSignal;
}

interface IFetchRequestConfig extends RequestInit {
    body?: any;
}

export function useFetch() {
    const getSignal = useAbortController();

    const fetchClient = useCallback(async (endpoint: string, fetchConfig: IFetchRequestConfig = {}) => {
        const { body, ...customConfig } = fetchConfig;
        const config: RequestInit = {
            method: body ? 'POST' : 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            ...customConfig,
            signal: getSignal(),
        };
        if (body) {
            config.body = JSON.stringify(body);
        }
        const response = await window.fetch(endpoint, config);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    }, [getSignal]);

    return fetchClient;
}
