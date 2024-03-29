import React, {ChangeEvent, FC, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export type AddItemFormType = {
    maxLengthUserName: number
    addItem: (title: string) => void
    className?: string
    disabled?: boolean
}

const AddItemForm: FC<AddItemFormType> = React.memo(({
                                                         maxLengthUserName,
                                                         addItem,
                                                         className,
                                                         disabled
                                                     }) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle((e.currentTarget.value))
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }


    const isUserMessageToLong: boolean = title.length > maxLengthUserName

    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required!!!!</div>

    const userMaxLength = title.length > maxLengthUserName &&
        <div style={{color: 'hotpink'}}>Task title is to long</div>

    const isAddBtnDisable = !title.length || isUserMessageToLong || error || disabled

    return (
        <div className={className}>
            <TextField
                id="outlined-basic"
                label='Please, enter title'
                variant="outlined"
                value={title}
                onChange={changeLocalTitle}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                disabled={disabled}
            />
            <IconButton onClick={addTask} size='small' disabled={isAddBtnDisable}>
                <AddIcon fontSize={"large"}/>
            </IconButton>
            {userMaxLength}
            {userErrorMessage}
        </div>
    );
});

export default AddItemForm;