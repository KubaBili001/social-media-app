const items = 2; //set default number of items

export const getPaginationConfig = (page: number, take: number = items) => {
  const skip = (page - 1) * take;
  return { take, skip };
};
