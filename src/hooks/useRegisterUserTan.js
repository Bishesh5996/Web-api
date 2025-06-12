import { useMutation } from "@tanstack/react-query";
// useMutation is used for POST/PUT/PATCH/DELETE request state
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
    return useMutation(
        {
            mutationFn: registerUserService, // what function to run
            mutationKey: ['register'],
            onSuccess: (data) => {
                toast.success(data?.message || "Registration Success")
            },
            onError: (err)=> {
                toast.error(err?.message || "Registration Failed")
            }
        }
    )
}

// mutationFn: (formData) => registerUserService(formData) 
