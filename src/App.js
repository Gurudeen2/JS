import React, {Component } from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium'
import Person from './Person/Person';

class App extends Component {

state = {
  persons:[
    {id: 'ak1', name:"Yusuf", age:20},
    {id: 'ak2', name:"Malik", age:22}
  ],
  showPersons: false
}

onchangeHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

  const person = {
    ...this.state.persons[personIndex]
  };

  person.name = event.target.value;

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState({persons:persons})
}

deletePersonHandler = (indexPerson) => {
  // const persons = this.state.persons.slice()
  const persons = [...this.state.persons]
  persons.splice(indexPerson, 1)
  this.setState({ persons: persons})

}

toggleButton = () =>{
  const doesShow = this.state.showPersons;
  this.setState({
    showPersons: !doesShow
  });

}

    render(){
      //style for the button
      const style = {
        backgroundColor: 'blue',
        color:'white',
        border: '1px solid white',
        padding: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        ':hover':{
          backgroundColor: 'lightgreen',
          color: 'black'
        }
      };
     
      let persons = null;

      if (this.state.showPersons) {
        persons = (
          <StyleRoot>
              <div>
              {
                this.state.persons.map((person, index) => {
                return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                change={(event) => {this.onchangeHandler(event, person.id)}}/>
              })}
          </div>
       </StyleRoot>
        );
        style.backgroundColor = 'red';
        style[':hover'] ={
          backgroundColor: 'salmon',
          color: 'white'
        }
      }

      const classes = [];
      if(this.state.persons.length <= 2){
        classes.push('red')
      }
      if(this.state.persons.length <= 1){
        classes.push('bold')
      }

    return (
      <div className="App">
       <h1>Hi, I'm a React App</h1>
       <p className={classes.join(' ')}>This is really working!</p>
       <button
       style={style}
       onClick={this.toggleButton}>Toggle Persons</button>
      {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}
export default Radium(App);