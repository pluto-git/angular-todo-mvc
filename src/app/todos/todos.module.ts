import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './feature/todos/todos.component';
import { HeaderComponent } from './feature/header/header.component';
import { TodosService } from './data-access/services/todos.service';
import { MainComponent } from './feature/main/main.component';
import { TodoCardComponent } from './ui/todo-card/todo-card.component';
import { FooterComponent } from './feature/footer/footer.component';


@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    TodoCardComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  exports: [
    TodosComponent
  ],
  providers: [TodosService]
})
export class TodosModule { }
