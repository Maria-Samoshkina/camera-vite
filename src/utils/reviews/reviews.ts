import { Reviews } from '../../types/review';


export const sortReviewsByDate = (reviews: Reviews): Reviews =>
  [...reviews].sort((a, b) => {
    const dateA = new Date(a.createAt).getTime();
    const dateB = new Date(b.createAt).getTime();

    return dateB - dateA;

  });

