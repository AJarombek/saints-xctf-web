/**
 * Home body containing action buttons.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import {AJButton} from 'jarombek-react-components';

const HomeBody = () => {
    return (
        <div className="sxctf-home-body">
            <AJButton type="contained">Try the Demo</AJButton>
            <AJButton type="text">Get Started</AJButton>
        </div>
    );
};

export default HomeBody;
