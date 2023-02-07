import { Task } from '../task-list/models/task.model';

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    taskList: [
        new Task('Terminar el maquetado de la página web.'),
        new Task('Implementar pruebas unitarias en el código de la web.'),
        new Task('Configurar el servidor para desplegar la web en linea.'),
        new Task('Comprar el dominio y el cifrado SSL para la página web.'),
        new Task('Generar reportes sobre métricas de rendimiento de la web.'),
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
    state.taskList = state.taskList.filter( task => !task.done );

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