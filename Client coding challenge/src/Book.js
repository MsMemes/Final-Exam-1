import React from 'react';

function Book( props ){
    return(
        <div>
            <div id="titleBook">
                {props.appProp.volumeInfo.title}
            </div>
            <div id="author">
                {props.appProp.volumeInfo.authors[0]}
            </div>
            <div id="thumbnail">
                {props.appProp.selfLink}
            </div>
            <div id="TextSnippet">
                {props.appProp.selfLink}
            </div>
        </div>
    );
}

export default Book;