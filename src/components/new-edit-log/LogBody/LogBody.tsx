/**
 * Component for the new log page which allows users to create a new exercise log.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import ImageInput from "../../shared/ImageInput";
import {AJButton, AJSelect} from "jarombek-react-components";
import StepSlider from "../../shared/StepSlider";
import {FeelColors} from "../../../styles/colors";
import AutoResizeTextArea from "../../shared/AutoResizeTextArea/AutoResizeTextArea";
import {useHistory} from "react-router-dom";
import classNames from "classnames";
import {ImageInputStatus} from "../../shared/ImageInput/ImageInput";
import {Log, NewLog, UpdateLogs, User} from "../../../redux/types";

interface IProps {
    existingLog?: Log;
    postLog?: (username: string, first: string, last: string, name: string, location: string, date: string, type: string,
        distance: number, metric: string, time: string, feel: number, description: string) => void;
    putLog?: (id: number, name: string, location: string, date: string, type: string, distance: number, metric: string,
              time: string, feel: number, description: string) => void;
    invalidateLogCreated?: () => void;
    user: User;
    newLog?: NewLog;
    updateLogs?: UpdateLogs;
}

const useStyles = createUseStyles(styles);

const feelList = [
    'Terrible', 'Very Bad', 'Bad', 'Pretty Bad', 'Mediocre', 'Average', 'Fairly Good', 'Good', 'Great', 'Fantastic'
];

const exerciseTypes = ['Run', 'Bike', 'Swim', 'Other'];
const metricTypes = ['Miles', 'Kilometers', 'Meters'];
const feelSteps = [
    { value: 1, color: FeelColors[0] },
    { value: 2, color: FeelColors[1] },
    { value: 3, color: FeelColors[2] },
    { value: 4, color: FeelColors[3] },
    { value: 5, color: FeelColors[4] },
    { value: 6, color: FeelColors[5] },
    { value: 7, color: FeelColors[6] },
    { value: 8, color: FeelColors[7] },
    { value: 9, color: FeelColors[8] },
    { value: 10, color: FeelColors[9] }
];

const LogBody: React.FunctionComponent<IProps> = ({
    postLog,
    putLog,
    user,
    existingLog,
    newLog,
    invalidateLogCreated,
    updateLogs,
}) => {
    const history = useHistory();

    const descriptionRef = useRef(null);

    const [name, setName] = useState('');
    const [nameStatus, setNameStatus] = useState(ImageInputStatus.NONE);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [dateStatus, setDateStatus] = useState(ImageInputStatus.NONE);
    const [type, setType] = useState(exerciseTypes[0].toLowerCase());
    const [distance, setDistance] = useState(0);
    const [distanceStatus, setDistanceStatus] = useState(ImageInputStatus.NONE);
    const [metric, setMetric] = useState(metricTypes[0].toLowerCase());
    const [time, setTime] = useState('');
    const [formattedTime, setFormattedTime] = useState('');
    const [timeStatus, setTimeStatus] = useState(ImageInputStatus.NONE);
    const [feel, setFeel] = useState(5);
    const [description, setDescription] = useState('');

    const classes = useStyles({ feel });

    useEffect(() => {
        return () => {
            if (invalidateLogCreated) {
                invalidateLogCreated();
            }
        };
    }, []);

    useEffect(() => {
        if (existingLog && existingLog.log_id) {
            setName(existingLog.name);
            setLocation(existingLog.location);
            setDate(existingLog.date);
            setType(existingLog.type);
            setDistance(existingLog.distance);
            setMetric(existingLog.metric);
            setFormattedTime(existingLog.time);
            setFeel(+existingLog.feel - 1);
            setDescription(existingLog.description);

            const time = existingLog.time?.split('')?.filter(c => c !== ':')?.reduce((time, char) => time + char, '');
            setTime(time);
        }
    }, [existingLog]);

    useEffect(() => {
        if (!newLog?.isFetching && !newLog?.didInvalidate && newLog?.created) {
            history.push('/dashboard');
        }
    }, [newLog]);

    useEffect(() => {
        const updateInfo = updateLogs[existingLog?.log_id];

        if (!updateInfo?.isFetching && !updateInfo?.didInvalidate && updateInfo?.updated) {
            history.push('/dashboard');
        }
    }, [updateLogs]);

    const onChangeTime = (value: string) => {
        if (!value) {
            setTime('');
            setFormattedTime('');
        } else {
            const isNumber = /\d/;

            let newTime = value
                .split('')
                .filter((char) => isNumber.test(char))
                .reduce((time, char) => time + char, '');

            let newFormattedTime = newTime;

            if (newTime.length <= 6) {
                if (newTime.length) {
                    newFormattedTime = newFormattedTime
                        .split('')
                        .map((char, index) => (newFormattedTime.length - index) % 2 || !index ? char : `:${char}`)
                        .reduce((time, slice) => time + slice);
                }

                setTime(newTime);
                setFormattedTime(newFormattedTime);
            }
        }
    };

    const onSubmit = () => {
        if (!name) {
            setNameStatus(ImageInputStatus.FAILURE);
            return;
        }

        if (!date) {
            setDateStatus(ImageInputStatus.FAILURE);
            return;
        }

        if (!distance && !time) {
            setDistanceStatus(ImageInputStatus.WARNING);
            setTimeStatus(ImageInputStatus.WARNING);
            return;
        }

        if (existingLog) {
            onEdit();
        } else {
            onCreate();
        }
    };

    const onCreate = () => {
        postLog(
            user.username,
            user.first,
            user.last,
            name,
            location,
            date,
            type,
            distance,
            metric,
            formattedTime,
            feel + 1,
            description
        );
    };

    const onEdit = () => {
        putLog(
            existingLog.log_id,
            name,
            location,
            date,
            type,
            distance,
            metric,
            formattedTime,
            feel + 1,
            description
        )
    };

    const onCancel = useCallback(() => {
        history.push('/dashboard');
    }, [history]);

    return (
        <div className={classes.newLogBody}>
            <h3 className={classes.title}>Create a new exercise log.</h3>
            <div className={classes.logForm}>
                <p className={classes.feel}>{feelList[feel]}</p>
                <div
                    className={
                        classNames(classes.nameBody, nameStatus === ImageInputStatus.FAILURE && classes.inputError)
                    }
                >
                    <p className={classes.inputTitle}>Exercise Name*</p>
                    <ImageInput
                        type="text"
                        name="name"
                        placeholder=""
                        useCustomValue={true}
                        value={name}
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
                            useCustomValue={true}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            status={ImageInputStatus.NONE}
                        />
                    </div>
                    <div
                        className={
                            classNames(classes.dateInput, dateStatus === ImageInputStatus.FAILURE && classes.inputError)
                        }
                    >
                        <p className={classes.inputTitle}>Date*</p>
                        <ImageInput
                            type="date"
                            name="date"
                            placeholder=""
                            useCustomValue={true}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            status={dateStatus}
                        />
                    </div>
                </div>
                <div>
                    <p className={classes.inputTitle}>Exercise Type</p>
                    <AJSelect
                        options={
                            exerciseTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []
                        }
                        defaultOption={
                            type ? exerciseTypes.indexOf(type.charAt(0).toUpperCase() + type.slice(1)) + 1 : 1
                        }
                        className={classes.select}
                        onClickListOption={(item: {content: string, value: string}) => setType(item.value)}
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
                                useCustomValue={true}
                                value={`${distance}`}
                                onChange={(e) => setDistance(+e.target.value)}
                                status={distanceStatus}
                            />
                            <AJSelect
                                options={metricTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []}
                                defaultOption={1}
                                className={classes.select}
                                onClickListOption={(item: {content: string, value: string}) => setMetric(item.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.timeInput}>
                        <p className={classes.inputTitle}>Time</p>
                        <ImageInput
                            type="text"
                            name="time"
                            placeholder=""
                            useCustomValue={true}
                            value={formattedTime}
                            onChange={(e) => onChangeTime(e.target.value)}
                            status={timeStatus}
                        />
                    </div>
                </div>
                <div>
                    <p className={classes.inputTitle}>Feel</p>
                    <StepSlider
                        steps={feelSteps}
                        value={feel ?? 5}
                        onValueChange={(value) => {
                            console.info(value);
                            if (value !== feel) {
                                setFeel(value);
                            }
                        }}
                    />
                </div>
                <div>
                    <p className={classes.inputTitle}>Description</p>
                    <AutoResizeTextArea
                        maxLength={1000}
                        placeholder="..."
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        useCustomValue={true}
                        value={description}
                        disabled={false}
                        className={classes.textArea}
                        ref={descriptionRef}
                    />
                </div>
                <div className={classes.actions}>
                    <AJButton
                        type="contained"
                        disabled={false}
                        onClick={onSubmit}
                        className={classNames(
                            classes.submitButton, existingLog ? classes.editButton : classes.createButton
                        )}
                    >
                        {existingLog ? 'Submit Changes' : 'Create'}
                    </AJButton>
                    <AJButton type="text" disabled={false} onClick={onCancel} className={classes.cancelButton}>
                        Cancel
                    </AJButton>
                </div>
            </div>
        </div>
    );
};

export default LogBody;
