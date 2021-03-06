'use strict'

let r = require('r-dom')
let React = require('react')
let PropTypes = React.PropTypes
let Component = require('./component')

/**
 * An icon from the icomoon font.
 * Peek in the static/fonts/icomoon/ folder to learn more.
 */
class Icon extends Component {
  render () {
    let icon = this.props.icon
    let spin = !!this.props.spin

    if (icon) {
      return r.span({
        className: `icon icon-${icon}`,
        classSet: {spin}
      })
    } else {
      return r.span()
    }
  }
}

Icon.propTypes = {
  icon: PropTypes.string
}

let task_to_icon = {
  'error': 'heart-broken',
  'find-upload': 'stopwatch',
  'download': 'download',
  'download-queued': 'hand-paper-o',
  'install': 'file-zip',
  'configure': 'settings',
  'launch': 'fire',
  'idle': 'checkmark'
}

/**
 * An icon that represents the state of a given task
 */
class TaskIcon extends Component {
  render () {
    let task = this.props.task || ''
    let spin = !!this.props.spin
    let icon = task_to_icon[task] || ''
    if (spin) {
      icon = 'upload-to-cloud'
    }

    return r(Icon, {icon, spin})
  }
}

TaskIcon.propTypes = {
  task: PropTypes.string
}

/**
 * A single progress bar, with an outer and inner div. Style as you wish.
 */
class ProgressBar extends Component {
  render () {
    let progress = this.props.progress
    if (!progress) return r.div()

    let style = {
      width: `${progress * 100}%`
    }

    return (
      r.div({className: 'progress_outer'}, [
        r.div({className: 'progress_inner', style})
      ])
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number
}

/**
 * A bunch of errors displayed in a list
 */
class ErrorList extends React.Component {
  render () {
    let errors = this.props.errors
    let before = this.props.before || ''

    if (!errors) {
      return r.div()
    }

    if (!Array.isArray(errors)) {
      errors = [errors]
    }

    return r.ul({className: 'form_errors'}, errors.map((error, key) => {
      return r.li({key}, [
        before,
        error
      ])
    }))
  }
}

ErrorList.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

module.exports = {Icon, TaskIcon, ProgressBar, ErrorList}
