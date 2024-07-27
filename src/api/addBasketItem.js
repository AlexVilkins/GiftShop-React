import axios from "axios";

const addBasketItem = async (obj) => {
  const url = "https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket";
  try {
    const response = await axios.post(url, obj);
    return response;
  } catch (error) {
    console.log(error);
    alert("Произошла ошибка при запросе данных");
  }
};

export default addBasketItem;
