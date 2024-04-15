export const fetchData = (params) => {
    return async (dispatch) => {
      try {
        dispatch({ type: 'FETCH_DATA_REQUEST' }); 
        const queryParams = new URLSearchParams(params).toString();

        const response = await fetch(`http://127.0.0.1:8000/api/v1/quote?${queryParams}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
      }
    };
  };