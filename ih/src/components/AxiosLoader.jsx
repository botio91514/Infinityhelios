import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";
import { storeApi } from "../api/storeApi";
import axios from "axios";

const AxiosLoader = () => {
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        // Request interceptor
        const reqInterceptor = storeApi.interceptors.request.use(
            (config) => {
                if (!config.skipLoader) {
                    showLoader();
                }
                return config;
            },
            (error) => {
                hideLoader();
                return Promise.reject(error);
            }
        );

        // Response interceptor
        const resInterceptor = storeApi.interceptors.response.use(
            (response) => {
                hideLoader();
                return response;
            },
            (error) => {
                hideLoader();
                return Promise.reject(error);
            }
        );

        // Also bind to the default axios instance if used elsewhere, or any other instances
        // For now just storeApi as it's the main one used for cart/checkout

        return () => {
            storeApi.interceptors.request.eject(reqInterceptor);
            storeApi.interceptors.response.eject(resInterceptor);
        };
    }, [showLoader, hideLoader]);

    return null;
};

export default AxiosLoader;
