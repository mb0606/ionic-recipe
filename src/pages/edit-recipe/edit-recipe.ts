import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray  } from '@angular/forms';
import { ActionSheetController, AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;
  
  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtl: ToastController) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    console.log(this.navParams.data.mode);
    this.initForm();
  }
  onSubmit(){
    console.log(this.recipeForm)
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Delete All',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0){
              for(let i = len-1; i >= 0; i--){
                fArray.removeAt(i);
              }
              // create toast
              const toast = this.toastCtl.create({
                message: 'All items deleted!', 
                duration: 1000,
                position: 'bottom'
              });
              // call present toast to display
              toast.present();
              }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present();
  }
private createNewIngredientAlert(){
  return this.alertCtrl.create({
    title: 'Add Ingredient',
    inputs:[
      {name: 'name', placeholder: 'Name'},
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data => {
          if (data.name.trim() == '' || data.name == null){
            // create toast
            const toast = this.toastCtl.create({
              message: 'Please enter a valid value!', 
              duration: 1000,
              position: 'bottom'
            });
            // call present toast to display
            toast.present();
            return;
          }
          (<FormArray>this.recipeForm.get('ingredients'))
            .push(new FormControl(data.name, Validators.required))
              // create toast
              const toast = this.toastCtl.create({
                message: 'Item added!', 
                duration: 1000,
                position: 'bottom'
              });
              // call present toast to display
              toast.present();
        }
      }
    ]
  })
}

  private initForm(){
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl("Medium", Validators.required),
      'ingredients': new FormArray([])
    })
  }

}
