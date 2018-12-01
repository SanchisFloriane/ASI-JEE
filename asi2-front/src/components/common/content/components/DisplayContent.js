import React, { Component } from 'react';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let render_visual;
    switch(this.props.type){
      case "img_url":
        render_visual=(
          <img
            width="100%"
            height="auto"
            src={this.props.src}
          />
        )
        break;
      case "img":
        render_visual=(
          <img
            width="100%"
            height="auto"
            src={this.props.src}
          />
        )
        break;
      case "video":
        render_visual=(
          <object
            width="100%"
            height="100%"
            data={this.props.src}
          />
        )
        break;
      case "web":
        render_visual=(
          <iframe
            height="100%"
            width="100%"
            src={this.props.src}
          />
        )
        break;

    }
    return (
      <div>
        {render_visual}
      </div>
    );
  }
}

export default DisplayComponent;
