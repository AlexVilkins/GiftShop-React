export const setAddBasket = (items) => ({
  type: "SET_ADD_BASKET",
  payload: items,
});

export const setDelBasket = (item) => ({
  type: "SET_DEL_BASKET",
  payload: item.id,
});
