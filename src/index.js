import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ObserveResizeDiv extends Component {
  static propTypes = {
    onResize: PropTypes.func,
  }
  static defaultProps = {
    onResize: ()=> {}
  }
  componentDidMount = () => {
    var targetNode = this.container;
    var originHeight = targetNode.clientHeight;
    var config = { attributes: true, childList: true, subtree: true };
    var callback = ()=> {
      let height = targetNode.clientHeight;
      if(height!==originHeight) {
        this.props.onResize && this.props.onResize({ type: 'resize', target: targetNode });
        originHeight = height;
      }
    };
    this.observer = new MutationObserver(callback);
    this.observer.observe(targetNode, config);
  }

  componentWillUnmount = () => {
    this.observer.disconnect();
  }
  render() {
    const { children, ...others } = this.props;
    return (
      <div ref={ref=> this.container=ref} {...others}>
        {
          children
        }
      </div>
    )
  }
}
