import axios from "axios";

const featchItems = async () => {
  const url = "https://66910f4126c2a69f6e8e426e.mockapi.io/test/products";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Произошла ошибка при запросе данных");
    return null;
  }
};

export default featchItems;
