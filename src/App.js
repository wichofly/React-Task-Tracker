// in order to load the data when the page loads we are using useEffect. It use to create side effects or deal with side effects. It is often use to if i want to something to happen the page loads.
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

   // Fetch Task
   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      // we are adding data so we need to add headers beacuse we need to specify Content Type
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      // it tunrs it from  javascript object into a json string
      body: JSON.stringify(task)
    })

    // the data that returns is the new task added
    const data = await res.json()

    setTasks([...tasks, data])

    // We do not need the code below cause json creates an id for us

    // // give me a ramdon number for id
    // const id = Math.floor(Math.random() * 10000) + 1;
    // // This newTask is a object with the new id and we are copying whatever teh task text, day and reminder wich is passed here "const addTask = (task)", we are adding that to the object as well.
    // const newTask = { id, ...task };
    // // we are cpying the current tasks that are already there "const [tasks, setTasks] = useState" but the we also want to add the newTask
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  // I do not want to show the task with the id because we are deleting it in the UI
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      // we are updating data so we need to add headers beacuse we need to specify Content Type and the method is PUT
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      // it tunrs it from  javascript object into a json string
      body: JSON.stringify(updTask)
    })

    // the data that returns is the new task added
    const data = await res.json()

    // the only thing changed is the data.reminder beacuse the data that we get back is just the updated task
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );

    // where the task id is equal to the id that is passed in, then we are having a specific object, else it is just going to be the task, no changed.
    // inside the object (the one we are dealing with) i want to copy or spread acorss (...) all of the task properties an values but i want to change the reminder. The reminder is going to set to the opposite of whatever the specific task reminder is.
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, reminder: !task.reminder } : task
    //   )
    // );
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

// How woudl I build my static assets if I am ready to deploy?
// npm run buil. Ceates a optimized production build in a folder call "build".
// That's gonna be my static assets, is what i would deploy.
// React does not deploy component folder but build folder, build is whats pusehd to production

// npm i serve. It is a basic http server
// serve -s build -p 8000

// npm i json-server. mock data
