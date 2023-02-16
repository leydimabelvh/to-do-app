(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();let y;const S=new Uint8Array(16);function v(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(S)}const o=[];for(let e=0;e<256;++e)o.push((e+256).toString(16).slice(1));function E(e,t=0){return(o[e[t+0]]+o[e[t+1]]+o[e[t+2]]+o[e[t+3]]+"-"+o[e[t+4]]+o[e[t+5]]+"-"+o[e[t+6]]+o[e[t+7]]+"-"+o[e[t+8]]+o[e[t+9]]+"-"+o[e[t+10]]+o[e[t+11]]+o[e[t+12]]+o[e[t+13]]+o[e[t+14]]+o[e[t+15]]).toLowerCase()}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:A};function P(e,t,a){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const l=e.random||(e.rng||v)();if(l[6]=l[6]&15|64,l[8]=l[8]&63|128,t){a=a||0;for(let n=0;n<16;++n)t[a+n]=l[n];return t}return E(l)}class m{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const d={All:"All",Completed:"Completed",Pending:"Pending"},i={taskList:[new m("Terminar el maquetado de la página web."),new m("Implementar pruebas unitarias en el código de la web."),new m("Configurar el servidor para desplegar la web en linea."),new m("Comprar el dominio y el cifrado SSL para la página web."),new m("Generar reportes sobre métricas de rendimiento de la web.")],filter:d.All},F=()=>{C(),console.log("Init Store 😀")},C=()=>{if(!localStorage.getItem("state"))return;const{taskList:e=[],filter:t=d.All}=JSON.parse(localStorage.getItem("state"));i.taskList=e,i.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(i))},I=(e=d.All)=>{switch(e){case d.All:return[...i.taskList];case d.Completed:return i.taskList.filter(t=>t.done);case d.Pending:return i.taskList.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},U=e=>{if(!e)throw new Error("Description is required.");i.taskList.push(new m(e)),g()},q=e=>{i.taskList=i.taskList.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},x=e=>{i.taskList=i.taskList.filter(t=>t.id!=e),g()},D=()=>{i.taskList=i.taskList.filter(e=>!e.done),g()},M=(e=d.All)=>{i.filter=e,g()},H=()=>i.filter,c={addTask:U,deleteCompleted:D,deleteTask:x,getCurrentFilter:H,getTaskList:I,initStore:F,loadStore:C,saveStateToLocalStorage:g,setSelectedFilter:M,toggleTask:q},N=`<section class="task-app">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-task-input" class="new-task" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
\r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="task-listing">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="task-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filter" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="selected filter" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filter" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,O=e=>{if(!e)throw new Error("A task object is required");const{id:t,description:a,done:l}=e,n=`
        <div class="view">
            <input class="toggle" type="checkbox" ${l?"checked":""}>
            <label>${a}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">    
        `,s=document.createElement("li");return s.innerHTML=n,s.setAttribute("data-id",t),e.done&&s.classList.add("completed"),s};let L;const V=(e,t)=>{if(L||(L=document.querySelector(e)),!L)throw new Error(`Element ${e} not found.`);L.innerHTML=t};let f;const R=(e,t=[])=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Element ${e} not found.`);f.innerHTML="",t.forEach(a=>{f.append(O(a))})},u={ClearCompleted:".clear-completed",TaskListing:".task-listing",NewTaskInput:"#new-task-input",TaskFilterList:".filters",PendingCount:"#pending-count"},$=e=>{const t=()=>{const r=c.getTaskList(c.getCurrentFilter());R(u.TaskListing,r),a()},a=()=>{const r=c.getTaskList(d.Pending);V(u.PendingCount,r.length)};(()=>{const r=document.createElement("div");r.innerHTML=N,document.querySelector(e).append(r),t()})();const l=document.querySelector(u.NewTaskInput),n=document.querySelector(u.TaskListing),s=document.querySelector(u.ClearCompleted),h=document.querySelector(u.TaskFilterList);l.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTask(r.target.value),t(),r.target.value="")}),n.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTask(p.getAttribute("data-id")),t()}),n.addEventListener("click",r=>{const p=r.target.matches(".destroy"),k=r.target.closest("[data-id]");!k||!p||(c.deleteTask(k.getAttribute("data-id")),t())}),s.addEventListener("click",r=>{r.target.matches(u.ClearCompleted)&&(c.deleteCompleted(),t())}),h.addEventListener("click",r=>{const p=r.target.matches(".filter"),k=r.target.matches(".selected");if(!p||k)return;document.querySelector(".selected").classList.remove("selected");const w=r.target;w.classList.add("selected");const b=w.innerText;switch(b){case"Todos":c.setSelectedFilter(d.All);break;case"Pendientes":c.setSelectedFilter(d.Pending);break;case"Completados":c.setSelectedFilter(d.Completed);break;default:throw new Error(`Filter ${b} is not valid.`)}t()})};c.initStore();$("#app");
