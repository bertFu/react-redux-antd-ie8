import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow } from 'enzyme';              // method from enzyme which allows us to do shallow render
import Root from '../../src/views/Demo/Root';      // import our soon to be component

// describe('(Container) Root', () => {
//   it('renders as a <div>', () => {
//     const wrapper = shallow(<Root />);
//     expect(wrapper.type()).to.eql('div');
//   });

//   it('has style with height 100%', () => {
//     const wrapper = shallow(<Root />);
//     const expectedStyles = {
//       height: '100%',
//       background: '#333'
//     }
//     expect(wrapper.prop('style')).to.eql(expectedStyles);
//   });

//   it('contains a header explaining the app', () => {
//     const wrapper = shallow(<Root />);
//     expect(wrapper.find('.welcome-header')).to.have.length(1);
//   });
// });

describe('(Container) Root', () => {
  const wrapper = shallow(<Root />);

  it('renders as a <div>', () => {
    expect(wrapper.type()).to.eql('div');
  });

  it('has style with height 100%', () => {
    const expectedStyles = {
      height: '100%',
      background: '#333'
    }
    expect(wrapper.prop('style')).to.eql(expectedStyles);
  });

  it('contains a header explaining the app', () => {
    expect(wrapper.find('.welcome-header')).to.have.length(1);
  });
});