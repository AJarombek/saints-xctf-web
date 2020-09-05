import Colors from "../../styles/colors";
import Mixins from "../../styles/mixins";

/**
 * JSS styles for the EditLog component.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

export default {
    editLog: {
        backgroundColor: Colors.lightBackground,
        ...Mixins.lightNavDarkDropdown(),

        '& .sxctf-home-footer': {
            backgroundColor: Colors.lightBackground,
        }
    }
};
