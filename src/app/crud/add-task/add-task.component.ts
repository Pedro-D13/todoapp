import { Component, OnInit } from "@angular/core";
import { ToDoState } from "src/app/store/reducers";
import { Store } from "@ngrx/store";
import * as reducers from "../../store/reducers";
import * as actions from "../../store/actions";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent {
  addTodoForm = this.fb.group(<reducers.Todo>{
    id: null,
    title: null,
    content: null,
  });

  constructor(
    private store: Store<{ tdl: ToDoState }>,
    private fb: FormBuilder
  ) {}

  getTodoFormTitle() {
    return this.addTodoForm.get("title").value;
  }
  getTodoFormContent() {
    return this.addTodoForm.get("content").value;
  }

  addTask(): void {
    const addme: reducers.Todo = {
      id: new Date().getUTCMilliseconds().toString(),
      title: this.getTodoFormTitle(),
      content: this.getTodoFormContent(),
    };
    this.store.dispatch(actions.addTodo({ todo: addme }));
  }
}