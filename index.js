jQuery(function($) {

  var ListItem = Backbone.View.extend({

    events: {
      'click button.remove': function() {
        this.model.destroy();
      }
    },

    render: function() {
      this.$el.html(
        '<button class="remove">Remove</button> ' + this.model.escape('text')
      );
      return this;
    }

  });

  var models = [
    {text: 'foo'},
    {text: 'bar'},
    {text: 'baz'},
    {text: 'bam'},
    {text: 'boom!'},
  ];

  var App = Backbone.View.extend({

    events: {

      'click .reset': function() {
        this.collection.reset(models);
      },

      'submit form': function(e) {
        var $input = $('input', e.target);
        this.collection.add({text: $input.val()});
        $input.val('');
        return false;
      }

    },

    render: function() {
      new List({
        view: ListItem,
        collection: this.collection
      }).render().$el.appendTo(this.el);
      return this;
    }

  });

  var app = window.app = new App({
    el: 'body',
    collection: new Backbone.Collection(models, {
      comparator: 'text'
    })
  }).render();

});
