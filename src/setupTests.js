// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


const react18_warning = "ReactDOM.render is no longer supported in React 18";
const originalError = console.error.bind(console.error);
console.error = (...args) => !args.toString().includes(react18_warning) && originalError(...args);


Enzyme.configure({ adapter: new Adapter() });