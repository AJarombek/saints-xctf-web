/**
 * Component for the new log page which allows users to create a new exercise log.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import ImageInput from '../../shared/ImageInput';
import { AJButton, AJSelect } from 'jarombek-react-components';
import StepSlider from '../../shared/StepSlider';
import { FeelColors } from '../../../styles/colors';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea/AutoResizeTextArea';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { ImageInputStatus } from '../../shared/ImageInput';
import { Log, RootState, User } from '../../../redux/types';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup/DefaultErrorPopup';
import { useDispatch, useSelector } from 'react-redux';
import { invalidateLogUpdated, invalidateLogCreated, postLog, putLog } from '../../../redux/modules/logs';
import { postNotification } from '../../../redux/modules/notifications';

interface Props {
  user: User;
  existingLog?: Log;
}

const useStyles = createUseStyles(styles);

const feelList = [
  'Terrible',
  'Very Bad',
  'Bad',
  'Pretty Bad',
  'Mediocre',
  'Average',
  'Fairly Good',
  'Good',
  'Great',
  'Fantastic'
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

const LogBody: React.FunctionComponent<Props> = ({ user, existingLog }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const updateLogs = useSelector((state: RootState) => state.logs.updateLogs);
  const newLog = useSelector((state: RootState) => state.logs.newLog);

  const descriptionRef = useRef(null);

  const [name, setName] = useState('');
  const [nameStatus, setNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [dateStatus, setDateStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [type, setType] = useState(exerciseTypes[0].toLowerCase());
  const [distance, setDistance] = useState(0);
  const [distanceStatus, setDistanceStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [metric, setMetric] = useState(metricTypes[0].toLowerCase());
  const [time, setTime] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [timeStatus, setTimeStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [feel, setFeel] = useState(5);
  const [description, setDescription] = useState('');
  const [errorCreatingLog, setErrorCreatingLog] = useState(false);
  const [errorUpdatingLog, setErrorUpdatingLog] = useState(false);

  const classes = useStyles({ feel });

  useEffect(() => {
    return (): void => {
      dispatch(invalidateLogCreated());
      dispatch(invalidateLogUpdated(existingLog?.log_id ?? 0));
    };
  }, [dispatch, existingLog?.log_id]);

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

      const time = existingLog.time
        ?.split('')
        ?.filter((c) => c !== ':')
        ?.reduce((time, char) => time + char, '');
      setTime(time);
    }
  }, [existingLog]);

  useEffect(() => {
    if (newLog && Object.keys(newLog).length && !newLog?.isFetching && !newLog?.didInvalidate) {
      if (newLog?.created) {
        history.push('/dashboard');
      } else {
        setErrorCreatingLog(true);
      }
    }
  }, [newLog, history]);

  useEffect(() => {
    if (updateLogs && Object.keys(updateLogs).length) {
      const updateInfo = updateLogs[existingLog?.log_id];

      if (!updateInfo?.isFetching && !updateInfo?.didInvalidate) {
        if (updateInfo?.updated) {
          history.push('/dashboard');
        } else {
          setErrorUpdatingLog(true);
        }
      }
    }
  }, [updateLogs, existingLog, history]);

  const onChangeTime = (value: string): void => {
    if (!value) {
      setTime('');
      setFormattedTime('');
    } else {
      const isNumber = /\d/;

      const newTime = value
        .split('')
        .filter((char) => isNumber.test(char))
        .reduce((time, char) => time + char, '');

      let newFormattedTime = newTime;

      if (newTime.length <= 6) {
        if (newTime.length) {
          newFormattedTime = newFormattedTime
            .split('')
            .map((char, index) => ((newFormattedTime.length - index) % 2 || !index ? char : `:${char}`))
            .reduce((time, slice) => time + slice);
        }

        setTime(newTime);
        setFormattedTime(newFormattedTime);
      }
    }
  };

  const onCreate = async (): Promise<void> => {
    const logId = await dispatch(
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
        '00:00:00'.slice(0, 8 - formattedTime.length) + formattedTime,
        feel + 1,
        description
      )
    );

    if (logId) {
      const tagRegex = /@([a-zA-Z0-9])+/g;
      let matches = [];

      while ((matches = tagRegex.exec(description)) !== null) {
        const username = matches[1];
        dispatch(
          postNotification(
            username,
            `${user.first} ${user.last} mentioned you in an exercise log.`,
            `/log/view/${logId}`
          )
        );
      }
    }
  };

  const onEdit = (): void => {
    dispatch(
      putLog(
        existingLog.log_id,
        name,
        location,
        date,
        type,
        distance,
        metric,
        '00:00:00'.slice(0, 8 - formattedTime.length) + formattedTime,
        feel + 1,
        description
      )
    );
  };

  const onSubmit = (): void => {
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

  const onCancel = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  return (
    <div className={classes.newLogBody}>
      <h3 className={classes.title}>Create a new exercise log.</h3>
      <div className={classes.logForm}>
        <p className={classes.feel}>{feelList[feel]}</p>
        <div className={classNames(classes.nameBody, nameStatus === ImageInputStatus.FAILURE && classes.inputError)}>
          <p className={classes.inputTitle}>Exercise Name*</p>
          <ImageInput
            type="text"
            name="name"
            placeholder=""
            useCustomValue={true}
            value={name}
            onChange={(e): void => setName(e.target.value)}
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
              onChange={(e): void => setLocation(e.target.value)}
              status={ImageInputStatus.NONE}
            />
          </div>
          <div className={classNames(classes.dateInput, dateStatus === ImageInputStatus.FAILURE && classes.inputError)}>
            <p className={classes.inputTitle}>Date*</p>
            <ImageInput
              type="date"
              name="date"
              placeholder=""
              useCustomValue={true}
              value={date}
              onChange={(e): void => setDate(e.target.value)}
              status={dateStatus}
            />
          </div>
        </div>
        <div>
          <p className={classes.inputTitle}>Exercise Type</p>
          <AJSelect
            options={exerciseTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []}
            defaultOption={type ? exerciseTypes.indexOf(type.charAt(0).toUpperCase() + type.slice(1)) + 1 : 1}
            className={classes.select}
            onClickListOption={(item: { content: string; value: string }): void => setType(item.value)}
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
                onChange={(e): void => setDistance(+e.target.value)}
                status={distanceStatus}
              />
              <AJSelect
                options={metricTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []}
                defaultOption={1}
                className={classes.select}
                onClickListOption={(item: { content: string; value: string }): void => setMetric(item.value)}
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
              onChange={(e): void => onChangeTime(e.target.value)}
              status={timeStatus}
            />
          </div>
        </div>
        <div>
          <p className={classes.inputTitle}>Feel</p>
          <StepSlider
            steps={feelSteps}
            value={feel ?? 5}
            onValueChange={(value): void => {
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setDescription(e.target.value)}
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
            className={classNames(classes.submitButton, existingLog ? classes.editButton : classes.createButton)}
          >
            {existingLog ? 'Submit Changes' : 'Create'}
          </AJButton>
          <AJButton type="text" disabled={false} onClick={onCancel} className={classes.cancelButton}>
            Cancel
          </AJButton>
        </div>
      </div>
      {errorCreatingLog && (
        <DefaultErrorPopup
          message="An unexpected error occurred while creating an exercise log"
          onClose={(): void => setErrorCreatingLog(false)}
        />
      )}
      {errorUpdatingLog && (
        <DefaultErrorPopup
          message="An unexpected error occurred while updating the exercise log"
          onClose={(): void => setErrorUpdatingLog(false)}
        />
      )}
    </div>
  );
};

export default LogBody;
