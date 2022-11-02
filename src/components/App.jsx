import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import axios from 'axios';
import css from './App.module.css';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: null,
    images: [],
    page: 1,
    largeImageURL: null,
    error: null,
    status: 'idle',
  };

  setQuery = query => {
    this.setState({ query, images: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState(pS => ({ page: pS.page + 1 }));
  };

  async fetchImages(searchQuery, page) {
    this.setState({ status: 'pending' });
    const key = '30339052-e4d079f5519c217cf05ffdccc';
    const per_page = 12;
    axios.defaults.baseURL = 'https://pixabay.com/';
    try {
      const result = await axios.get('api/', {
        params: {
          q: searchQuery,
          page,
          per_page,
          key,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      });
      const images = result.data.hits;
      images.length > 0
        ? this.setState(pS => ({
            images: [...pS.images, ...images],
            status: 'resolved',
          }))
        : this.setState({ status: 'rejected' });
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
      throw new Error();
    } 
    // finally {
    //   this.setState({ status: 'resolved' });
    // }
  }

  openImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeImage = e => {
    if (e.target === e.currentTarget) this.setState({ largeImageURL: null });
  };

  closeOnEscape = () => {
    this.setState({ largeImageURL: null });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { images, query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
    if (
      prevState.images.length !== 0 &&
      images.length > prevState.images.length
    )
      window.scrollTo({
        top: snapshot -260,
        behavior: 'smooth',
      });
  }

  getSnapshotBeforeUpdate() {
    return document.body.clientHeight;
  }
  render() {
    const { images, status, largeImageURL } = this.state;
    return (
      <div className={css.app}>
        <SearchBar setQuery={this.setQuery} />
        <ImageGallery images={images} openImage={this.openImage} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p className={css.noImage}>No images...</p>}
        {status === 'resolved' && <Button onLoadMore={this.onLoadMore} />}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            closeImage={this.closeImage}
            closeOnEscape={this.closeOnEscape}
          />
        )}
      </div>
    );
  }
}
