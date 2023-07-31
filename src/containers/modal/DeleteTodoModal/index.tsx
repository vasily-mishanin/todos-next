'use client';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '../Modal/Modal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './styles.css';
import toast from 'react-hot-toast';
import { useDeleteTodoMutation } from '@/store/services/todosApi';
import { ModalTypes } from '@/store/types';

export default function DeleteTodoModal() {
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const isOpen = modalState.id === ModalTypes.DELETE_TODO && modalState.isOpen;

  const [deleteTodo, result] = useDeleteTodoMutation();
  const { isError } = result;

  if (isError) {
    toast.error('Deleting todo failed');
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDeleteTodo = async () => {
    const { data: modalData } = modalState;

    await deleteTodo({ _id: modalData?._id });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} showCloseBtn>
      <div className='content-wrapper'>
        <h1 className='question'>Do you really want to delete this Todo?</h1>
        <button className='btn-delete-confirmation' onClick={handleDeleteTodo}>
          Yes, delete this todo
        </button>
      </div>
    </Modal>
  );
}
