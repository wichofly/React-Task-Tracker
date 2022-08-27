import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
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

  // Add Task
  const addTask = (task) => {
    // give me a ramdon number for id
    const id = Math.floor(Math.random() * 10000) + 1;
    // This newTask is a object with the new id and we are copying whatever teh task text, day and reminder wich is passed here "const addTask = (task)", we are adding that to the object as well.
    const newTask = { id, ...task };
    // we are cpying the current tasks that are already there "const [tasks, setTasks] = useState" but the we also want to add the newTask
    setTasks([...tasks, newTask]);
  };

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
      {/* onAdd is passing as a prop on Headers */}
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {/* if showAddTask is true then show <AddTask onAdd={addTask} /> */}
      {/* && is a shorter way of doinga ternary wothout an else */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks'
      )}
    </div>
  );
};

export default App;
