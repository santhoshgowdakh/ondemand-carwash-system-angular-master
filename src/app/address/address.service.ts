import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addressBaseUrl="http://localhost:8090/address/";
  constructor(private http:HttpClient) { }

  viewAllAddresss():Observable<Address[]>{
    return this.http.get<Address[]>(this.addressBaseUrl+"list"); 
   }
   viewAllUserAddresss(userId:number):Observable<Address[]>{
    return this.http.get<Address[]>(this.addressBaseUrl+"list/"+userId); 
   }

   getAddressByAddressId(addressId:number):Observable<any>{
    return this.http.get<any>(this.addressBaseUrl+addressId);
   }
   
   addAddress(address:Address):Observable<any>{
    return this.http.post<any>(this.addressBaseUrl+"addAddress/",address);
   }
   updateAddress(address:Address):Observable<any>{
    return this.http.put<any>(this.addressBaseUrl+"updateAddress/",address);
   }

   deleteAddressByAddressId(AddressId:number):Observable<string>{
    return this.http.delete<string>(this.addressBaseUrl+AddressId);
   }
}
