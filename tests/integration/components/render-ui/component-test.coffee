`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'render-ui', 'Integration | Component | render ui', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{render-ui}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#render-ui}}
      template block text
    {{/render-ui}}
  """

  assert.equal @$().text().trim(), 'template block text'
