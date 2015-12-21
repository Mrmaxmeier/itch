'use strict'

let r = require('r-dom')
let mori = require('mori')
let PropTypes = require('react').PropTypes
let Component = require('./component')

let GameList = require('./game-list').GameList
let AppActions = require('../actions/app-actions')

class SearchContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: 'x-moon',
      game_ids: []
    } // FIXME: make searchcontent stateless?
  }
  componentWillReceiveProps(props) {
    // don't reset this.state FIXME: make searchcontent stateless
  }
  onInput(event) {
    let query = event.target.value
    this.setState({ query })
    AppActions.fetch_search(query) // TODO: debounce / throttle
  }
  render () {
    let caves = mori.get(this.props.state, 'caves')
    let search_games = mori.list()

    let games = mori.get(this.props.state, 'games')
    let all_games = mori.concat(mori.get(games, 'dashboard'), mori.get(games, 'owned'))
    let index_by = (acc, v) => mori.assoc(acc, mori.get(v, 'id'), true)
    let owned_games_by_id = mori.reduce(index_by, mori.hashMap(), all_games)
    let pred = () => true
    return r.div({className: 'main_content'}, [
      r.div({className: 'searchbox'}, [
        r.input({type: 'text', value: this.state.query, onChange: this.onInput.bind(this)})
      ]),
      r(GameList, {games: search_games, caves, pred, owned_games_by_id})
    ])
  }
}

SearchContent.propTypes = {
  state: PropTypes.any
}

module.exports = {SearchContent}
