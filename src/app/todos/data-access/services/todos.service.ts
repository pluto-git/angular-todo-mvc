import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  // our todos
  private _todos$ = new BehaviorSubject<TodoInterface[]>([]);
  todos$ = this._todos$.asObservable();

  // for MainTodosComponent
  private _filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  filter$ = this._filter$.asObservable();

  constructor() { }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Date.now() + "" + Math.random()
    }

    this._todos$.pipe(take(1)).subscribe((todos: TodoInterface[]) => {
      this._todos$.next([...todos, newTodo]);
    });

    //or like that - in a more imperative way:
    // const updatedTodos = [...this._todos$.getValue(), newTodo];
    // this._todos$.next(updatedTodos);

  }

  toggleAll(isCompleted: boolean): void {

    this._todos$.pipe(take(1)).subscribe((todos: TodoInterface[]) => {

      const updatedTodos = todos.map((todo: TodoInterface) => {
        return { ...todo, isCompleted: isCompleted }
      })

      this._todos$.next(updatedTodos);
    });

  }

  changeFilter(filterName: FilterEnum): void {
    this._filter$.next(filterName);
  }

  changeTodo(id: string, text: string): void {

    this._todos$.pipe(take(1)).subscribe((todos: TodoInterface[]) => {

      const updatedTodos = todos.map((todo: TodoInterface) => {
        if (todo.id === id) {
          return {
            ...todo,
            text
          }
        }
        return todo

      })

      this._todos$.next(updatedTodos);
    });

  }

  removeTodo(id: string): void {
    this._todos$.pipe(take(1)).subscribe((todos: TodoInterface[]) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      this._todos$.next(updatedTodos);
    });
  }

  removeCompletedTodos(): void{
    this._todos$.pipe(take(1)).subscribe((todos: TodoInterface[]) => {
      const updatedTodos = todos.filter(todo => !todo.isCompleted);
      this._todos$.next(updatedTodos);
    });
  }

  toggleTodo(id: string): void {
    this._todos$.pipe(take(1)).subscribe((todos: TodoInterface[]) => {

      const updatedTodos = todos.map((todo: TodoInterface) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted}
        }
        return todo
      })

      this._todos$.next(updatedTodos);
    });

  }





}
