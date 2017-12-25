import { RecipeServices } from './../../services/recipes.service';
import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit { 

  recipes: Recipe[];

  constructor(public navCtrl: NavController,
              private recipesService: RecipeServices) {
  }

  ngOnInit(){
    this.recipes = this.recipesService.getRecipes();
    console.log("in on init")
  }
  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
    console.log("in on will enter ", this.recipes)
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
  onClickRecipe(recipe: Recipe){
    this.navCtrl.push(RecipePage, recipe)
  }

}
