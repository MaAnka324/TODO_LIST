import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';
import {useAppSelector} from "./state/store";
import {TasksType} from "./api/todolist-api";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app/app-reducer";
import {Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import TodoLists from "./TodoLists";


export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}

function AppWithRedux(): JSX.Element {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading'
                    && <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>}
            </AppBar>

            <Routes>
                <Route path={'/'} element={<TodoLists/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
            </Routes>

        </div>
    )
}

export default AppWithRedux;
