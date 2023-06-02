import {Meta, StoryObj} from "@storybook/react";
import AddItemForm from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, useState} from "react";
import {IconButton} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";


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


export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button click inside form')
    },
};

export const AddItemFormErrorStory: Story = {

    render: (args => <div>
        <input
            value={''}
            placeholder='Please, enter title'
            onChange={() => {}}
            onKeyDown={() => {}}
        />
        <IconButton
            onClick={args.addItem}
            size='small'
        >
            <AddCircleOutline/>
        </IconButton>
        {/*{userMaxLength}*/}
        {/*{userErrorMessage}*/}
    </div> )
}

