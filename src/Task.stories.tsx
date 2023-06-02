import {Meta, StoryObj} from "@storybook/react";
import {Task} from "./TasksList";



const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskExample: Story = {
    args: {
        task: {id: '1', isDone: true, title: 'CSS'},
        changeTaskStatus: () => alert('changeTaskStatus'),
        changeTaskTitle: () => alert('changeTaskTitle'),
        removeTask: () => alert('removeTask'),
        todoListId: 'todolistId1'
    },
};