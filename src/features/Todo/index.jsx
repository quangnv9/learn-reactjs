import React, { useState } from 'react';
import TodoList from '../Todo/components/TodoList';

function TodoFeature() {

    const initCourses = [
        {
            id: 1,
            name: "ReactJS - F8",
            status: 'new'
        },
        {
            id: 2,
            name: "ReactJS - EasyFrontend",
            status: 'completed'
        },
        {
            id: 3,
            name: "Javascript - F8",
            status: 'new'
        },
        {
            id: 4,
            name: "HTML/CSS - F8",
            status: 'new'
        }
    ]

    const [courses, setCourses] = useState(initCourses)
    const [filteredStatus, setFilteredStatus] = useState('all')

    const handleCourseClick = (course, index) => {
        // clone current array to new one
        const newCourse = [...courses]

        newCourse[index] = {
            ...newCourse[index],
            status: newCourse[index].status === 'new' ? 'completed' : 'new'
        }

        setCourses(newCourse)
    }

    const handleShowAllClick = () => {
        setFilteredStatus('all')
    }
    const handleShowCompletedClick = () => {
        setFilteredStatus('completed')
    }
    const handleShowNewClick = () => {
        setFilteredStatus('new')
    }
    console.log('Re-render');

    const renderedCourses = courses.filter(course => filteredStatus === 'all' || filteredStatus === course.status)
    console.log(renderedCourses);

    return (
        <div>
            <h1>Todo</h1>
            <TodoList courses={renderedCourses} onCourseClick={handleCourseClick} />
            <button onClick={handleShowAllClick}>Show All</button>
            <button onClick={handleShowCompletedClick}>Show Completed</button>
            <button onClick={handleShowNewClick}>Show New</button>
        </div>
    );
}

export default TodoFeature;