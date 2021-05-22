/**
 * JSS styles for the NewLogBody component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import { FeelColors } from '../../../styles/colors';
import Mixins, { AJComponentMixins, FontMixins } from '../../../styles/mixins';
import color from 'color';

export default {
  newLogBody: {
    ...Mixins.defaultBody()
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
  metadata: {},
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
  metrics: {},
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
    ...AJComponentMixins.ajSelect()
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
  inputWarning: {
    ...Mixins.inputWarning()
  },
  inputTip: {
    ...Mixins.inputTip()
  },
  '@media screen and (max-width: 750px)': {
    timeInput: {
      '& > .sxctf-image-input': {
        width: 'auto',

        '& > input': {
          width: 'auto',
          minWidth: 50
        }
      }
    },
    distanceInput: {
      '& .sxctf-image-input': {
        width: 'auto',

        '& > input': {
          width: 'auto',
          minWidth: 50
        }
      }
    },
    dateInput: {
      '& > .sxctf-image-input > input': {
        width: 'auto'
      }
    },
    locationInput: {
      '& > .sxctf-image-input > input': {
        width: 'auto'
      }
    }
  },
  '@media screen and (max-width: 720px)': {
    title: {
      width: 'auto'
    }
  },
  '@media screen and (max-width: 580px)': {
    metrics: {
      flexDirection: 'column'
    },
    distanceInput: {
      paddingRight: 0
    },
    timeInput: {
      paddingLeft: 0
    }
  },
  '@media screen and (max-width: 490px)': {
    title: {
      fontSize: 20
    },
    inputTitle: {
      fontSize: 14
    },
    feel: {
      fontSize: 14
    },
    metadata: {
      flexDirection: 'column'
    },
    locationInput: {
      paddingRight: 0
    },
    dateInput: {
      paddingLeft: 0
    }
  },
  '@media screen and (max-width: 390px)': {
    newLogBody: {
      ...Mixins.defaultBodyMobile()
    }
  }
};
