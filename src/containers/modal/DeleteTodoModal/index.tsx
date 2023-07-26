'use client';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '../Modal/Modal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

export default function DeleteTodoModal() {
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  console.log({ modalState });
  const isOpen = modalState.id === 'delete-todo-modal' && modalState.isOpen;

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal title='TodosNext Modal' open={isOpen} onClose={handleClose}>
      <h1>Content Children</h1>
    </Modal>
  );
}
