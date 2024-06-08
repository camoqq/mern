import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //mutation because we are not fetching data but authenticating with post request
    login: builder.mutation({
      query: (data) => ({
        // data(email,password) being sent to the url
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        // data(email,password) being sent to the url
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        // data(email,password) being sent to the url
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
