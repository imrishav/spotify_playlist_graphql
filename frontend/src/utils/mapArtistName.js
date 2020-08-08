export const mapArtistName = (array) => {
  const shuffled = array.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 10);

  return selected;
};
