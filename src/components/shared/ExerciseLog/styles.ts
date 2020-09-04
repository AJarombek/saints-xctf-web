/**
 * JSS styles for the ExerciseLog component.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import Colors, {FeelColors} from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";
import color from "color";

export default {
  exerciseLog: {
    backgroundColor: ({feel}: {feel: number}) => FeelColors[feel - 1],
    border: '2px solid #888',
    borderRadius: '3px',
    padding: '7px',
    margin: '10px 0',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative'
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
    textDecoration: 'none',
    fontSize: 16
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
    display: 'inline-block',
    ...FontMixins.robotoSlab(),
    fontSize: '14px',

    '& > a': {
      display: 'inline-block',
      ...FontMixins.robotoSlabBold(),
      color: '#444',
      transition: 'color 0.4s ease',

      '&:hover': {
        color: color(Colors.spotPaletteBrown).darken(0.2).hex(),
      }
    },
  },
  commentSection: {
    margin: '10px 0 0 0',
  },
  options: {
    position: 'absolute',
    width: 'calc(100% - 14px)',
    display: 'flex'
  },
  optionsButtons: {
    margin: '0 0 0 auto',
    display: 'flex'
  },
  optionsButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '50%',
    border: 'none',
    backgroundColor: Colors.spotPaletteCream,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    height: 30,
    width: 30,
    margin: '0 2px',

    '& > p': {
      fontSize: 20,
      color: '#555'
    },

    '&:focus': {
      outline: 'none',
    }
  },
  optionsIcon: {
    ...FontMixins.elegantIcons(),
  }
};
