import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList/index';

function PageDetail() {
    const initCourses = [
        {
            id: 1,
            name: 'ReactJS - F8',
            status: 'new',
        },
        {
            id: 2,
            name: 'ReactJS - EasyFrontend',
            status: 'completed',
        },
        {
            id: 3,
            name: 'Javascript - F8',
            status: 'new',
        },
        {
            id: 4,
            name: 'HTML/CSS - F8',
            status: 'new',
        },
    ];

    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [courses, setCourses] = useState(initCourses);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);

        return params.status || 'all';
    });

    const handleCourseClick = (course, index) => {
        // clone current array to new one
        const newCourse = [...courses];

        newCourse[index] = {
            ...newCourse[index],
            status: newCourse[index].status === 'new' ? 'completed' : 'new',
        };

        setCourses(newCourse);
    };

    useEffect(() => {
        const params = queryString.parse(location.search);

        setFilteredStatus(params.status || 'all');
    }, [location.search]);

    const handleShowAllClick = () => {
        // setFilteredStatus('all')
        const queryParams = { status: 'all' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };
    const handleShowCompletedClick = () => {
        // setFilteredStatus('completed')
        const queryParams = { status: 'completed' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };
    const handleShowNewClick = () => {
        // setFilteredStatus('new')
        const queryParams = { status: 'new' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };
    const renderedCourses = courses.filter((course) => filteredStatus === 'all' || filteredStatus === course.status);

    const handleTodoFormSubmit = (values) => {
        console.log('Values: ', values);
        const newCourse = {
            id: courses.length + 1,
            name: values.title,
            status: 'new',
        };
        const newCourses = [...courses, newCourse];
        setCourses(newCourses);
    };

    return (
        <div>
            <h1>What to do?</h1>
            <TodoForm onSubmit={handleTodoFormSubmit} />

            <h1>Todo</h1>
            <TodoList courses={renderedCourses} onCourseClick={handleCourseClick} />
            <button onClick={handleShowAllClick}>Show All</button>
            <button onClick={handleShowCompletedClick}>Show Completed</button>
            <button onClick={handleShowNewClick}>Show New</button>
        </div>
    );
}

export default PageDetail;
