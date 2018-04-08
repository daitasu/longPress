import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import './main.html';

Template.longPress.onCreated( function () {
    this.counter = new ReactiveVar(0);
    this.holding = new ReactiveVar(false);

    this.setCount = (count) => {
      if(this.holding.get()) {
          this.counter.set(this.counter.get() + count);
          return Meteor.setTimeout(() => this.setCount(count), 100);
      }
    };
});

Template.longPress.helpers({
    counter() {
        return Template.instance().counter.get();
    },
});

Template.longPress.events({
    'mousedown .plus'(event, instance) {
        instance.holding.set(true);
        return instance.setCount(1);
    },
    'mousedown .minus'(event, instance) {
        instance.holding.set(true);
        return instance.setCount(-1);
    },
    'mouseup .plus'(event, instance) {
        instance.holding.set(false);
    },
    'mouseup .minus'(event, instance) {
        instance.holding.set(false);
    }
});
