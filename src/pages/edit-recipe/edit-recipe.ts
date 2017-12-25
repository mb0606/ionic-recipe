import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = "New";
  
  constructor(public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    console.log(this.navParams.data.mode)
  }

}
