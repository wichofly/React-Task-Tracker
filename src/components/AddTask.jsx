import { useState } from 'react'; // each input is having its own piece of component level state to modify.

// rafce
const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  // we are not calling onAdd directly.
  //  e.preventDefault() does not actually submit to a page
  const onSubmit = (e) => {
    e.preventDefault()

    if(!text) {
      alert('Please add a task')
      return
    }

    onAdd({text, day, reminder})

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          // we need onChange because when the user start to type in the input, that's going to fire off onChange.
          // It has a function, is passing the event object and directly call setText, "(e.target.value)" is going to be whatever the user is typing in
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Task"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          // this is going to give either a true or false value id that's is checked or not
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
