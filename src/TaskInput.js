import { useState } from "react";

export default function TaskInput({handleAddTask}) {
    const [userTask , setUserTask] = useState("");

    function handleSetUserTask(e) {
        setUserTask(e.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (!userTask) return;
        const date = new Date().toLocaleDateString();
        const id = crypto.randomUUID()
        const newTask = {
            id,
            task:userTask,
            isCompleted : false,
            date,
            editedDate : "",
            completedDate: "",
        }
        handleAddTask(newTask);
        setUserTask("");
    }

    return <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Enter Your Task..." value={userTask} onChange={(e) => handleSetUserTask(e)} />
        <button>+</button>
    </form>
}