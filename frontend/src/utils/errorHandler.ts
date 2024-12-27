import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
    return (error as AxiosError<{ message: string }>)?.response?.data?.message ?? "an unexpected error occurred";
};
