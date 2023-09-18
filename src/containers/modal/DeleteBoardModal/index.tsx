'use client';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '../Modal/Modal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './styles.css';
import toast from 'react-hot-toast';
import { ModalTypes } from '@/store/types';
import { useDeleteBoardMutation } from '@/store/services/boardsApi';

export default function DeleteBoardModal() {
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const isOpen = modalState.id === ModalTypes.DELETE_BOARD && modalState.isOpen;

  const [deleteBoard, result] = useDeleteBoardMutation();
  const { isError } = result;

  if (isError) {
    toast.error('Deleting board failed');
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDeleteTodo = async () => {
    const { data: modalData } = modalState;

    await deleteBoard({ _id: modalData?._id });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} showCloseBtn>
      <div className='content-wrapper'>
        <h1 className='question'>Do you really want to delete this board?</h1>
        <button className='btn-delete-confirmation' onClick={handleDeleteTodo}>
          Yes, delete this board
        </button>
      </div>
    </Modal>
  );
}
