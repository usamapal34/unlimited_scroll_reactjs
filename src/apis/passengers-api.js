import config from "./api-config";

const passengersApi = {
  getPassengers,
};

/**
 *  Fetch current user foot prints
 */

async function getPassengers(page, pageSize) {
  const requestOptions = {
    method: "GET",
  };

  let url = `${config.BaseURL}/passenger?page=${page}&size=${pageSize}`;

  const response = await fetch(url, requestOptions);
  const passengers = await handleResponse(response);
  return passengers;
}

/**
 *  Response Handler
 */

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      return Promise.reject(data);
    }
    return data;
  });
}

export default passengersApi;
