import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LandingPage, mapStateToProps} from '../index';

configure({ adapter: new Adapter() });

describe('LandingPage component', () => {
    it('renders without crashing', () => {
        const component = shallow(<LandingPage />);
        expect(component).toBeTruthy();
    });

    describe('renders an input', () => {
        it('with type text', () => {
            const component = shallow(<LandingPage />);
            expect(component.find('input[type="text"]').length).toEqual(1); 
        });

        it('calls the onChange from props', () => {
            const onChangeProps = {
                onChangeAPIToken: jest.fn()
            }

            const component = shallow(<LandingPage {...onChangeProps} />);
            component.find('input').simulate('change');
            expect(onChangeProps.onChangeAPIToken).toHaveBeenCalled();
        });
    });

    describe('renders a button', () => {
        it('one', () => {
            const component = shallow(<LandingPage />);
            expect(component.find('button').length).toEqual(1); 
        });

        it('calls the correct function from props on click', () => {
            const onClickProps = {
                fetchRepos: jest.fn()
            }

            const component = shallow(<LandingPage {...onClickProps} />);
            component.find('button').simulate('click');
            expect(onClickProps.fetchRepos).toHaveBeenCalled();
        });
    });
});