import { useQuery } from "react-query";
import axios from "axios";

const API_URL = "https://datapanel.x10car.parts/";

const fetchData = async (pageLimit, page) => {
  try {
    const response = await axios.get(
      `${API_URL}inventory?limit=${pageLimit}&offset=${page}`,
      {
        headers: {
          Authorization: "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const searchData = async (value) => {
  try {
    const response = await axios.get(`${API_URL}/inventory?sku=${value}`, {
      headers: {
        Authorization: "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const useListingData = (pageLimit, page) => {
  return useQuery({
    queryKey: ["listing", pageLimit, page],
    queryFn: () => fetchData(pageLimit, page),
    keepPreviousData: true,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};

export const useListingSearchData = (value) => {
  return useQuery({
    queryKey: ["listing", value],
    queryFn: () => searchData(value),
    enabled: false,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};
