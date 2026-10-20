import { useCallback, useEffect, useRef, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Không thể tải dữ liệu (HTTP ${response.status}).`);
        }

        const result = await response.json();
        if (isCurrentRequest) {
          setData(Array.isArray(result) ? result : []);
        }
      } catch (requestError) {
        if (requestError.name !== "AbortError" && isCurrentRequest) {
          setError(requestError.message || "Đã xảy ra lỗi khi tải dữ liệu.");
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    requestRef.current = fetchData;
    fetchData();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [url]);

  const refetch = useCallback(() => {
    if (requestRef.current) {
      return requestRef.current();
    }

    return Promise.resolve();
  }, []);

  return { data, loading, error, refetch };
}

export default useFetch;
