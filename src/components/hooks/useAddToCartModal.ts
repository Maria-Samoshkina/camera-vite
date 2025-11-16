import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/cameras-selectors';
import { getIsAddToCartModalOpen, getSelectedCameraForCart } from '../../store/modals/modals-selectors';
import { closeAddToCartModal, openAddToCartModal, setSelectedCameraForCart } from '../../store/modals/modals-slice';

const useAddToCartModal = ()=> {
  const dispatch = useAppDispatch();
  const isAddToCartModalOpen = useAppSelector(getIsAddToCartModalOpen);
  const selectedCameraForCart = useAppSelector(getSelectedCameraForCart);
  const cameras = useAppSelector(getCameras);

  const handleOpenAddToCartModal = (cameraId:string) => {
    const currentCamera = cameras.find((camera)=> camera.id.toString() === cameraId);

    if (currentCamera) {
      dispatch(setSelectedCameraForCart(currentCamera));
      dispatch(openAddToCartModal());
    }
  };

  const handleCloseAddToCartModal = () => {
    dispatch(closeAddToCartModal());
  };

  return {
    isAddToCartModalOpen,
    handleOpenAddToCartModal,
    handleCloseAddToCartModal,
    selectedCameraForCart
  };
};

export default useAddToCartModal;
