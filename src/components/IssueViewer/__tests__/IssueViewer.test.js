import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {IssueViewer, mapStateToProps} from '../index';
import Column from '../../Column';
import RepositoryRow from '../../RepositoryRow';
import Issues from '../../Issues';

configure({ adapter: new Adapter() });


const mockRepos = [
    {
        id: 'repo1'
    },
    {
        id: 'repo2'
    }
];

const mockState = {
    repos: {
        data: mockRepos
    }
}

describe('IssueViewer component', () => {
    it('renders without crashing', () => {
        const component = shallow(<IssueViewer repositories={mockRepos} />);
        expect(component).toBeTruthy();
    });

    it('renders two Column components', () => {
        const component = shallow(<IssueViewer repositories={mockRepos} />);
        expect(component.find(Column).length).toEqual(2);
    });

    it('renders one RepositoryRow component for each repository in props', () => {
        const component = shallow(<IssueViewer repositories={mockRepos} />);
        expect(component.find(RepositoryRow).length).toEqual(mockRepos.length);
    });

    it('renders one Issues component', () => {
        const component = shallow(<IssueViewer repositories={mockRepos} />);
        expect(component.find(Issues).length).toEqual(1);
    });

    describe('mapStateToProps', () => {
        it('returns the repositories from state', () => {
            expect(mapStateToProps(mockState)).toMatchObject({repositories: mockRepos})
        });
    });
});
