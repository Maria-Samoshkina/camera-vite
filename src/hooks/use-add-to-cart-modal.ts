import { useAppDispatch, useAppSelector } from '.';
import { getCameras } from '../store/catalog/cameras-selectors';
import { getIsAddToCartModalOpen, getSelectedCameraForCart } from '../store/modals/modals-selectors';
import { closeAddToCartModal, openAddToCartModal, setSelectedCameraForCart } from '../store/modals/modals-slice';

const useAddToCartModal = ()=> {
  const dispatch = useAppDispatch();
  const isAddToCartModalOpen = useAppSelector(getIsAddToCartModalOpen);
  const selectedCameraForCart = useAppSelector(getSelectedCameraForCart);
  const cameras = useAppSelector(getCameras);

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

  return {
    isAddToCartModalOpen,
    handleBuyButtonClick,
    handleAddToCartModalClose,
    selectedCameraForCart
  };
};

export default useAddToCartModal;
