import { useAppDispatch, useAppSelector } from '.';
import { addToCart } from '../store/cart/cart-slice';
import { getCameras } from '../store/catalog/cameras-selectors';
import { getIsAddCameraSuccessModalOpen, getIsAddToCartModalOpen, getSelectedCameraForCart } from '../store/modals/modals-selectors';
import { closeAddCameraSuccessModal, closeAddToCartModal, openAddCameraSuccessModal, openAddToCartModal, setSelectedCameraForCart } from '../store/modals/modals-slice';

const useAddToCartModal = ()=> {
  const dispatch = useAppDispatch();
  const isAddToCartModalOpen = useAppSelector(getIsAddToCartModalOpen);
  const selectedCameraForCart = useAppSelector(getSelectedCameraForCart);
  const cameras = useAppSelector(getCameras);

  const isAddCameraSuccessModalOpen = useAppSelector(getIsAddCameraSuccessModalOpen);

  const handleBuyButtonClick = (cameraId:string) => {
    const currentCamera = cameras.find((camera)=> camera.id.toString() === cameraId);

    if (currentCamera) {
      dispatch(setSelectedCameraForCart(currentCamera));
      dispatch(openAddToCartModal());
    }
  };

  const handleAddToCartModalClose = () => {
    dispatch(closeAddToCartModal());
  };

  const handleAddToCartButtonClick = () => {
    if (selectedCameraForCart) {
      dispatch(addToCart(selectedCameraForCart));
      dispatch(closeAddToCartModal());
      dispatch(openAddCameraSuccessModal());
    }
  };

  const handleAddCameraSuccessModalClose = () => {
    dispatch(closeAddCameraSuccessModal());
  };

  return {
    isAddToCartModalOpen,
    handleBuyButtonClick,
    handleAddToCartModalClose,
    selectedCameraForCart,
    isAddCameraSuccessModalOpen,
    handleAddToCartButtonClick,
    handleAddCameraSuccessModalClose
  };
};

export default useAddToCartModal;
