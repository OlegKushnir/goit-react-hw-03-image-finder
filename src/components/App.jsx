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
    status: 'idle',
    page: 1,
    largeImg: null,
    error: null,
    loadMore: false,
  };

  setQuery = query => {
    this.setState({
      query: null,
      images: [],
      status: 'idle',
      page: 1,
      largeImg: null,
      error: null,
      loadMore: false,
    });
    this.setState({ query, status: 'pending' });
  };

  onLoadMore = async () => {
    await this.setState(pS => ({ page: pS.page + 1 }));
    this.fetchImages(this.state.query);
  };

  async fetchImages(searchQuery) {
    const key = '30339052-e4d079f5519c217cf05ffdccc';
    const per_page = 12;
    axios.defaults.baseURL = 'https://pixabay.com/';
    try {
      const result = await axios.get('api/', {
        params: {
          q: searchQuery,
          page: this.state.page,
          per_page,
          key,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      });
      const images = result.data.hits;

      result.data.totalHits - this.state.images.length > per_page
        ? this.setState({ loadMore: true })
        : this.setState({ loadMore: false });

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
  }

  openImage = id => {
    const { images } = this.state;
    const searchedImg = images.find(image => image.id === id);
    this.setState({ largeImg: searchedImg.largeImageURL });
  };

  closeImage = e => {
    if (e.target === e.currentTarget) this.setState({ largeImg: null });
  };

  closeOnEscape = () => {
    this.setState({ largeImg: null });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { images, query} = this.state;
    if (prevState.query !== query) {
      this.fetchImages(query);
    }

    if (
      prevState.images.length !== 0 &&
      images.length > prevState.images.length
    )
      window.scrollTo({
        top: snapshot - 144,
        behavior: 'smooth',
      });
  }

  getSnapshotBeforeUpdate() {
    return document.body.clientHeight;
  }
  render() {
    const { images, status, loadMore, largeImg } = this.state;
    return (
      <div className={css.app}>
        <SearchBar setQuery={this.setQuery} />
        {status === 'resolved' && (<ImageGallery images={images} openImage={this.openImage} /> )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>No images...</p>}
        {loadMore && <Button onLoadMore={this.onLoadMore} />}
        {largeImg && (
        <Modal largeImg={largeImg} closeImage={this.closeImage} closeOnEscape={this.closeOnEscape} /> )}
      </div>
    );
  }
}
