import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import TaskInput from "./TaskInput";
import Tasks from "./Tasks";
import Task from "./Task";
import Footer from "./Footer";

export default function ToDoList() {
    // const [list , setList] = useState(JSON.parse(localStorage.getItem("list")) || []);
    const [list , setList] = useState(function() { // using call back function and that is better
        const returnList = window.localStorage.getItem("list");
        return JSON.parse(returnList);
    });

    const completedTasks = list.filter((item) => item.isCompleted);

    useEffect(function() {
        window.localStorage.setItem("list", JSON.stringify(list));
    },[list])

    function handleIsCompleted(task , completed , completeDate) {
        const updatedTasks = list.map((item) => item.id === task.id ? {...item , isCompleted: completed ,completedDate: completeDate} : item);
        setList(updatedTasks);
    }
    function handleEditTextInList(task , text , editedDate) {
        const updatedTasks = list.map((item) => item.id === task.id ? {...item , task: text , editedDate:editedDate} : item);
        setList(updatedTasks);
    }
    function handleAddTask(newTask) {
        setList((tasks) => [...tasks , newTask]);
    }
    function handleDeleteTask(deletedTask) {
        setList((tasks) => tasks.filter((task) => task.id !== deletedTask.id));
    }
    function resetTaskList() {
        setList([]);
    }

    return <div className="to-do-list">
        <Header/>
        <TaskInput handleAddTask={handleAddTask}/>
        {
            !list.length ? <div className="empty-list">You didn't add any tasks to your list yet!</div>
            :<Tasks  >
                {list.map((item) => <Task key={item.id} item = {item} handleDeleteTask={handleDeleteTask}
                handleIsCompleted={handleIsCompleted} handleEditTextInList={handleEditTextInList}/>)}
            </Tasks>
        }
        {list.length > 0 ?
            <Footer resetTaskList={resetTaskList}>
                    {`You have ${list.length} ${list.length === 1 ? "Task" : "Tasks"}, ${completedTasks.length}
                    ${completedTasks.length === 1 ? "has" : "have"} been completed successfully 
                    (${((completedTasks.length / list.length) * 100).toFixed(2)}% )`}
                    <Button onClick={resetTaskList} variant="danger">
                        Reset All
                        <i className="bi bi-exclamation-circle-fill"></i>
                    </Button>
            </Footer>
        : ""
        }
    </div>
}