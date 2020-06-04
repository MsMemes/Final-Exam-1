import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      errorMesage : "",
      apiUrl : "https://www.googleapis.com/books/v1/volumes?q="
    }
  }

handleFind = ( event ) => {
  event.preventDefault();
  
  const bookName = event.currentTarget.bookName.value;
  console.log(bookName);

  const url = `${this.state.apiUrl}${bookName}`;

  const settings = {
    method : 'GET'
  }

  fetch(url, settings)
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        throw new Error( response.statusText);
      }
    })
    .then(responseJSON => {
      console.log('here');
      return( <Book appProp={responseJSON}/>);
    })
    .catch( err => {
      this.setState({
        errorMesage : err.message
      });
    });

}

  render(){
    return(
      <div>
        <form onSubmit={this.handleFind}>
                <label htmlFor="bookName">
                    Name:
                </label>
                <input type="text" name="bookName" id="bookName"/>
                <button type="submit">
                    Find
                </button>
            </form>
      </div>
    )
  }

}

export default App;
