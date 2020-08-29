/**
 * Component for the new log page which allows users to create a new exercise log.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import ImageInput, {ImageInputStatus} from "../../shared/ImageInput/ImageInput";
import {AJSelect} from "jarombek-react-components";

interface IProps {
    postLog: Function;
}

const useStyles = createUseStyles(styles);

const feelList = [
    'Terrible', 'Very Bad', 'Bad', 'Pretty Bad', 'Mediocre', 'Average', 'Fairly Good', 'Good', 'Great', 'Fantastic'
];

const exerciseTypes = ['Run', 'Bike', 'Swim', 'Other'];

const NewLogBody: React.FunctionComponent<IProps> = ({ postLog }) => {
    const [name, setName] = useState('');
    const [nameStatus, setNameStatus] = useState(ImageInputStatus.NONE);
    const [location, setLocation] = useState('');
    const [locationStatus, setLocationStatus] = useState(ImageInputStatus.NONE);
    const [date, setDate] = useState('');
    const [dateStatus, setDateStatus] = useState(ImageInputStatus.NONE);
    const [distance, setDistance] = useState(0);
    const [distanceStatus, setDistanceStatus] = useState(ImageInputStatus.NONE);
    const [time, setTime] = useState('');
    const [timeStatus, setTimeStatus] = useState(ImageInputStatus.NONE);
    const [feel, setFeel] = useState(5);
    const [feelStatus, setFeelStatus] = useState(ImageInputStatus.NONE);

    const classes = useStyles({ feel });

    return (
        <div className={classes.newLogBody}>
            <h3 className={classes.title}>Create a new exercise log.</h3>
            <div className={classes.logForm}>
                <p className={classes.feel}>{feelList[feel]}</p>
                <div className={classes.nameBody}>
                    <p className={classes.inputTitle}>Exercise Name</p>
                    <ImageInput
                        type="text"
                        name="name"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                        status={nameStatus}
                    />
                </div>
                <div className={classes.twoInputs}>
                    <div className={classes.locationInput}>
                        <p className={classes.inputTitle}>Location</p>
                        <ImageInput
                            type="text"
                            name="location"
                            placeholder=""
                            onChange={(e) => setLocation(e.target.value)}
                            status={locationStatus}
                        />
                    </div>
                    <div className={classes.dateInput}>
                        <p className={classes.inputTitle}>Date</p>
                        <ImageInput
                            type="date"
                            name="date"
                            placeholder=""
                            onChange={(e) => setDate(e.target.value)}
                            status={dateStatus}
                        />
                    </div>
                </div>
                <div>
                    <p className={classes.inputTitle}>Exercise Type</p>
                    <AJSelect
                        options={exerciseTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []}
                        defaultOption={1}
                        className={classes.select}
                    />
                </div>
                <div className={classes.twoInputs}>
                    <div className={classes.distanceInput}>
                        <p className={classes.inputTitle}>Distance</p>
                        <div>
                            <ImageInput
                                type="number"
                                name="distance"
                                placeholder=""
                                onChange={(e) => setDistance(+e.target.value)}
                                status={distanceStatus}
                            />
                        </div>
                    </div>
                    <div className={classes.timeInput}>
                        <p className={classes.inputTitle}>Time</p>
                        <ImageInput
                            type="text"
                            name="time"
                            placeholder=""
                            onChange={(e) => setTime(e.target.value)}
                            status={timeStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLogBody;
