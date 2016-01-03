'use strict'

const _ = require('underscore')

let fs = require('fs')
let file = fs.readFileSync('./game-manifest.json')
let manifest = JSON.parse(file)
console.log(manifest)
console.log()

let os = require('./app/util/os')


function test_platform(s, platform) {
	platform = platform || os.itch_platform()
	return s.split("+").reduce((d, plat) => plat === platform || d, false)
}

function filter_items(profile) {
	let items = []
	profile.forEach((action) => {
		if (action.platform === undefined || test_platform(action.platform))
			items.push(action)
	})
	return items
}

function run_action(action) {
	let supported_actions = [
		"download",
		"extract",
		"bash",
		"execute"
	]
	if (!_.contains(supported_actions, action.type)) {
		console.log('unsupported type', action.type)
	}
	console.log(`   -> ${action.type} (${JSON.stringify(action)})`)
}

_.keys(manifest).forEach((key) => {
	if (!test_platform(key))
		return
	console.log('profile-group:', key)
	if (manifest[key].requirements) {
		console.log('requirements:')
		filter_items(manifest[key].requirements).forEach((req) => {
			console.log(`   -> ${req.name} (${JSON.stringify(req)})`)
		})
		console.log()
	}
	let install_profiles = manifest[key].install_profiles
	if (install_profiles) {
		console.log('install_profiles')
		_.keys(install_profiles).forEach((profile) => {
			console.log(` - ${profile}`)
			filter_items(install_profiles[profile]).forEach(run_action)
		})
	} else {
		console.log('default install process')
	}

	let launch_profiles = manifest[key].launch_profiles
	if (launch_profiles) {
		console.log('\nlaunch_profiles')
		_.keys(launch_profiles).forEach((profile) => {
			console.log(` - ${profile}`)
			filter_items(launch_profiles[profile]).forEach(run_action)
		})
	} else {
		console.log('default launch process')
	}
})
