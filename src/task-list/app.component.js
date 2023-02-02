import taskStore, { Filters } from '../store/task.store';
import htmlCode from './app.component.html?raw';
import { renderPendingTaskList, renderTaskList } from './use-cases';


const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TaskListing: '.task-listing',
    NewTaskInput: '#new-task-input',
    TaskFilterList: '.filters',
    PendingCount: "#pending-count",
}

/**
 * Esta función genera la aplicación, lo que se quiere renderizar en pantalla.
 * @param {String} elementId  ID de un elemento
 */

export const App = ( elementId ) => {

    const displayTaskList = () => {
        const taskList = taskStore.getTaskList( taskStore.getCurrentFilter() );
        renderTaskList( ElementIDs.TaskListing, taskList );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        const taskList = taskStore.getTaskList( Filters.Pending );      
        renderPendingTaskList( ElementIDs.PendingCount, taskList.length );
    };

    // Cuando la función App() se llama.
    (() => {
        const app = document.createElement('div');
        app.innerHTML = htmlCode;
        document.querySelector(elementId).append(app);
        displayTaskList();
    })();

    // Referencias HTML
    const newDescriptionInput =  document.querySelector( ElementIDs.NewTaskInput );
    const taskListUL = document.querySelector( ElementIDs.TaskListing );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
    const taskFilterListUL = document.querySelector( ElementIDs.TaskFilterList );

    //Listeners
    newDescriptionInput.addEventListener( 'keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return; 
        if ( event.target.value.trim().length === 0 ) return;

        taskStore.addTask( event.target.value );
        displayTaskList();
        event.target.value = '';
    } );

    taskListUL.addEventListener( 'click', ( event ) => {
        const parentElement = event.target.closest('[data-id]');
        taskStore.toggleTask( parentElement.getAttribute('data-id') );
        displayTaskList();
    } );

    taskListUL.addEventListener( 'click', ( event ) => {
        const isDestroy = event.target.matches('.destroy');
        const parentElement = event.target.closest('[data-id]');

        if ( !parentElement || !isDestroy )  return;

        taskStore.deleteTask( parentElement.getAttribute('data-id') );
        displayTaskList();  ;
    } );

    clearCompletedButton.addEventListener( 'click', ( event ) => {
        const isClearCompleted = event.target.matches( ElementIDs.ClearCompleted );
        if ( !isClearCompleted ) return;
        
        taskStore.deleteCompleted();
        displayTaskList();
    } );

    taskFilterListUL.addEventListener( 'click', ( event ) => {

        const isFilter = event.target.matches( '.filter' );
        const isSelected = event.target.matches( '.selected' );

        if ( !isFilter ) return;
        if ( isSelected ) return;

        const elementSelected = document.querySelector( '.selected' );
        elementSelected.classList.remove( 'selected' );
        
        const element = event.target;
        element.classList.add( 'selected' );

        const filter = element.innerText;

        switch (filter) {
            case 'Todos':
                taskStore.setSelectedFilter(Filters.All);
                break;
            case 'Pendientes':
                taskStore.setSelectedFilter(Filters.Pending);
                break;
            case 'Completados':
                taskStore.setSelectedFilter(Filters.Completed);
                break;        
            default:
                throw new Error( `Filter ${filter} is not valid.` );
        }

        displayTaskList();

    } );    

}