import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodosService } from '../../data-access/services/todos.service';
import { FilterEnum } from '../../data-access/types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  activeCount$!: Observable<number>; //to count amount of active todos
  isSomeCompleted$!: Observable<boolean>; //at least one todo completed
  noTodosClass$!: Observable<boolean>; //to toogle footer's visibility
  itemsLeftText$!: Observable<string>; // to check if it is plural or nothing = 0
  filter$!: Observable<FilterEnum>;

  filterEnum = FilterEnum;

  constructor(private todosService: TodosService) {

  }

  ngOnInit(): void {

    this.activeCount$ = this.todosService.todos$.pipe(map(todos => {
      return todos.filter(todo => !todo.isCompleted).length
    }));

    //at least one todo completed
    this.isSomeCompleted$ = this.todosService.todos$.pipe(map((todos) => todos.some(todo => todo.isCompleted)))

    this.itemsLeftText$ = this.activeCount$.pipe(map((activeCount: number) => {
      return `active item${activeCount !== 1 ? 's' : ''} left `
    }))

    // could have been passed to todosService instead of repeating 2nd time (like in main component)
    this.noTodosClass$ = this.todosService.todos$.pipe(map((todos => todos.length === 0)));
    this.filter$ = this.todosService.filter$;

  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    this.todosService.changeFilter(filterName);
    //to prevent reload
    event.preventDefault();
  }

  clearCompleted(): void {
    this.todosService.removeCompletedTodos();
  }

}
