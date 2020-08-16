/**
 * Component for the new log page which allows users to create a new exercise log.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import ImageInput, {ImageInputStatus} from "../../shared/ImageInput/ImageInput";

interface IProps {
    postLog: Function;
}

const useStyles = createUseStyles(styles);

const feelList = [
    'Terrible', 'Very Bad', 'Bad', 'Pretty Bad', 'Mediocre', 'Average', 'Fairly Good', 'Good', 'Great', 'Fantastic'
];

const exerciseTypes = ['Run', 'Bike', 'Swim', 'Other'];

const NewLogBody: React.FunctionComponent<IProps> = ({ postLog }) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [nameStatus, setNameStatus] = useState(ImageInputStatus.NONE);
    const [location, setLocation] = useState('');
    const [locationStatus, setLocationStatus] = useState(ImageInputStatus.NONE);
    const [date, setDate] = useState('');
    const [dateStatus, setDateStatus] = useState(ImageInputStatus.NONE);
    const [feel, setFeel] = useState(5);
    const [feelStatus, setFeelStatus] = useState(ImageInputStatus.NONE);

    return (
        <div className={classes.newLogBody}>
            <h3>Create a new exercise log.</h3>
            <div className={classes.logForm}>
                <p className={classes.feel}>{feelList[feel]}</p>
                <div>
                    <p>Exercise Name</p>
                    <ImageInput
                        type="text"
                        name="name"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                        status={nameStatus}
                    />
                </div>
                <div>
                    <p>Location</p>
                    <ImageInput
                        type="text"
                        name="location"
                        placeholder=""
                        onChange={(e) => setLocation(e.target.value)}
                        status={locationStatus}
                    />
                </div>
                <div>
                    <div>
                        <p>Date</p>
                        <ImageInput
                            type="date"
                            name="date"
                            placeholder=""
                            onChange={(e) => setDate(e.target.value)}
                            status={dateStatus}
                        />
                    </div>
                    <div>
                        <p>Exercise Type</p>
                        <select className={classes.select}>
                            {exerciseTypes.map((type) => (
                                <option value={type.toLowerCase()}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLogBody;
