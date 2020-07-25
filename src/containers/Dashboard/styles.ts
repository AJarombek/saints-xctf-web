import Colors from "../../styles/colors";
import Mixins from "../../styles/mixins";

export default {
    dashboard: {
        backgroundColor: Colors.lightBackground,
        ...Mixins.lightNavDarkDropdown(),

        '& .sxctf-home-footer': {
            backgroundColor: Colors.lightBackground,
        }
    }
};
