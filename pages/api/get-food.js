import { verifyIdToken } from '../../utilities/auth/firebase-admin';

const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla'];

const getFood = async (request, response) => {
  const { token } = request.headers;

  try {
    await verifyIdToken(token);
    return response.status(200).json({
      food: favoriteFoods[Math.floor(Math.random() * favoriteFoods.length)],
    });
  } catch {
    return response.status(401).send('You are unauthorised');
  }
};

export default getFood;
