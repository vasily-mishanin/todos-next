'use client';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '../Modal/Modal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './styles.css';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function DeleteTodoModal() {
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const isOpen = modalState.id === 'delete-todo-modal' && modalState.isOpen;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDeleteTodo = async () => {
    const { data: modalData } = modalState;
    console.log('handleDeleteTodo', { modalState });
    try {
      if (modalData?._id) {
        await axios.delete('/api/todos', { data: modalData });
        toast.success('Todo deleted');
      }
    } catch (error: any) {
      toast.error(`Delete Todo Failed, ${error.message}`);
    } finally {
      handleClose();
    }
    //TODO refetch todos from redux store via thunk?
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='question'>Do you really want to delete this Todo?</h1>
        <button className='btn-delete-confirmation' onClick={handleDeleteTodo}>
          Yes, delete this todo
        </button>
      </div>
    </Modal>
  );
}
