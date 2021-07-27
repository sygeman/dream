import axios from 'axios';

const generated: any[] = [];

function user(index = 0, user: any) {
  let firstName = user.name.first;
  let lastName = user.name.last;

  return {
    index: index + 1,
    name: `${firstName} ${lastName}`,
    description: user.email,
  };
}

export const getUser = (index: number, newUser: any) => {
  if (!generated[index]) {
    generated[index] = user(index, newUser);
  }

  return generated[index];
};

export const generateUsers = async (length: number, startIndex = 0) => {
  const { data } = await axios.get(
    `https://randomuser.me/api/?results=${length}`
  );

  return data.results.map((user, i) => getUser(i + startIndex, user));
};
