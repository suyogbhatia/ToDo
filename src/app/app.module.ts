import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';

import { ToDoReducer } from './add-todo/todo.reducer';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { CompletedComponent } from './add-todo/completed/completed.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    CompletedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    StoreModule.forRoot({ todos: ToDoReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
