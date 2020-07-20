import React from "react";
import "./App.css";
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from "./components/ingredientInventory/IngredientInventory";
import Register from "./components/register/register";
import { Route, Switch } from "react-router-dom";
import Journal from "./components/journal/journal";
import JournalView from "./components/journal/journalView";
import FoodPicturesAllPost from "./components/foodPictures/foodPicturesAllPost";
import FoodPicturesCreatePost from "./components/foodPictures/foodPicturesCreatePost";
import FoodPicturesMyPost from "./components/foodPictures/foodPicturesMyPost";
import FeaturedPostCarousel from "./components/foodPictures/featuredPostCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class App extends React.Component {
  render() {
    return (
      <div className={"App"}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={Register} />
          <Route path="/ingredientInventory" component={IngredientInventory} />
          <Route path="/recommendation" component={Recommendation} />
          <Route path="/journal" component={Journal} />
          <Route path="/journalView" component={JournalView} />
          <Route path="/foodPicNewPost" component={FoodPicturesCreatePost} />
          <Route path="/foodPicAllPost" component={FoodPicturesAllPost} />
          <Route path="/foodPicMyPost" component={FoodPicturesMyPost} />
          <Route path="/foodPicFeatured" component={FeaturedPostCarousel} />
        </Switch>
      </div>
    );
  }
}
export default App;
