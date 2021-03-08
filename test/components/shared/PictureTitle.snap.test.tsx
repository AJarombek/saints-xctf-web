/**
 * Snapshot test for the PaginationBar component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import PictureTitle from '../../../src/components/shared/PictureTitle';

describe('PaginationBar Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<PictureTitle imageUrl="saintsxctf.png" title="Andy Jarombek" subTitle="@andy" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
