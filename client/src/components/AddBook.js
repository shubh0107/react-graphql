import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }

        // this.resetState.bind(this);
    }

    displayAuthors() {
        var data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (
                <option disabled>Loading authors...</option>
            );
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            })
        }
    }

    resetState() {
        this.setState({
            name: '',
            genre: '',
            authorId: ''
        });
    }


    submitForm(e) {
        e.preventDefault();
        if (this.state.name !== '' && this.state.genre !== '' && this.state.authorId !== '') {
            this.props.addBookMutation({
                variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                },
                refetchQueries: [{ query: getBooksQuery }]
            });
            this.resetState();
        }
    }

    render() {
        return (
            <div>
                <form id="add-book" onSubmit={this.submitForm.bind(this)}>

                    <div className="field">
                        <label>Book Name:</label>
                        <input type="text" placeholder="Enter book name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>

                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" placeholder="Enter genre" value={this.state.genre} onChange={(e) => this.setState({ genre: e.target.value })} />
                    </div>

                    <div className="field">
                        <label>Author:</label>
                        <select onChange={(e) => this.setState({ authorId: e.target.value })} value={this.state.authorId}>
                            <option disabled value="">Select Author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>


                    <button>
                        +
                    </button>

                </form>
            </div>
        )
    }
}


export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

