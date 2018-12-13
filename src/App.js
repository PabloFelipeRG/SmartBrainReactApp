import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import './App.css';

//http://revistasaudeeestilo.com.br/wp-content/uploads/2018/04/harmoniafacial-1.jpg

const app = new Clarifai.App({
  apiKey: '4f4be64305674a3cb76ec2ebd4b08344'
});

const particlesOptions = {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "retina_detect": true
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    ).then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    }).catch(err => {
      console.log("YOU GOT AN ERROR:", err);
    });
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { route, imageUrl, box, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          />
        { route === 'signin' 
          ? <Signin onRouteChange={this.onRouteChange}/>
          : route === 'register'
          ? <Register onRouteChange={this.onRouteChange}/>
          : <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
