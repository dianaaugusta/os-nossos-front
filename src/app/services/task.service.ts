import { HttpClient,  } from '@angular/common/http';
import { Injectable, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { options } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


export interface ApiResult {
  data: any;
  id: number;
  description: string;
  dueDate: Date;
}
 
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private http: HttpClient) {}
 
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}`
    );
  }

  postTask(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<ApiResult>(
      `${environment.baseUrl}/${id}`
    );
  }

  updateTask(taskId: number, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/${taskId}`, data);
  }

}