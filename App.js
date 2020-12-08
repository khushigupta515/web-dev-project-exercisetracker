import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

//importing different components
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//react router
//the different components of our react app are created,unlike html react makes use of components
function App() {
  return (
    <Router>
      
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
