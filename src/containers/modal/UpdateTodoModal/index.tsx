'use client';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '../Modal/Modal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './styles.css';
import toast from 'react-hot-toast';
import { useUpdateTodoMutation } from '@/store/services/todosApi';
import { ITodo, ModalTypes } from '@/store/types';

export default function UpdateTodoModal() {
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const isOpen = modalState.id === ModalTypes.UPDATE_TODO && modalState.isOpen;

  const [updateTodo, result] = useUpdateTodoMutation();
  const { isError } = result;

  if (isError) {
    toast.error('Updating todo failed');
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleUpdateTodo = async () => {
    const { data: modalData } = modalState;
    await updateTodo(modalData as ITodo);
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={() => 111} showCloseBtn={false}>
      <div className='content-wrapper'>
        <h1 className='question'>Save changes in that todo item?</h1>
        <div className='flex flex-col gap-2'>
          <button
            className='btn-update-confirmation'
            onClick={handleUpdateTodo}
          >
            Yes, update this todo
          </button>
          <button className='btn-update-cancel' onClick={handleClose}>
            No, cancel changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
