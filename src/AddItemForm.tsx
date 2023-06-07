import React, {ChangeEvent, FC, useState} from 'react';
import {AddCircle, AddCircleOutline, HighlightOff} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

export type AddItemFormType = {
    maxLengthUserName: number
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> =  React.memo( ({
    maxLengthUserName,
    addItem
                                          }) => {
    console.log('AddItemForm is called')

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle((e.currentTarget.value))
    }

    const addTask = () =>{
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addItem(trimmedTitle)
        }else {
            setError(true)
        }
        setTitle('')
    }


    const isUserMessageToLong: boolean = title.length > maxLengthUserName

    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required!!!!</div>

    const userMaxLength = title.length > 15 && <div style={{color: 'hotpink'}}>Task title is to long</div>

    const isAddBtnDisable = !title.length || isUserMessageToLong || error



    return (
        <div>
            <input
                value={title}
                placeholder='Please, enter title'
                onChange={changeLocalTitle}
                onKeyDown={(e)=> e.key  === 'Enter' && addTask()}
            />
            {/*<button disabled={isAddBtnDisable} onClick={addTask}*/}
            {/*>+</button>*/}

            <IconButton onClick={addTask} size='small'>
                <AddCircleOutline/>!!!
            </IconButton>

            {userMaxLength}
            {userErrorMessage}
        </div>
    );
});

export default AddItemForm;