import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Currency } from "../models/currency";
import { API_BASE_URL } from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { };
  
  public getCurrencies() {
    return this.http.get<Currency[]>(API_BASE_URL);
  };
};