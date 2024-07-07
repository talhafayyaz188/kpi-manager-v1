import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://datapanel.x10car.parts/";

export const listingAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066";
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getListingData: builder.query({
      query: ({ page, pageLimit }) =>
        `inventory?limit=${pageLimit}&offset=${page}`,
    }),
  }),
});

export const { useGetListingDataQuery, useLazyGetListingDataQuery } =
  listingAPI;
