import {Meta, StoryObj} from "@storybook/react";
import {Task} from "./TasksList";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New,
            todoListId: "todolistId_1", startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        todoListId: 'fgdosrg8rgjuh'
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', status: TaskStatuses.Completed,
            todoListId: "todolistId_1", startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
    },
};
