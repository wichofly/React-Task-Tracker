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
  const deleteTask = (id) => {
    console.log('delete', id)
  }

  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
};

export default App;
