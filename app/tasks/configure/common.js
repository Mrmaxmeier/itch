'use strict'

let sniff = require('../../util/sniff')
let glob = require('../../promised/glob')
let fs = require('../../promised/fs')

/**
 * Tries to find executables by sniffing file contents,
 * +x them, and return a list of them
 */
function fix_execs (base_path) {
  return (
    glob(`${base_path}/**/*`, {nodir: true})
    .map(sniff_and_chmod, {concurrency: 2})
    .filter((x) => !!x)
  )
}

async function sniff_and_chmod (file) {
  let type = await sniff.path(file)
  if (type && type.executable) {
    await fs.chmodAsync(file, 0o777)
    return file
  }
}

module.exports = {fix_execs}
