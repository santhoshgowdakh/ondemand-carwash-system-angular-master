import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../shared/response-message';
import { Promocode } from './promocode';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  promocodeBaseUrl="http://localhost:8088/promocode/";
  constructor(private http:HttpClient) { }

  viewAllPromocodes():Observable<Promocode[]>{
    return this.http.get<Promocode[]>(this.promocodeBaseUrl+"list"); 
   }

  //  getPromocodeByPromocodeId(promocodeId:number):Observable<any>{
  //   return this.http.get<any>(this.promocodeBaseUrl+"id/"+promocodeId);
  //  }
   getPromocodeByPromocode(promocode:string):Observable<Promocode>{
    return this.http.get<Promocode>(this.promocodeBaseUrl+promocode);
   }
   addPromocode(promocode:Promocode):Observable<any>{
    return this.http.post<any>(this.promocodeBaseUrl,promocode);
   }
   updatePromocode(promocode:Promocode):Observable<any>{
    return this.http.put<any>(this.promocodeBaseUrl,promocode);
   }

   deletePromocodeByPromocode(promocode:string):Observable<string>{
    return this.http.delete<string>(this.promocodeBaseUrl+promocode);
   }
}
