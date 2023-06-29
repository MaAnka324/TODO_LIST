import React, {ChangeEvent, FC, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';


export type AddItemFormType = {
    maxLengthUserName: number
    addItem: (title: string) => void
    className?: string
}

const AddItemForm: FC<AddItemFormType> =  React.memo( ({
    maxLengthUserName,
    addItem,
    className
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
        <div className={className}>
            <TextField
                id="outlined-basic"
                label='Please, enter title'
                variant="outlined"
                value={title}
                onChange={changeLocalTitle}
                onKeyDown={(e)=> e.key  === 'Enter' && addTask()}
            />

            {/*<input*/}
            {/*    value={title}*/}
            {/*    placeholder='Please, enter title'*/}
            {/*    onChange={changeLocalTitle}*/}
            {/*    onKeyDown={(e)=> e.key  === 'Enter' && addTask()}*/}
            {/*/>*/}

            {/*<button disabled={isAddBtnDisable} onClick={addTask}*/}
            {/*>+</button>*/}

            <IconButton onClick={addTask} size='small'>
                <AddIcon fontSize={"large"}/>
            </IconButton>

            {userMaxLength}
            {userErrorMessage}
        </div>
    );
});

export default AddItemForm;