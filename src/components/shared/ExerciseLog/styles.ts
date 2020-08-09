/**
 * JSS styles for the ExerciseLog component.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import {FeelColors} from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
  exerciseLog: {
    backgroundColor: ({feel}: {feel: number}) => FeelColors[feel - 1],
    border: '2px solid #888',
    borderRadius: '3px',
    padding: '7px',
    margin: '10px 0',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  headerSection: {
    display: 'flex'
  },
  titles: {
    display: 'block'
  },
  titleLink: {
    ...FontMixins.robotoSlab(),
    color: '#333',
    textDecoration: 'none'
  },
  title: {
    ...FontMixins.robotoSlab(),
    textDecoration: 'underline',
    fontSize: '16px',
  },
  metadata: {
    display: 'block',
    margin: '0 0 0 auto'
  },
  date: {
    ...FontMixins.robotoBold(),
    fontSize: '14px',
    margin: 0,
  },
  type: {
    ...FontMixins.robotoSlab(),
    fontSize: '14px',
    fontColor: '#666',
    margin: 0,
    textAlign: 'right',
  },
  bodySection: {
    marginTop: '20px',
  },
  dataFields: {
    '& > p': {
      ...FontMixins.robotoSlab(),
      fontSize: '14px',
      margin: 0,
    }
  },
  description: {
    marginTop: '10px',

    '& > p': {
      ...FontMixins.robotoSlab(),
      fontSize: '14px',
      margin: 0,
    }
  },
  commentSection: {
    margin: '10px 0 0 0',
  },
};
