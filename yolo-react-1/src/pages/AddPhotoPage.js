import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Dropzone from 'react-dropzone';
import request from 'superagent';
import PhotoApi from '../api/PhotoAPI'


const CLOUDINARY_UPLOAD_PRESET = 'Main Preset';
const CLOUDINARY_UPLOAD_URL = `${process.env.REACT_APP_CLOUDINARY_URL}`

export default class AddPhotoPage extends Component {
  state = {
    uploadedFile: null,
    uploadedFileCloudinaryUrl: ''
    };
  
// THIS IS THE FIRST CALL
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }
// SECOND CALL
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }
// 3RD CALL on SUBMIT
  handleFormSubmit = (event) => {
    event.preventDefault();
    const imageData = {
      description: event.target.elements[1].value,
      category: event.target.elements[2].value,
      client: event.target.elements[3].value,
      caption: event.target.elements[4].value,
      date: event.target.elements[5].value,
      src: this.state.uploadedFileCloudinaryUrl
  }
   PhotoApi.sendPhotosToAPI(imageData)
}

  render() {
    console.log(this.state.uploadedFileCloudinaryUrl)
    return (
      <Form onSubmit={this.handleFormSubmit.bind(this)}>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>
        <FormGroup>
          <Label for="exampleDescription">Description</Label>
          <Input type="description" name="description" id="exampleDescription" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleCategory">Category</Label>
          <Input type="category" name="category" id="exampleCategory" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleClient">Client</Label>
          <Input type="client" name="client" id="exampleClient" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleCaption">Caption</Label>
          <Input type="caption" name="caption" id="exampleCaption" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input type="date" name="date" id="exampleDate" />
        </FormGroup>
        <Button> Submit </Button>


        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </Form>
    )
  }
}

