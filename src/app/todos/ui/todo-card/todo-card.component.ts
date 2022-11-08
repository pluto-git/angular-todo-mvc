import {
  Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, ɵisDefaultChangeDetectionStrategy
} from '@angular/core';
import { DumbComponent } from 'src/app/shared/classes/dumb-component.class';
import { TodoInterface } from '../../data-access/types/todo.interfaces';

@Component({
  selector: 'app-todos-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCardComponent extends DumbComponent implements OnInit, OnChanges {

  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;

  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()
  @Output('setEditedText') setEditedTextEvent: EventEmitter<string> = new EventEmitter();
  //toggle for completion
  @Output('toggleTodo') toggleTodoEvent: EventEmitter<'toggle'> = new EventEmitter();
  @Output('removeTodo') removeTodoEvent: EventEmitter<'remove'> = new EventEmitter();

  editingText = "";

  @ViewChild('textInput') textInput!: ElementRef;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        //to work after the rendering as the element is inside ng-container
        this.textInput.nativeElement.focus();
      }, 0)

      // //or simply like that if I was allowed to use changeDetection here
      // this.cd.detectChanges();
      // this.textInput.nativeElement.focus();
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.removeTodoEvent.emit('remove');
  }

  toggleTodo(): void {
    this.toggleTodoEvent.emit('toggle');
  }

  changeText(event: Event): void {
    //on ui
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.setEditingIdEvent.emit(null);
    this.setEditedTextEvent.emit(this.editingText);
  }



}
