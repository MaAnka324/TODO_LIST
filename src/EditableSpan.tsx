import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";
// import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
    disabled?: boolean
}
const EditableSpan: FC<EditableSpanType> = React.memo((
    {
        title,
        changeTitle,
        spanClasses,
        disabled
    }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {

        setLocalTitle((e.currentTarget.value))
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)
    }

    return (
        editMode
            ? <TextField id="standard-basic"
                         variant="standard"
                         value={localTitle}
                         onChange={changeLocalTitle}
                         autoFocus={true}
                         onBlur={offEditMode}
                         disabled={disabled}
            />
            : <span className={spanClasses}
                    onDoubleClick={onEditMode}>{title}</span>
    );
});

export default EditableSpan;