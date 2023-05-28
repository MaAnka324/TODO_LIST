import React, {ChangeEvent, FC, useState} from 'react';


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}
const EditableSpan: FC<EditableSpanType> = React.memo( (
    {
        title,
        changeTitle,
        spanClasses
}) => {
    console.log('EditableSpan')
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
        ? <input
            value={localTitle}
            onChange={changeLocalTitle}
            autoFocus={true}
            onBlur={offEditMode}
            />
        : <span className={spanClasses}
            onDoubleClick={onEditMode}>{title}</span>
    );
});

export default EditableSpan;