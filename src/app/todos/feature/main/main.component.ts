import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { TodosService } from '../../data-access/services/todos.service';
import { FilterEnum } from '../../data-access/types/filter.enum';
import { TodoInterface } from '../../data-access/types/todo.interfaces';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  visibleTodos$!: Observable<TodoInterface[]>;
  noTodosClass$!: Observable<Boolean>;
  areAllTodosSelected$!: Observable<Boolean>;
  // editing id
  editingId: string | null = null;

  constructor(private todosService: TodosService) {

  }

  ngOnInit(): void {

    // check if all todos have completed as true
    this.areAllTodosSelected$ = this.todosService.todos$.pipe(
      map(todos => todos.every(todo => todo.isCompleted)));

    // check if at least one todo is in the list.
    this.noTodosClass$ = this.todosService.todos$.pipe(map((todos => todos.length === 0)));

    // filtering todos
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$
    ]).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
      console.log(todos, filter);
      if (filter === FilterEnum.active) {
        return todos.filter(todo => !todo.isCompleted)
      } else if (filter === FilterEnum.completed) {
        return todos.filter(todo => todo.isCompleted)
      }
      return todos;

    }));

  }

  toggleAllTodos(event: Event): void {
    // set all todos completed
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    //event emitter from the child component
    this.editingId = editingId;
  }

  setText(id: string, text: string): void {
    this.todosService.changeTodo(id, text);
  }

  toggleTodo(id: string): void {
    this.todosService.toggleTodo(id);
  }

  removeTodo(id: string): void {
    this.todosService.removeTodo(id);
  }

}
