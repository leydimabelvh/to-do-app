let elementCounter;

/**
 * 
 * @param {String} elementId 
 * @param {Number} taskQuantity 
 * @returns 
 */
export const renderPendingTaskList = ( elementId, taskQuantity ) => {
    if ( !elementCounter ) 
    elementCounter = document.querySelector( elementId );

    if ( !elementCounter )
        throw new Error( `Element ${ elementId } not found.` );

    elementCounter.innerHTML = taskQuantity;
 }