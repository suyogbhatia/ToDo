//For Completed ToDos
import { Component, OnInit, Input } from '@angular/core';
import { AddTodoComponent } from '../add-todo.component';
import ToDo from 'src/app/todo.model';
import { Store, select, Action } from '@ngrx/store';
import { ToDoState } from '../todo.state';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  @Input() completedTasks: ToDo[];
  ToDoList = [];
  ToDoState$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  cname = 'Angular';
  
  constructor(private store: Store<ToDoState>) { }
  

  ngOnInit() {
    // this.ToDoState$ = this.store.pipe(select('todos'));
    // this.ToDoSubscription = this.ToDoState$.pipe(map(x => this.ToDoList = x.ToDoList)).subscribe();
    this.store.pipe(select('todos'))
      .subscribe( data => {
        this.ToDoList = data.ToDoList;
      });
  }

}
