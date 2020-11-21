/**
 * JSS styles for the NewLogBody component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import Colors, { FeelColors } from '../../../styles/colors';
import Mixins, { FontMixins } from '../../../styles/mixins';
import color from 'color';

export default {
  newLogBody: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: Colors.lightBackground,
    margin: '100px 6% 0 6%'
  },
  title: {
    ...Mixins.formTitle()
  },
  logForm: {
    backgroundColor: ({ feel }: { feel: number }): string => color(FeelColors[feel]).alpha(0.8).string(),
    width: '100%',
    maxWidth: '700px',
    margin: '25px auto',
    borderRadius: '6px',
    padding: '20px'
  },
  feel: {
    ...FontMixins.roboto(),
    color: '#737373',
    margin: 0,
    textAlign: 'right'
  },
  inputTitle: {
    ...Mixins.inputTitle()
  },
  nameBody: {
    '& .sxctf-image-input': {
      width: '100%'
    }
  },
  twoInputs: {
    display: 'flex'
  },
  locationInput: {
    flexBasis: '50%',
    paddingRight: 10,

    '& .sxctf-image-input': {
      width: '100%'
    }
  },
  dateInput: {
    flexBasis: '50%',
    paddingLeft: 10,

    '& .sxctf-image-input': {
      width: '100%'
    }
  },
  distanceInput: {
    flexBasis: '67%',
    paddingRight: 10,

    '& > div': {
      display: 'flex',

      '& > .sxctf-image-input': {
        flexBasis: '75%',
        marginRight: 10
      },

      '& > .aj-select': {
        flexBasis: '25%'
      }
    }
  },
  timeInput: {
    flexBasis: '33%',
    paddingLeft: 10
  },
  select: {
    position: 'relative',

    '&.aj-select-open > div': {
      borderRadius: '5px 5px 0 0'
    },

    '&.aj-select-closed > div': {
      borderRadius: 5
    },

    '& > div': {
      backgroundColor: Colors.lightestBackground,
      height: 50,
      border: 'none',
      width: '100%',
      padding: 10,
      cursor: 'pointer',

      '& > div:nth-child(1)': {
        ...FontMixins.roboto(),
        fontSize: 14
      },

      '& > div:nth-child(2)': {
        marginLeft: 'auto'
      }
    },

    '& > ul': {
      width: '100%',
      zIndex: 1,

      '& > li': {
        ...FontMixins.roboto(),
        fontSize: 14,
        textAlign: 'left',
        paddingLeft: 10
      },

      '& > li:nth-child(odd)': {
        backgroundColor: Colors.lightBackground
      },

      '& > li:nth-child(even)': {
        backgroundColor: Colors.lightestBackground
      }
    }
  },
  textArea: {
    border: 'none',
    width: '100%',
    padding: '6px 20px'
  },
  actions: {
    ...Mixins.formActions()
  },
  submitButton: {
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    marginRight: 20
  },
  editButton: {
    width: 140
  },
  createButton: {
    width: 'auto'
  },
  cancelButton: {
    marginRight: 10
  },
  inputError: {
    ...Mixins.inputError()
  },
  '@media screen and (max-width: 720px)': {
    title: {
      width: 'auto'
    }
  }
};
