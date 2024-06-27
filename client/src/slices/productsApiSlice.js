import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductos: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, //seconds
    }),
    getProductDetails: builder.query({
      query: (prodId) => ({
        url: `${PRODUCTS_URL}/${prodId}`,
      }),
      keepUnusedDataFor: 5, //seconds
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5, //seconds
    }),
  }),
});
export const {
  useGetProductosQuery,
  useGetProductDetailsQuery,
  useGetTopProductsQuery,
} = productsApiSlice;
