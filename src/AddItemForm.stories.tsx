import {Meta, StoryObj} from "@storybook/react";
import AddItemForm, {AddItemFormType} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, useState} from "react";
// import {IconButton} from "@material-ui/core";
// import {AddCircleOutline} from "@material-ui/icons";


const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button click',
            action: 'clicked'
        },
    },
};


export default meta;

type Story = StoryObj<typeof AddItemForm>;
action('Button click inside form');
export const AddItemFormErrorStory: Story = {};
//     FC<AddItemFormType> = (args) => {
//
//     const [title, setTitle] = useState<string>("")
//     const [error, setError] = useState<string | undefined>('Title is required')
//
//     const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
//         // error && setError(false)
//         setTitle((e.currentTarget.value))
//     }
//
//     const addTask = () =>{
//         const trimmedTitle = title.trim()
//         if(trimmedTitle){
//             args.addItem(trimmedTitle)
//         }else {
//             setError('Title is required')
//         }
//         setTitle('')
//     }
//
//
//     const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required</div>
//
//     const userMaxLength = title.length > 15 && <div style={{color: 'hotpink'}}>Task title is to long</div>
//
//      return <div>
//         <input
//             value={title}
//             placeholder='Please, enter title'
//             onChange={changeLocalTitle}
//             onKeyDown={() => {}}
//         />
//         <IconButton
//             onClick={addTask}
//             size='small'
//         >
//             <AddCircleOutline/>!!!
//         </IconButton>
//         {userMaxLength}
//         {userErrorMessage}
//     </div>
// }
//
