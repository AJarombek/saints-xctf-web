/**
 * JSS styles for the NewLog component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import Colors from "../../styles/colors";
import Mixins from "../../styles/mixins";

export default {
    newLog: {
        backgroundColor: Colors.lightBackground,
        ...Mixins.lightNavDarkDropdown(),

        '& .sxctf-home-footer': {
            backgroundColor: Colors.lightBackground,
        }
    }
};
