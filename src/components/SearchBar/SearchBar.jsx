import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    value: '',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
   if(this.state.value === '') return;
    this.props.setQuery(this.state.value);
    this.setState({ value:'' });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormBtn}>
            <span className={css.searchFormBtnLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
