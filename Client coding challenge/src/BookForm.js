import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form>
                <label htmlFor="bookName">
                    Name:
                </label>
                <input type="text" name="bookName" id="bookName"/>
                <button type="submit">
                    Find
                </button>
            </form>
        </div>
    );
}

export default BookForm;