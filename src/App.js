import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.langTags = ['python',
                    'angular',
                    'php',
                    'ruby',
                    'wordpress',
                    'css',
                    'docker',
                    'html',
                    'typescript',
                    'vue',
                    'javascript',
                    'react',
                    'redux',
                    'rxjs',
                    'node'];
    this.devvedBrandSeriesNames = ['Code Golf Series','Deep Dive Series', 'How To Series'];

    this.state = {
      mainTitle: 'Learn the Latest JavaScript Features in ECMAScript 2016-2018',
      bgImageUrl: 'https://packagecontrol.io/readmes/img/0638df31ab995ceb9302368b2700cfb012c22b7b.png',
      devvedBrandSeries: 'DeepDiveSeries',
      iconTags: []
    };
  }
  
  handleChange(event, targetName = event.target.name) {
    if(!targetName) throw new Error(`Input is required to have a "name" prop to mapToState`);

    switch (targetName) {
      case 'devvedBrandSeries':
        this.setState({[targetName]: event.target.value});
        break;
      case 'iconTags':
        if(event.target.checked) {
          this.setState({[targetName]: this.state.iconTags.concat(event.target.value).sort() });
        } else {
          const delItemIdx = this.state.iconTags.indexOf(event.target.value);
          this.setState({[targetName]: this.state.iconTags.filter((_, i) => i !== delItemIdx).sort() });
        }
        break;
      default:
        this.setState({[targetName]: event.target.value});
        break;
    }
  }

  onSaveImage() {
    console.log('save img...');
  }

  render() {
    return (
      <div className='App'>
        <div className="Header">
          <img src={logo} className="logo" alt='devved.net logo' />
          <h1>Video Intro &amp; Thumbnail Generator
            <small>exclusively for the devved.net blog</small>
          </h1>
        </div>

        <div className="GeneratorForm">
          
          <input type="text"
                 name="mainTitle"
                 onChange={evt => this.handleChange(evt)}
                 value={this.state.mainTitle} />
          
          <h3>Enter URL of background image</h3>
          <input type="text"
                 name="bgImageUrl"
                 onChange={evt => this.handleChange(evt)}
                 value={this.state.bgImageUrl} />


          <h3>Choose proper output format</h3>
          {['a', 'b'].map(format => (
            <div className="SelectOption" key={format}>{format}</div>
          ))}

          <h3>Choose the appropriate series</h3>
          {this.devvedBrandSeriesNames.map(seriesName => {
            const seriesNameProper = seriesName;
            seriesName = seriesName.replace(/\s/g, '');
            return <div className="SelectOption" key={seriesName}>
            <input name="devvedBrandSeries" 
              type="radio"
              value={seriesName}
              checked={this.state.devvedBrandSeries === seriesName}
              onChange={evt => this.handleChange(evt)} /> 
              {seriesNameProper}
            </div>
            })
          }

          <h3>Select all relevant tags</h3>
          {this.langTags.map(tag => (
            <div className="SelectOption" key={tag}>
            <input name="iconTags" 
              type="checkbox"
              value={tag}
              checked={this.state.iconTags.includes(tag)}
              onChange={evt => this.handleChange(evt)} /> 
              {tag}
            </div>
            ))
          }

          <button onClick={this.onSaveImage.bind(this)}>
            Save Image
          </button>
        </div>
  
        <br />

        <div className="MainContainer Preview">
          <div className="BgImage" 
               style={{backgroundImage: `url(${this.state.bgImageUrl})`}}></div>
          
          <div className="MainTitle">
            <h1><span>{this.state.mainTitle}</span></h1>
          </div>
          
          {this.state.iconTags.length > 0 && 
          <div className="IconTags">
            {this.state.iconTags.map((tag,i) => <div className={'Tag lang lang-' + tag} key={i}></div> )}
          </div>
          }

          <div className="DevvedBrand"
               style={{backgroundImage: `url(${logo})`}}></div>

          <div className={'DevvedBrandSeries ' + this.state.devvedBrandSeries}></div>
        </div>

      </div>
    );
  }
}

export default App;
