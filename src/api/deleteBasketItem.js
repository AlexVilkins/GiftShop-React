import axios from "axios";

const deleteBasketItem = async (item) => {
  const url = "https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket/";

  try {
    await axios.delete(url + item);
  } catch (error) {
    console.log(error);
    alert("Произошла ошибка при запросе данных");
  }
};

export default deleteBasketItem;
