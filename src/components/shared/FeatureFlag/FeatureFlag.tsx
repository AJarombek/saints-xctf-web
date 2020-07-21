import React, {useContext} from "react";
import {FeatureFlagContext} from "./FeatureFlagProvider";

interface IProps {
    flag: string,
    renderOn?: Function,
    renderOff?: Function
}

const FeatureFlag: React.FunctionComponent<IProps> = ({flag, renderOn, renderOff, children}) => {
    const context = useContext(FeatureFlagContext);

    const isOn = context
        .filter((value) => value.isActive)
        .map((value) => value.name)
        .includes(flag);

    if (isOn) {
        return renderOn ? renderOn() : children
    } else {
        return renderOff ? renderOff() : null;
    }
};

export default FeatureFlag;
