
import { Component, OnInit, ViewChild  } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { TaskService } from 'src/app/services/task.service';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  dueDate!: string;
  description!: string;
  result: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  isModalOpen = false;
  idTaskUpdated! : number;

  constructor(
    private taskService: TaskService,
    private loadingCtrl: LoadingController
  ) {}
 
  ngOnInit() {
    this.loadTasks();
  }
 
  async loadTasks(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
 
    this.taskService.getTasks(this.currentPage).subscribe(
      (res) => {
        loading.dismiss();
        this.result.push(...res.data);
 
        event?.target.complete();
        if (event) {
          event.target.disabled = res.id === this.currentPage;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  message = '';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(): void {
    if (this.dueDate && this.description) {
      const formData = {
        dueDate: this.dueDate,
        description: this.description,
      };
  
      this.taskService.postTask(formData).subscribe(
        (response) => {
          this.modal.dismiss();
          this.result.push(response); 
        },
        (error) => {
          console.error('E:', error);
        }
      );
    } else {
      console.error('Please fill all the fields');
    }
  }
  
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        console.log('Task deleted successfully!', taskId);
  
        // Remover a tarefa da lista pelo ID
        this.result = this.result.filter((task) => task.id !== taskId);
      },
      (error) => {
        console.error('There was an error deleting the task:', error);
      }
    );
  }

  updateTask(taskId: number): void{
   if (this.dueDate && this.description) {
      const formData = {
        dueDate: this.dueDate,
        description: this.description,
      };
  
      this.taskService.updateTask(taskId, formData).subscribe(
        (response) => {
          console.log('Tarefa criada com sucesso!', response);
          this.modal.dismiss();
          this.result.push(response); 
        },
        (error) => {
          console.error('Erro ao criar a tarefa:', error);
        }
      );
    } else {
      console.error('Por favor, preencha todos os campos.');
    }
  }
  

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
 
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadTasks(event);
  }
}
