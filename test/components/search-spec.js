
let test = require('zopf')
let mori = require('mori')
let proxyquire = require('proxyquire')
let sd = require('skin-deep')
let _ = require('underscore')

let electron = require('../stubs/electron')

let $ = require('react').createElement

test('search', t => {
  let search = proxyquire('../../app/components/search', electron)
  let SearchContent = search.SearchContent

  t.case('SearchContent', t => {
		let state = mori.toClj({
			search: {
				query: '',
				games: [],
				fetched_query: ''
			},
			games: [],
			caves: []
		})
    sd.shallowRender($(SearchContent, {state}))
  })
})
