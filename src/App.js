import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './App.css';
import Preview from './components/Preview';
import Header from './components/Header';

class App extends Component {
  constructor(props){
    super(props);

    this.langTags = [];
    this.devvedBrandSeriesNames = ['Code Golf Series','Deep Dive Series', 'How To Series'];
    this.targetPlatforms = ['Devved', 'YouTube'];

    this.state = {
      mainTitle: 'The Latest JavaScript Features in ECMAScript 2016, 2017, and 2018',
      mainTitleSlug: 'the-latest-javascript-features-in-ecmascript-2016-2017-and-2018.png',
      platform: 'Devved',
      bgImageUrl: 'https://packagecontrol.io/readmes/img/0638df31ab995ceb9302368b2700cfb012c22b7b.png',
      bgImageOpacity: 0.5,
      bgImageWrapperPosition: '0 0 0 0',
      bgImagePosition: '0 0',
      bgImageScale: '1.0',
      bgImageSkew: '0deg',
      bgImageRotate: '0deg',
      devvedBrandSeries: 'DeepDiveSeries',
      iconTags: ['javascript'],
    };
  }
  
  componentDidMount() {
    this.loadLangTags();
  }

  loadLangTags() {
    const css = `https://raw.githubusercontent.com/devvedNET/blog-assets/master/images/lang/devved-lang.css`;
    axios.get(css).then((res) => {
      const tags = res.data.match(/\.lang-\w*[-]?.*\b/g).map(tag => tag.replace('.lang-',''));
      this.langTags = tags;
      this.forceUpdate();
    });
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
      case 'mainTitle':
        this.setState({[targetName]: event.target.value});
        this.setState({mainTitleSlug: event.target.value
                       .replace(/\W+/g, ' ')
                       .split(' ')
                       .join('-')
                       .toLowerCase()
                       .trim() + '.png'});
        break;
      default:
        this.setState({[targetName]: event.target.value});
        break;
    }
  }

  handleCopy() {
    const copyToClipboard = (() => {
      let textField = document.createElement('textarea');
      textField.innerText = this.state.mainTitleSlug;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    })();
  }

  render() {
    return (
      <div className='App'>
        <Header />

        <div className="GeneratorForm">
          <input type="text"
                 name="mainTitle"
                 onChange={evt => this.handleChange(evt)}
                 value={this.state.mainTitle} />
          <div>
            <b>filename:</b> 
            <span style={{marginLeft: '10px'}}>{this.state.mainTitleSlug}</span>
            <button onClick={this.handleCopy.bind(this)}
              style={{marginLeft: '10px'}}>copy</button>
          </div>

          <h3>Background image</h3>
          <h4>Image URL</h4>
          <input type="text"
                 name="bgImageUrl"
                 onChange={evt => this.handleChange(evt)}
                 value={this.state.bgImageUrl} />

          <div className="OptionGroup">
            <div className="Set">
              <h4>Opacity</h4>
              <input type="text"
                    name="bgImageOpacity"
                    onChange={evt => this.handleChange(evt)}
                    value={this.state.bgImageOpacity} />
            </div>

            <div className="Set">
              <h4>Wrapper Position</h4>
              <input type="text"
                    name="bgImageWrapperPosition"
                    onChange={evt => this.handleChange(evt)}
                    value={this.state.bgImageWrapperPosition} />
            </div>

            <div className="Set">
              <h4>Background Position</h4>
              <input type="text"
                    name="bgImagePosition"
                    onChange={evt => this.handleChange(evt)}
                    value={this.state.bgImagePosition} />
            </div>

            <div className="Set">
              <h4>Scale</h4>
              <input type="text"
                    name="bgImageScale"
                    onChange={evt => this.handleChange(evt)}
                    value={this.state.bgImageScale} />
            </div>

            <div className="Set">
              <h4>Skew</h4>
              <input type="text"
                    name="bgImageSkew"
                    onChange={evt => this.handleChange(evt)}
                    value={this.state.bgImageSkew} />
            </div>

            <div className="Set">
              <h4>Rotate</h4>
              <input type="text"
                    name="bgImageRotate"
                    onChange={evt => this.handleChange(evt)}
                    value={this.state.bgImageRotate} />
            </div>
          </div>


          <h3>Design template based on target platform</h3>
          {this.targetPlatforms.map(platform => {
            return <div className="SelectOption" key={platform}>
            <input name="platform" 
              type="radio"
              value={platform}
              checked={this.state.platform === platform}
              onChange={evt => this.handleChange(evt)} /> 
              {platform}
            </div>
            })
          }

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

          <h3>Process images for production</h3>
          {this.state.platform === "Devved" && <span>
            <div className="ProcessingCode">
            cd ~/Desktop/devvedNET-root/blog-assets && convert featured-images/{this.state.mainTitleSlug} -trim featured-images/{this.state.mainTitleSlug.replace('.png', '-devved.png')} && convert featured-images/{this.state.mainTitleSlug.replace('.png', '-devved.png')} -resize 480 featured-images/{this.state.mainTitleSlug.replace('.png', '-thumbnail-devved.png')} && rm -rf featured-images/{this.state.mainTitleSlug} && rm -rf featured-images/{this.state.mainTitleSlug.replace('.png', '-devved.png')} && ruby ~/Desktop/devvedNET-root/tutorials/video-intro-screen/tinypng_image_optimize.rb "{this.state.mainTitleSlug.replace('.png', '-thumbnail-devved.png')}"
            </div>
          </span>
          }
          {this.state.platform === "YouTube" && <span>
            <div className="ProcessingCode">
            cd ~/Desktop/devvedNET-root/blog-assets && convert featured-images/{this.state.mainTitleSlug} -trim featured-images/{this.state.mainTitleSlug.replace('.png', '-devved-YouTube.png')} && rm -rf featured-images/{this.state.mainTitleSlug}
            </div>
          </span>
          }

          {/*  
          <button onClick={this.onSaveImage.bind(this)}>
            Save Image
          </button>
          */}
        </div>
  
        {/* Preview Generated Image */}
        <br />
        <Preview
          mainTitle={this.state.mainTitle}
          platform={this.state.platform}
          bgImageUrl={this.state.bgImageUrl}
          bgImageOpacity={this.state.bgImageOpacity}
          bgImageWrapperPosition={this.state.bgImageWrapperPosition}
          bgImagePosition={this.state.bgImagePosition}
          bgImageScale={this.state.bgImageScale}
          bgImageSkew={this.state.bgImageSkew}
          bgImageRotate={this.state.bgImageRotate}
          devvedBrandSeries={this.state.devvedBrandSeries}
          iconTags={this.state.iconTags}
          />
      </div>
    );
  }
}

export default App;