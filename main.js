import toDoStore from './src/store/task.store';
import { App } from './src/task-list/app.component'
import './style.css'

toDoStore.initStore();

App('#app');

