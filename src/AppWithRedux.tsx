import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "./state/store";
import {TasksType} from "./api/todolist-api";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app/app-reducer";
import {Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import TodoLists from "./TodoLists";
import {logOutTC, meTC} from "./features/auth-reducer";
import {CircularProgress} from "@mui/material";


export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}

function AppWithRedux(): JSX.Element {

    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }



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
                    {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
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
