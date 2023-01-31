import taskStore from '../store/task.store';
import htmlCode from './app.component.html?raw';
import { renderTaskList } from './use-cases';


const ElementIDs = {
    TaskListing: '.task-listing',
    NewTaskInput: '#new-task-input',
}

/**
 * Esta función genera la aplicación, lo que se quiere renderizar en pantalla.
 * @param {String} elementId  ID de un elemento
 */

export const App = ( elementId ) => {
    const displayTaskList = () => {
        const taskList = taskStore.getTaskList( taskStore.getCurrentFilter() );
        renderTaskList( ElementIDs.TaskListing, taskList );
    }


    // Cuando la función App() se llama.
    (() => {
        // document.querySelector(elementId).append(document.createElement('div').innerHTML = '<h2>Hola</h2>');
        const app = document.createElement('div');
        app.innerHTML = htmlCode;
        document.querySelector(elementId).append(app);
        displayTaskList();
    })();

    // Referencias HTML
    const newDescriptionInput =  document.querySelector( ElementIDs.NewTaskInput );
    const taskListUL = document.querySelector( ElementIDs.TaskListing );

    //Listeners
    newDescriptionInput.addEventListener( 'keyup', (event) => {
        if ( event.keyCode !== 13 ) return; 
        if ( event.target.value.trim().length === 0 ) return;

        taskStore.addTask( event.target.value );
        displayTaskList();
        event.target.value = '';
    } );

    taskListUL.addEventListener( 'click', (event) => {
        const parentElement = event.target.closest('[data-id]');
        taskStore.toggleTask( parentElement.getAttribute('data-id') );
        displayTaskList();
    } );
    
    // taskListUL.addEventListener( 'click', (event) => {
    //     if ( event.target.matches('.destroy') )  {
    //         const parentElement = event.target.closest('[data-id]');
    //         taskStore.deleteTask( parentElement.getAttribute('data-id') );
    //         displayTaskList();
    //     }
    //     return;
    // });

    taskListUL.addEventListener( 'click', (event) => {
        const isDestroy = event.target.matches('.destroy');
        const parentElement = event.target.closest('[data-id]');

        if ( !parentElement || !isDestroy )  return;

        taskStore.deleteTask( parentElement.getAttribute('data-id') );
        displayTaskList();  ;
    });

  




}