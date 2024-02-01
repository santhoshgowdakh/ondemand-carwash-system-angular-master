import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  
  planBaseUrl="http://localhost:8089/plan/";
  constructor(private http:HttpClient) { }

  addPlan(plan:Plan):Observable<any>{
    return this.http.post<any>(this.planBaseUrl,plan);
   }
   updatePlan(plan:Plan):Observable<Plan>{
    return this.http.put<any>(this.planBaseUrl,plan);
   }
  viewAllPlans():Observable<Plan[]>{
    return this.http.get<Plan[]>(this.planBaseUrl+"list"); 
   }

   viewAllPlansByCarType(carType:string):Observable<Plan[]>{
    return this.http.get<Plan[]>(this.planBaseUrl+"cartype/"+carType); 
   }
   getPlanByPlanId(planId:number):Observable<Plan>{
    return this.http.get<Plan>(this.planBaseUrl+planId);
   }

   deleteOrderByPlanId(planId:number):Observable<string>{
    return this.http.delete<string>(this.planBaseUrl+planId);
   }
}
