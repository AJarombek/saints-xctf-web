/**
 * JSS styles for the ExerciseLog component.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import {FeelColors} from "../../../styles/colors";

export default {
  exerciseLog: {
    backgroundColor: ({feel}: {feel: number}) => FeelColors[feel - 1],
    border: '2px solid #888',
    borderRadius: '2px',
    padding: '5px',
    margin: '10px 0'
  },
  headerSection: {
    display: 'flex'
  },
  titles: {
    display: 'block'
  },
  metadata: {
    display: 'block',
    margin: '0 0 0 auto'
  },
  date: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  type: {
    fontSize: '14px',
    fontColor: '#666',
  }
};
