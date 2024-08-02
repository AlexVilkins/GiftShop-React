export const setAddFavorite = (items) => ({
  type: "SET_ADD_FAVORITE",
  payload: items,
});

export const setDelFavorite = (item) => ({
  type: "SET_ADD_FAVORITE",
  payload: item.id,
});
