import { Task } from "../models/task.model";
import { createTaskHTML } from "./";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Task} taskList 
 */
export const renderTaskList = ( elementId, taskList = [] ) => {

    if ( !element ) 
        element = document.querySelector( elementId );

    if ( !element )
        throw new Error( `Element ${ elementId } not found.`  )
    
    element.innerHTML = '';

    taskList.forEach( task => {
        element.append( createTaskHTML(task) );
    });

    console.log(element,taskList);
}