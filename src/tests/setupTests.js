import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/* adding a path from which test environment should load ENV VARIABLES - to do it we import the addition 'dotenv'*/
import DotEnv from 'dotenv';

Enzyme.configure({
    adapter: new Adapter()
})

DotEnv.config({ path: '.env.test'});