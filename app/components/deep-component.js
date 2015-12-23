
let React = require('react')
let isEqual = require('underscore').isEqual

/**
 * These components require a deep comparison because they do not use
 * immutable storage
 *
 * cf. https://www.youtube.com/watch?v=I7IdS-PbEgI
 */
class DeepComponent extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps) ||
           !isEqual(this.state, nextState)
  }

}

module.exports = DeepComponent