
import React, { Component } from 'react';
import PhotoAPI from '../../api/PhotoAPI';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';
import './MapImage.css';


class MapImage extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
    photos: [] };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }


  componentDidMount(){
    PhotoAPI.fetchPhotos()
      .then((apiResponseJSON) => {
        this.setState({
          photos: apiResponseJSON
        })
      }
    )
  }



  render() {
    console.log(this.state.photos)
    return (
      <div>
        <h1> Headshots By Han </h1>
        {/* <h2> {this.createMapImages()}  </h2> */}
       <Gallery photos={this.state.photos} onClick={this.openLightbox}/>
       <Lightbox images={this.state.photos}
          onClose={this.closeLightbox.bind(this)}
          onClickPrev={this.gotoPrevious.bind(this)}
          onClickNext={this.gotoNext.bind(this)}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
        )

  }

}


export default MapImage
// render(<MapImage />, document.getElementById('app'));