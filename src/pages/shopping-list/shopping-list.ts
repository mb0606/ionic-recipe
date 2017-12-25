import { Ingredient } from './../../models/ingredient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShoppingListService } from './../../services/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  list: Ingredient[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _shoppingListService: ShoppingListService) {
  }

  ionViewWillEnter(){
    this.loadItems();
    }

  onAddItem(form){
    console.log(form.value);
    this._shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
    console.log("list from service" ,this.list);
  }

  private loadItems(){
    this.list = this._shoppingListService.getItems();     
  }

  deleteItem(index: number){
    this._shoppingListService.removeItem(index);
    this.loadItems();    
  }

}
