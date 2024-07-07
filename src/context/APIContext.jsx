import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const APIContext = createContext(undefined);

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
};

export const APIProvider = ({ children }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSearchData, setLoadingSearchData] = useState(false);
  const [error, setError] = useState(null);
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useNavigate();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [searchDatabyparams, setSearchDatabyparams] = useState({});
  const [searchData, setSearchData] = useState([]);

  const API_URL = "https://datapanel.x10car.parts/";

  const getInventoryItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        API_URL + `inventory?limit=${pageLimit}&offset=${page}`,
        {
          headers: {
            Authorization: "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066",
            "Content-Type": "application/json",
          },
        }
      );
      const { inventoryItems, total } = response.data;
      // console.log(response.data);

      setTotalPages(total);
      const data = inventoryItems.map((data) => {
        return {
          condition: data.condition,
          conditionDescription: data.conditionDescription,
          product: data.product,
          availability: data.availability,
          packageWeightAndSize: data.packageWeightAndSize,
          availabilityKey:
            data.availability.pickupAtLocationAvailability.reduce(
              (item) => item.merchantLocationKey
            ),
          offer_details: data.offer_details.reduce((item) => ({ item })),
        };
      });
      setInventoryItems(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const SearchBySku = async (sku) => {
    try {
      setLoadingSearchData(true);
      const response = await axios.get(`${API_URL}inventory`, {
        params: {
          sku: sku,
        },
        headers: {
          Authorization: "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066",
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      console.log(data);

      const inventoryItemsSearchData = {
        condition: data.condition,
        conditionDescription: data.conditionDescription,
        product: data.product,
        availability: data.availability,
        packageWeightAndSize: data.packageWeightAndSize,
        availabilityKey: data.offer_details?.reduce(
          (item) => item.merchantLocationKey
        ),
        offer_details: data.offer_details.reduce((item) => ({ item })),
      };
      console.log(inventoryItemsSearchData);

      setSearchDatabyparams(inventoryItemsSearchData);

      setSearchData([inventoryItemsSearchData]);
    } catch (error) {
      console.error(error);
      setError(error.data);
    } finally {
      setLoadingSearchData(false);
    }
  };

  const UpdateInventaryItems = async ({ body, id }) => {
    setLoadingUpdate(true);
    try {
      console.log("check:", body);

      const response = await axios.put(
        API_URL + `inventory/update/${id}`,
        body,
        {
          headers: {
            Authorization: "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Updated.....success");
        toast.success("Updated success");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoadingUpdate(false);
      router(`/listing-segments/active/`);
    }
  };

  const DeleteBySku = async (sku) => {
    setLoading(true);
    try {
      const response = await axios.delete(API_URL + `inventory`, {
        params: {
          sku: sku,
        },
        headers: {
          Authorization: "token a8c0f000e3c5cb0b2a84b47ce3173655867f2066",
        },
      });
      if (response.status === 200) {
        toast.success(`${sku} Deleted SuccessFully`);
        console.log(response.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInventoryItems();
  }, [page, pageLimit]);

  return (
    <APIContext.Provider
      value={{
        inventoryItems,
        loading,
        loadingSearchData,
        setLoadingSearchData,
        setLoading,
        error,
        page,
        pageLimit,
        totalPages,
        setPage,
        setPageLimit,
        setTotalPages,
        SearchBySku,
        searchData,
        UpdateInventaryItems,
        setSearchData,
        loadingUpdate,
        setLoadingUpdate,
        searchDatabyparams,
        DeleteBySku,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
