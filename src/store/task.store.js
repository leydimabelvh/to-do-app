import { Task } from '../task-list/models/task.model';

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    taskList: [
        new Task('Homework 1'),
        new Task('Homework 2'),
        new Task('Homework 3'),
        new Task('Homework 4'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('Init Store 😀');
}

const loadStore = () => {
    if ( !localStorage.getItem('state') ) return;

    const { taskList = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
   
    state.taskList = taskList;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify( state ) );
}

const getTaskList = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.All:
            return [...state.taskList];
        case Filters.Completed:
            return state.taskList.filter( task => task.done );
            case Filters.Pending:
            return state.taskList.filter( task => !task.done );
        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTask = ( description ) => {
    if ( !description ) throw new Error('Description is required.');

    state.taskList.push( new Task(description) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} taskId 
 */
const toggleTask = ( taskId ) => {
    state.taskList = state.taskList.map( task => {
        if ( task.id === taskId ) {
            task.done = !task.done;
        }
        return task;
    } );

    saveStateToLocalStorage()
}

/**
 * 
 * @param {String} taskId 
 */
const deleteTask = ( taskId ) => {
    state.taskList = state.taskList.filter( task => task.id != taskId );

    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.taskList = state.taskList.filter( task => task.done );

    saveStateToLocalStorage();
}    

/**
 * 
 * @param {Filters} newFilter 
 */
const setSelectedFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTask,
    deleteCompleted,
    deleteTask,
    getCurrentFilter,
    getTaskList,
    initStore,
    loadStore,
    saveStateToLocalStorage,
    setSelectedFilter,
    toggleTask,
}