import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';




class BookDetails extends Component {

    displayBookDetails() {
        var { book, loading } = this.props.data;
        if (loading) {
            return (
                <h2>Loading...</h2>
            )
        }
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    All books by this author:
                    <ul className="other-books">
                        {book.author.books.map(book => {
                            return (

                                <li key={book.id}>{book.name}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        } else {
            return (
                <h2>Selected a book to view details...</h2>
            )
        }
    }


    render() {
        return (

            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        )
    }
}



export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);