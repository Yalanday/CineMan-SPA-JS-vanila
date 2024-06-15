import {getRandomInteger, getRandomValue} from "../util/util";
import {DaysDuration, names, surnames, EMOTIONS, comment} from "../util/const";

const getDate = () => {
  const date = new Date()

  date.setDate(
      date.getDate() - getRandomInteger(DaysDuration.MIN, DaysDuration.MAX)
  );
  return date.toISOString();
};

const generateComment = () => ({
  author: `${getRandomValue(names)} ${getRandomValue(surnames)}`,
  comment,
  date: getDate(),
  emotion: getRandomValue(EMOTIONS),
});

const getCommentCount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

const generateComments = (films) => {
  const commentCount = getCommentCount(films);

  return Array.from({length: commentCount}, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};

export {generateComments};
