import { Task } from "../models/task.model";

/**
 * 
 * @param {Task} task 
 */
export const createTaskHTML = ( task ) => {
    if ( !task ) throw new Error( 'A task object is required' );

    const { id, description, done } = task;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked': '' }>
            <label>${ description }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">    
        `;

    const liElement = document.createElement('li');

    liElement.innerHTML = html;
    liElement.setAttribute( 'data-id', id );

    if ( task.done ) liElement.classList.add('completed');

    return liElement;
}