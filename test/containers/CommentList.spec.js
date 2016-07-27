import React from 'react';

// Once we set up Karma to run our tests through webpack
// we will no longer need to have these long relative paths
import CommentList from '../../src/views/Demo/CommentList';
import {
  describeWithDOM,
  mount,
  shallow,
  spyLifecycle
} from 'enzyme';

describe('(Component) CommentList', () => {

  // using special describeWithDOM helper that enzyme
  // provides so if other devs on my team don't have JSDom set up
  // properly or are using old version of node it won't bork their test suite
  //
  // All of our tests that depend on mounting should go inside one of these
  // special describe blocks
  describeWithDOM('Lifecycle methods', () => {
    it('calls componentDidMount', () => {
      spyLifecyle(CommentList);

      const props = {
        onMount: () => {},  // an anonymous function in ES6 arrow syntax
        isActive: false
      }

      // using destructuring to pass props down
      // easily and then mounting the component
      mount(<CommentList {...props} />);

      // CommentList's componentDidMount should have been
      // called once.  spyLifecyle attaches sinon spys so we can
      // make this assertion
      expect(
        CommentList.prototype.componentDidMount.calledOnce
      ).to.be.true;
    });

    it('calls onMount prop once it mounts', () => {
      // create a spy for the onMount function
      const props = { onMount: sinon.spy() };

      // mount our component
      mount(<CommentList {...props} />);

      // expect that onMount was called
      expect(props.onMount.calledOnce).to.be.true;
    });
  });
});