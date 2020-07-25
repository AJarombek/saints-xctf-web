import Colors from "../../styles/colors";
import Mixins from "../../styles/mixins";

export default {
    dashboard: {
        backgroundColor: Colors.lightestBackground,
        ...Mixins.lightNavDarkDropdown()
    }
};
