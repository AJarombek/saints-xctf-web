/**
 * Component for the new log page which allows users to create a new exercise log.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { AJButton, AJSelect } from 'jarombek-react-components';
import StepSlider from '../../shared/StepSlider';
import { FeelColors } from '../../../styles/colors';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea/AutoResizeTextArea';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Log, RootState, User } from '../../../redux/types';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup/DefaultErrorPopup';
import { useDispatch, useSelector } from 'react-redux';
import { invalidateLogCreated, invalidateLogUpdated, postLog, putLog } from '../../../redux/modules/logs';
import { postNotification } from '../../../redux/modules/notifications';
import moment from 'moment';
import AlertPopup from '../../shared/AlertPopup';

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
  const navigate = useNavigate();

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
  const [distance, setDistance] = useState('');
  const [distanceStatus, setDistanceStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [metric, setMetric] = useState(metricTypes[0].toLowerCase());
  const [time, setTime] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [timeStatus, setTimeStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [feel, setFeel] = useState(5);
  const [description, setDescription] = useState('');
  const [logCreatedSuccess, setLogCreatedSuccess] = useState(false);
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
      setDistance(existingLog.distance.toFixed(2));
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
    if (existingLog && updateLogs && Object.keys(updateLogs).length) {
      const updateInfo = updateLogs[existingLog?.log_id];

      if (updateInfo && !updateInfo?.isFetching && !updateInfo?.didInvalidate) {
        if (!updateInfo?.updated) {
          navigate('/dashboard');
        } else {
          setErrorUpdatingLog(true);
        }
      }
    }
  }, [updateLogs, existingLog, navigate]);

  const reset = (): void => {
    setName('');
    setNameStatus(ImageInputStatus.NONE);
    setLocation('');
    setDateStatus(ImageInputStatus.NONE);
    setDistance('');
    setDistanceStatus(ImageInputStatus.NONE);
    setTime('');
    setFormattedTime('');
    setTimeStatus(ImageInputStatus.NONE);
    setFeel(5);
    setDescription('');
    setErrorCreatingLog(false);
    setErrorUpdatingLog(false);
  };

  useEffect(() => {
    if (!existingLog && newLog && Object.keys(newLog).length && !newLog?.isFetching && !newLog?.didInvalidate) {
      if (newLog?.created) {
        setLogCreatedSuccess(true);
        window.scrollTo(0, 0);
        reset();
      } else {
        setErrorCreatingLog(true);
      }
    }
  }, [newLog, navigate, existingLog]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    const newName = e.target.value;
    setName(newName);

    if (newName.trim().length) {
      setNameStatus(ImageInputStatus.NONE);
    } else {
      setNameStatus(ImageInputStatus.WARNING);
    }
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>): void => {
    const newDate = e.target.value;
    setDate(newDate);

    if (moment(newDate, 'YYYY-MM-DD') > moment()) {
      setDateStatus(ImageInputStatus.WARNING);
    } else {
      setDateStatus(ImageInputStatus.NONE);
    }
  };

  const onChangeDistance = (e: ChangeEvent<HTMLInputElement>): void => {
    const newDistance = e.target.value;
    setDistance(newDistance);

    if (newDistance) {
      setDistanceStatus(ImageInputStatus.NONE);
      setTimeStatus(ImageInputStatus.NONE);
    } else if (!time) {
      setDistanceStatus(ImageInputStatus.WARNING);
      setTimeStatus(ImageInputStatus.WARNING);
    }
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!value) {
      setTime('');
      setFormattedTime('');

      setDistanceStatus(ImageInputStatus.WARNING);
      setTimeStatus(ImageInputStatus.WARNING);
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

      setDistanceStatus(ImageInputStatus.NONE);
      setTimeStatus(ImageInputStatus.NONE);
    }
  };

  const onCreate = async (): Promise<void> => {
    const logId = await dispatch(
      postLog(
        user.username,
        user.first,
        user.last,
        name.trim(),
        location.trim(),
        date,
        type,
        +(+distance).toFixed(2),
        metric,
        '00:00:00'.slice(0, 8 - formattedTime.length) + formattedTime,
        feel + 1,
        description.trim()
      )
    );

    if (logId) {
      const tagRegex = /@([a-zA-Z0-9]+)/g;
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

  const onEdit = async (): Promise<void> => {
    const logUpdated = await dispatch(
      putLog(
        existingLog.log_id,
        name,
        location,
        date,
        type,
        +(+distance).toFixed(2),
        metric,
        '00:00:00'.slice(0, 8 - formattedTime.length) + formattedTime,
        feel + 1,
        description
      )
    );

    if (logUpdated) {
      const tagRegex = /@(?<username>[a-zA-Z0-9]+)/g;
      const existingTagMatches = new Set();
      const updatedTagMatches = [];
      let matches = [];

      while ((matches = tagRegex.exec(existingLog.description)) !== null) {
        existingTagMatches.add(matches.groups.username);
      }

      while ((matches = tagRegex.exec(description)) !== null) {
        updatedTagMatches.push(matches.groups.username);
      }

      for (const updatedLogTag in updatedTagMatches) {
        if (!existingTagMatches.has(updatedLogTag)) {
          dispatch(
            postNotification(
              updatedLogTag,
              `${user.first} ${user.last} mentioned you in an edited exercise log.`,
              `/log/view/${existingLog.log_id}`
            )
          );
        }
      }
    }
  };

  const onSubmit = (): void => {
    let failedValidation = false;

    if (!name) {
      setNameStatus(ImageInputStatus.FAILURE);
      failedValidation = true;
    }

    if (!date || moment(date, 'YYYY-MM-DD') > moment()) {
      setDateStatus(ImageInputStatus.FAILURE);
      failedValidation = true;
    }

    if (!distance && !time) {
      setDistanceStatus(ImageInputStatus.WARNING);
      setTimeStatus(ImageInputStatus.WARNING);
      failedValidation = true;
    }

    if (failedValidation) return;

    if (existingLog) {
      onEdit();
    } else {
      onCreate();
    }
  };

  const onCancel = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className={classes.newLogBody}>
      <h3 className={classes.title}>{existingLog ? 'Edit an exercise log.' : 'Create a new exercise log.'}</h3>
      <div className={classes.logForm}>
        <p className={classes.feel} data-cypress="logFeel">
          {feelList[feel]}
        </p>
        <div
          className={classNames(
            classes.nameBody,
            nameStatus === ImageInputStatus.FAILURE && classes.inputError,
            nameStatus === ImageInputStatus.WARNING && classes.inputWarning
          )}
        >
          <p className={classes.inputTitle}>Exercise Name*</p>
          <ImageInput
            type="text"
            name="name"
            placeholder=""
            useCustomValue={true}
            value={name}
            onChange={onChangeName}
            status={nameStatus}
          />
          <p className={classes.inputTip} hidden={nameStatus === ImageInputStatus.NONE} data-cypress="nameInputTip">
            Exercise logs must have a name.
          </p>
        </div>
        <div className={classNames(classes.twoInputs, classes.metadata)}>
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
          <div
            className={classNames(
              classes.dateInput,
              dateStatus === ImageInputStatus.FAILURE && classes.inputError,
              dateStatus === ImageInputStatus.WARNING && classes.inputWarning
            )}
          >
            <p className={classes.inputTitle}>Date*</p>
            <ImageInput
              type="date"
              name="date"
              placeholder=""
              useCustomValue={true}
              value={date}
              onChange={onChangeDate}
              status={dateStatus}
            />
            <p className={classes.inputTip} hidden={dateStatus === ImageInputStatus.NONE} data-cypress="dateInputTip">
              A date is required and may not be in the future.
            </p>
          </div>
        </div>
        <div>
          <p className={classes.inputTitle}>Exercise Type</p>
          <AJSelect
            options={exerciseTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []}
            defaultOption={type ? exerciseTypes.indexOf(type.charAt(0).toUpperCase() + type.slice(1)) + 1 : 1}
            className={classNames(classes.select, 'exerciseTypeSelect')}
            onClickListOption={(item: { content: string; value: string }): void => setType(item.value)}
          />
        </div>
        <div className={classNames(classes.twoInputs, classes.metrics)}>
          <div
            className={classNames(
              classes.distanceInput,
              distanceStatus === ImageInputStatus.WARNING && classes.inputWarning
            )}
          >
            <p className={classes.inputTitle}>Distance</p>
            <div>
              <ImageInput
                type="number"
                name="distance"
                placeholder=""
                minValue={0}
                useCustomValue={true}
                value={`${distance}`}
                onChange={onChangeDistance}
                status={distanceStatus}
              />
              <AJSelect
                options={metricTypes?.map((type) => ({ content: type, value: type.toLowerCase() })) ?? []}
                defaultOption={1}
                className={classNames(classes.select, 'exerciseMetricSelect')}
                onClickListOption={(item: { content: string; value: string }): void => setMetric(item.value)}
              />
            </div>
            <p
              className={classes.inputTip}
              hidden={distanceStatus === ImageInputStatus.NONE}
              data-cypress="distanceInputTip"
            >
              A distance is required if no time is entered.
            </p>
          </div>
          <div
            className={classNames(classes.timeInput, timeStatus === ImageInputStatus.WARNING && classes.inputWarning)}
          >
            <p className={classes.inputTitle}>Time</p>
            <ImageInput
              type="text"
              name="time"
              placeholder=""
              useCustomValue={true}
              value={formattedTime}
              onChange={onChangeTime}
              status={timeStatus}
            />
            <p className={classes.inputTip} hidden={timeStatus === ImageInputStatus.NONE} data-cypress="timeInputTip">
              A time is required if no distance is entered.
            </p>
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
      {!!logCreatedSuccess && (
        <AlertPopup
          message="Exercise log created!"
          onClose={(): void => setLogCreatedSuccess(false)}
          type="success"
          autoCloseInterval={3000}
        />
      )}
    </div>
  );
};

export default LogBody;
