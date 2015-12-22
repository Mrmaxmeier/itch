'use strict'

let r = require('r-dom')
let mori = require('mori')
let PropTypes = require('react').PropTypes
let Component = require('./component')

let GameList = require('./game-list').GameList
let AppActions = require('../actions/app-actions')

class SearchContent extends Component {
  constructor (props) {
    super(props)
    AppActions.fetch_search(mori.getIn(props.state, ['search', 'query']))
  }
  onInput (event) {
    let query = event.target.value
    AppActions.search_query_change(query)
    AppActions.fetch_search(query)
  }
  render () {
    let state = this.props.state
    let caves = mori.get(state, 'caves')

    let games = mori.get(state, 'games')
    let all_games = mori.concat(mori.get(games, 'dashboard'), mori.get(games, 'owned'))
    let index_by = (acc, v) => mori.assoc(acc, mori.get(v, 'id'), true)
    let owned_games_by_id = mori.reduce(index_by, mori.hashMap(), all_games)

    let query = mori.getIn(state, ['search', 'query'])
    let search_games = mori.getIn(state, ['search', 'games'])
    let loading = query !== mori.getIn(state, ['search', 'fetched_query'])
    let empty = query === ''

    return r.div({className: 'main_content'}, [
      r.div({className: 'searchbox'}, [
        r.input({type: 'text', value: query, placeholder: 'Search...', onChange: this.onInput.bind(this)})
      ]),
      r.div({}, [
        r.div({classSet: {dimmer: true, active: loading && !empty}, style: {transition: 'all 0.2s'}}),
        r(GameList, {games: search_games, caves, owned_games_by_id})
      ])
    ])
  }
}

SearchContent.propTypes = {
  state: PropTypes.any
}

module.exports = {SearchContent}
