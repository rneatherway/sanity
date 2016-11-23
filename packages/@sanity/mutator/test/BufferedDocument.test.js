// @flow
import {test} from 'tap'

import BufferedDocumentTester from './util/BufferedDocumentTester'

test('simple edit cycle', tap => {
  (new BufferedDocumentTester(tap, {
    _rev: '1',
    title: 'Hello'
  }))
  .hasNoLocalEdits()

  .stage('when applying first local edit')
  .localPatch({
    set: {
      'title': 'Good bye'
    }
  })
  .onMutationFired()
  .hasLocalEdits()

  .stage('when applying second local edit')
  .localPatch({
    set: {
      'body': 'My friend'
    }
  })
  .onMutationFired()
  .hasLocalEdits()
  .assertLOCAL('title', 'Good bye')
  .assertEDGE('title', 'Hello')

  .stage('when committing local edits')
  .commit()
  .onMutationDidNotFire()
  .hasPendingCommit()
  .hasNoLocalEdits()
  .assertHEAD('title', 'Hello')
  .assertEDGE('title', 'Good bye')
  .assertLOCAL('title', 'Good bye')

  .stage('when commit suceeds')
  .commitSucceeds()
  .onMutationDidNotFire()
  .assertALL('title', 'Good bye')
  .assertALL('body', 'My friend')
  .isConsistent()

  .end()
})

test('simple edit cycle with remote edits', tap => {
  (new BufferedDocumentTester(tap, {
    _rev: '1',
    numbers: [0]
  }))
  .hasNoLocalEdits()

  .stage('when applying first local edit')
  .localPatch({
    insert: {
      after: 'numbers[-1]',
      items: [1]
    }
  })
  .onMutationFired()
  .hasLocalEdits()
  .assertLOCAL('numbers', [0, 1])

  .stage('when remote patch appear')
  .remotePatch('1', '2', {
    insert: {
      before: 'numbers[0]',
      items: [-1]
    }
  })
  .didRebase()
  .hasLocalEdits()
  .assertLOCAL('numbers', [-1, 0, 1])
  .assertEDGE('numbers', [-1, 0])

  .stage('when committing local edits')
  .commit()
  .onMutationDidNotFire()
  .didNotRebase()
  .assertLOCAL('numbers', [-1, 0, 1])
  .assertEDGE('numbers', [-1, 0, 1])
  .assertHEAD('numbers', [-1, 0])

  .stage('when commit suceeds')
  .commitSucceeds()
  .onMutationDidNotFire()
  .assertALL('numbers', [-1, 0, 1])
  .isConsistent()

  .end()
})
