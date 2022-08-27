import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          // onDelete is passed as a prop, here we call it on a Click which is going to work its way up to App.js and call {deleteTask} the function.
          //"State gets passed down and, Actions get passed up"
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
