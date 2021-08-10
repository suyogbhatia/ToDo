//ToDo Tab

import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { ToDoState } from './todo.state';
import { CREATE_TODO, GET_TODO, DoneToDo } from './todo.action';
import ActionWithPayload from '../ActionWithPayload';
import ToDo from '../todo.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompletedComponent } from './completed/completed.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  name;
  @ViewChild(CompletedComponent, { static: true }) child;
  constructor(private store: Store<ToDoState>) { }

  title: string;
  date: Date;
  ToDoState$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  Title: string;
  Completed = false;
  ToDoList: ToDo[];
  completed: ToDo[] = [];

  ngOnInit() {
    this.ToDoState$ = this.store.pipe(select('todos'));

    let getToDoAction: Action = {
      type: GET_TODO
    }

    this.ToDoSubscription = this.ToDoState$.pipe(map(x => this.ToDoList = x.ToDoList)).subscribe();
    this.store.dispatch(getToDoAction);
  }

  createToDo(data) {
    console.log(data);
    console.log(this.ToDoList);
    let todoAction: ActionWithPayload<ToDo> = {
      type: CREATE_TODO,
      payload: { title: data.value.title, date: data.value.date, isCompleted: this.Completed }
    }
    this.store.dispatch(todoAction);
    data.resetForm()
  }

  taskDone(task) {
    console.log(task);
    // this.completed.push(task);
    this.store.dispatch(new DoneToDo(task));
  }

  ngOnDestroy() {
    this.ToDoSubscription.unsubscribe();
  }
}
