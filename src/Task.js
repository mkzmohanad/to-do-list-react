import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

export default function Task({item,handleDeleteTask,handleIsCompleted,handleEditTextInList}) {
    const [complete , setComplete] = useState(item.isCompleted ? item.isCompleted : false);
    const [editedText , setEditedText] = useState(item.task);
    const [enableEditing , setEnableEditing] = useState(false);
    const [isEdited , setIsEdited] = useState(item.editedDate ? item.editedDate : false);

    function handleSetComplete() {
        setComplete((checked) => !checked);
    }
    function handleEditText(event) {
        setEditedText(event.target.value);
    }
    function handleSetEnableEditing() {
        if(complete) return;
        setEnableEditing(true)
    }
    function handleCancelEditText() {
        setEditedText(item.task);
        setEnableEditing(false)
    }
    function handleConfirmEditText() {
        if(editedText === "") return;
        const editDate = new Date().toLocaleDateString();
        handleEditTextInList(item,editedText,editDate);
        setEnableEditing(false);
        setIsEdited(true)
    }

    useEffect(function(){
        const completeDate = new Date().toLocaleDateString();

        handleIsCompleted(item , complete , completeDate);

    },[complete]);
    /*in react you cant use for in jsx because it is also used as for loop in js and as u know u cant use for loop in js
    so we use htmlFor instead */
    return <li className={`${item.isCompleted ? "completed" : ""}`}>
        <div className="check-box-task">
            {!enableEditing ?
                <>
                    <input type="checkbox" checked={complete} onChange={handleSetComplete} id={item.id}/>
                    <label htmlFor={item.id}>{item.task}</label> 
                    <p>{
                        complete ? `Completed At ${item.completedDate}`
                        :isEdited ? `Edited At ${item.editedDate}`
                        :`Added At ${item.date}`
                    }</p>
                </>
                :<input type="text" value = {editedText} onChange={(event) => {handleEditText(event)}}/>
            }
        </div>
        <div className="icons-btns">
            {!enableEditing ?
                <>
                    <i className={`bi bi-pencil ${complete ? "disabled" : ""}`} onClick={handleSetEnableEditing}></i>
                    <i className="bi bi-trash3" onClick={() => handleDeleteTask(item)}></i>
                </>
                :<>
                <Button className="edit-btns" variant="success" onClick={handleConfirmEditText}>Confirm</Button>
                <Button className="edit-btns" variant="danger" onClick={handleCancelEditText}>Cancel</Button>
                </>
            }
        </div>
    </li>

}