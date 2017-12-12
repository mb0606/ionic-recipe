import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShoppingListService } from './../../services/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  list:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _shoppingListService: ShoppingListService) {
  }

  onAddItem(form){
    console.log(form.value);
    this._shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    this.list = this._shoppingListService.getItems()
    console.log("list from service" ,this.list);
  }

}
