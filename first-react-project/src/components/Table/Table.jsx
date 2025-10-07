import React, { useState, useEffect, useContext } from 'react';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableMUI from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TableColorPicker from '../Context/TableColorPicker';
import todo from '../../services/todo';



export default function Table({ listName }) {

    const { color } = useContext(TableColorPicker);

    const [list, setList] = useState([]);

    const handleItemDelete = async (id) => {
        try {
            console.log("Deleting:", id);

            await todo.delete(listName, id)
            setList(list.filter((item) => item.id !== id))
        } catch (err) {
            console.log(err)
        }
    };

    const handleItemCompleted = async (item) => {
        try {
            let response = await todo.patch(listName, item.id, { completed: !item.completed });
            setList(
                list.map((el) => {
                    if (el.id === item.id) el = response;
                    return el;
                }));

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            let response = await todo.get(listName);
            setList(response.slice(0, 10))
        })()

    }, [])



    return (
        Array.isArray(list) && list.length ? (
            <TableContainer component={Paper}>
                <TableMUI sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>User Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.userId}</TableCell>
                                <TableCell >{item.title}</TableCell>
                                <TableCell>
                                    <Checkbox checked={item.completed} onChange={() => handleItemCompleted(item)} />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleItemDelete(item.id)}
                                        edge="end"
                                        aria-label="delete"
                                        style={{ color: color }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </TableMUI>
            </TableContainer>
        )
            : null
    )
}
