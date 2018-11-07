import React, { Component } from 'react';
import PhotoAPI from '../../api/PhotoAPI';
import Gallery from 'react-photo-gallery'



class MapImage extends Component {
  state = {
    photos : []
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
       <Gallery photos={this.state.photos} />
      </div>
        )

  }

}

export default MapImage