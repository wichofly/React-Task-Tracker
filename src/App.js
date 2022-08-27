import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Clean the bathroom',
      day: 'Feb 5th at 3:00pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Dentist appo',
      day: 'Feb 6th at 3:00pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Make the soup',
      day: 'Feb 7th at 3:00pm',
      reminder: true,
    },
  ]);

  // Delete Task
  // I do not want to show the task with the id because we are deleting it in the UI
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    // where the task id is equal to the id that is passed in then we are having a specific object else it is just going to be the task, no changed.
    // inside the object (the one we are dealing with) i want to copy or spread acorss (...) all of the task properties an values but i want to change the reminder.The reminder is going to set to the opposite of whatever the specific task reminder is.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks'
      )}
    </div>
  );
};

export default App;
