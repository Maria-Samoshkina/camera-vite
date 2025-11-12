import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatReviewDate = (dateString: string): string => dayjs(dateString).format('DD MMMM');
