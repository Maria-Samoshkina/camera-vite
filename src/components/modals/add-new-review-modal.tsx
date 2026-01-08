import { Fragment, useEffect, useRef, useState } from 'react';
import { UseModalAccessibility } from '../../hooks/use-modal-accessibility';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, RATING_MAX_VALUE, RATING_MIN_VALUE, RATING_STARS, TEXT_MAX_LENGTH, TEXT_MIN_LENGTH } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeAddNewReviewModal, openReviewSuccessModal } from '../../store/modals/modals-slice';
import { postReviewAction } from '../../store/api-actions';
import { getIsSubmitting, getIsSubmittingFailed, getIsSubmittingSuccess } from '../../store/reviews/reviews-selectors';
import { resetSubmitStatus } from '../../store/reviews/reviews-slice';


type AddNewReviewModalProps ={
  isOpen: boolean;
  onModalClose: ()=> void;
  id: string;
}

function AddNewReviewModal (props: AddNewReviewModalProps): JSX.Element {

  const isSubmittingFailed = useAppSelector(getIsSubmittingFailed);
  const isSubmitting = useAppSelector(getIsSubmitting);
  const isSubmittingSuccess = useAppSelector(getIsSubmittingSuccess);

  const {isOpen, onModalClose, id} = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef(null);

  const dispatch = useAppDispatch();

  const [rating, setRating] = useState<number>(0);
  const [ratingError, setRatingError] = useState<string>('');


  const [userName, setUserName] = useState<string>('');
  const [userNameError, setUserNameError] = useState<string>('');

  const [advantage, setAdvantage] = useState<string>('');

  const [disadvantage, setDisadvantage] = useState<string>('');

  const [review, setReview] = useState<string>('');

  const [errors, setErrors] = useState({
    advantage: '',
    disadvantage: '',
    review: ''
  });


  UseModalAccessibility({
    isOpen,
    onModalClose,
    modalRef,
    initialFocusRef: nameInputRef as unknown as React.RefObject<HTMLElement>,
  });

  const validateRating = (valueOfRating: number)=> {
    if (!Number.isInteger(valueOfRating) || valueOfRating < RATING_MIN_VALUE || valueOfRating > RATING_MAX_VALUE){
      setRatingError('Нужно оценить товар');
      return false;
    }
    setRatingError('');
    return true;
  };

  const handleStarsRatingChange = (starsRatingValue: number)=> {
    const value = Math.floor(starsRatingValue);
    if (value >= RATING_MIN_VALUE && value <= RATING_MAX_VALUE) {
      setRating(value);
      setRatingError('');
    }


  };


  const validateUserName = (name: string)=> {
    if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
      setUserNameError('Нужно указать имя');
      return false;
    }
    setUserNameError('');
    return true;
  };


  const validateTextField = (
    value: string,
    fieldName: keyof typeof errors,
    errorMessage: string
  ): boolean => {
    if (value.length < TEXT_MIN_LENGTH || value.length > TEXT_MAX_LENGTH) {
      setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    return true;
  };

  const resetForm = () => {
    setRating(0);
    setAdvantage('');
    setDisadvantage('');
    setUserName('');
    setErrors({
      advantage: '',
      disadvantage: '',
      review: ''
    });
    setReview('');
  };

  useEffect(()=> {
    if(isSubmittingSuccess){
      dispatch(closeAddNewReviewModal());
      resetForm();
      dispatch(openReviewSuccessModal());
      dispatch(resetSubmitStatus());
    }
  },[isSubmittingSuccess, dispatch]
  );

  useEffect(()=> {
    if(isSubmittingFailed){
      const timer = setTimeout(()=> {
        dispatch(resetSubmitStatus());
      }, 5000);

      return ()=> clearTimeout(timer);
    }
  }, [isSubmittingFailed, dispatch]);

  const handleReviewFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const isRatingValid = validateRating(rating);
    const isUserNameValid = validateUserName(userName);
    const isAdvantageValid = validateTextField(advantage, 'advantage', 'Нужно указать достоинства');
    const isDisadvantageValid = validateTextField(disadvantage, 'disadvantage', 'Нужно указать недостатки');
    const isReviewValid = validateTextField(review, 'review', 'Нужно добавить комментарий');

    if (!isRatingValid || !isUserNameValid || !isAdvantageValid || !isDisadvantageValid || !isReviewValid) {
      return;
    }

    dispatch(postReviewAction({
      cameraId: Number(id),
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      review: review,
      rating: rating
    }));

  };


  return (
    <div className={isOpen ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={onModalClose}
        >
        </div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleReviewFormSubmit}>
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${ratingError ? 'is-invalid' : ''}`}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">


                      {RATING_STARS.map((title, index) => {
                        const value = RATING_MAX_VALUE - index;
                        return (
                          <Fragment key={value}>
                            <input
                              className="visually-hidden"
                              id={`star-${value}`}
                              name="rate"
                              type="radio"
                              value={value}
                              onChange={(evt) => handleStarsRatingChange(Number(evt.target.value))}
                              checked={rating === value}
                            />
                            <label className="rate__label" htmlFor={`star-${value}`} title={title}></label>
                          </Fragment>
                        );
                      })}

                    </div>
                    <div className="rate__progress"><span className="rate__stars">{rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">{ratingError}</p>
                </fieldset>


                <div className={`custom-input form-review__item ${userNameError ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      ref= {nameInputRef}
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      value={userName}
                      onChange={(evt)=> {
                        setUserName(evt.target.value);
                      }}
                      onBlur={(evt)=> {
                        validateUserName(evt.target.value);
                      }}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>


                <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      value={advantage}
                      onChange={(evt)=> setAdvantage(evt.target.value)}
                      onBlur={(evt)=> validateTextField(evt.target.value, 'advantage','Нужно указать достоинства')}
                      required
                    />
                  </label>
                  <p className="custom-input__error">{errors.advantage}</p>
                </div>


                <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      value={disadvantage}
                      onChange={(evt)=> {
                        setDisadvantage(evt.target.value);
                      }}
                      onBlur={(evt)=> validateTextField(evt.target.value, 'disadvantage','Нужно указать недостатки')}

                      required
                    />
                  </label>
                  <p className="custom-input__error">{errors.disadvantage}</p>
                </div>

                <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={TEXT_MIN_LENGTH}
                      placeholder="Поделитесь своим опытом покупки"
                      value={review}
                      onChange={(evt)=> {
                        setReview(evt.target.value);
                      }}
                      onBlur={(evt)=> validateTextField(evt.target.value, 'review','Нужно добавить комментарий')}

                    >

                    </textarea>
                  </label>
                  <div className="custom-textarea__error">{errors.review}</div>
                </div>


              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправляется' : 'Отправить отзыв'}
              </button>
              {isSubmittingFailed &&
                <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>
    Упс! Ошибка отправки. Попробуйте снова.
                </p>}
            </form>
          </div>


          <button
            className="cross-btn"
            type="button" aria-label="Закрыть попап"
            onClick={onModalClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>


        </div>
      </div>
    </div>
  );
}

export default AddNewReviewModal;


