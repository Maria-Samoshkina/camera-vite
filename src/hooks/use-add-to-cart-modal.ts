import { useAppDispatch, useAppSelector } from '.';
import { addToCart } from '../store/cart/cart-slice';
import { getCameras } from '../store/catalog/cameras-selectors';
import { getIsAddCameraToCartSuccessModalOpen, getIsAddToCartModalOpen, getSelectedCameraForCart } from '../store/modals/modals-selectors';
import { closeAddCameraToCartSuccessModal, closeAddToCartModal, openAddCameraToCartSuccessModal, openAddToCartModal, setSelectedCameraForCart } from '../store/modals/modals-slice';

const useAddToCartModal = ()=> {
  const dispatch = useAppDispatch();
  const isAddToCartModalOpen = useAppSelector(getIsAddToCartModalOpen);
  const selectedCameraForCart = useAppSelector(getSelectedCameraForCart);
  const cameras = useAppSelector(getCameras);

  const isAddCameraToCartSuccessModalOpen = useAppSelector(getIsAddCameraToCartSuccessModalOpen);

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
      dispatch(openAddCameraToCartSuccessModal());
    }
  };

  const handleAddCameraToCartSuccessModalClose = () => {
    dispatch(closeAddCameraToCartSuccessModal());
  };

  return {
    isAddToCartModalOpen,
    handleBuyButtonClick,
    handleAddToCartModalClose,
    selectedCameraForCart,
    isAddCameraToCartSuccessModalOpen,
    handleAddToCartButtonClick,
    handleAddCameraToCartSuccessModalClose
  };
};

export default useAddToCartModal;
