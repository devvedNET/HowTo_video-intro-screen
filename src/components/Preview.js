import React, { Component } from 'react';
import logo from '../logo.png';
import './Preview.css';

class Preview extends Component {
  constructor(props){
    super(props);

    this.state = {
      mainTitle: 'Learn the Latest JavaScript Features in ECMAScript 2016-2018',
      bgImageUrl: 'https://packagecontrol.io/readmes/img/0638df31ab995ceb9302368b2700cfb012c22b7b.png',
      bgImageStyle: {},
      devvedBrandSeries: 'DeepDiveSeries',
      iconTags: []
    };
  }
  
  handleBgImageStyle() {
    let styles = {
        backgroundImage: `url(${this.props.bgImageUrl})`,
        backgroundPosition: `${this.props.bgImagePosition}`,
        transform: `scale(${this.props.bgImageScale}) skew(${this.props.bgImageSkew}) rotate(${this.props.bgImageRotate})`,
        opacity: `${this.props.bgImageOpacity}`
     };

    this.props.bgImageWrapperPosition.split(' ').forEach((prop, i) => {
        if (+prop === 0) return;
        switch (i) {
            case 0:
                return styles['top'] = `${prop}px`;
            case 1:
                return styles['right'] = `${prop}px`;
            case 2:
                return styles['bottom'] = `${prop}px`;
            case 3:
                return styles['left'] = `${prop}px`;
        }
    });

    return styles;
  }

  render() {
    return (
        <div className="MainContainer Preview">
          <div className="BgImage" 
               style={this.handleBgImageStyle()}></div>
          
          <div className="MainTitle">
            <h1><span dangerouslySetInnerHTML={{__html: this.props.mainTitle}} /></h1>
          </div>
          
          {(this.props.platform !== 'Devved' && (this.props.iconTags.length > 0)) && 
          <div className="IconTags">
            {this.props.iconTags.map((tag,i) => <div className={'Tag lang lang-' + tag} key={i}></div> )}
          </div>
          }

          {this.props.platform !== 'Devved' &&
            <div className="DevvedBrand"
                 style={{backgroundImage: `url(${logo})`}}></div>
          }
          
          <div className={'DevvedBrandSeries ' + this.props.devvedBrandSeries}></div>
        </div>
    );
  }
}

export default Preview;
