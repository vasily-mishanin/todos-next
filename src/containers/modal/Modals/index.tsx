import DeleteBoardModal from '../DeleteBoardModal';
import DeleteTodoModal from '../DeleteTodoModal';
import UpdateTodoModal from '../UpdateTodoModal';

export default function Modals() {
  return (
    <>
      <DeleteTodoModal />
      <UpdateTodoModal />
      <DeleteBoardModal />
    </>
  );
}
