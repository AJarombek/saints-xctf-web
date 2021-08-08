/**
 * JSS styles for the FilterButtons component.
 * @author Andrew Jarombek
 * @since 11/10/2020
 */

export default {
  filterButtons: {},
  '@media screen and (max-width: 900px)': {
    filterButtons: {
      '& .aj-contained-button': {
        padding: '5px 10px'
      },
      '& .aj-outlined-button': {
        padding: '3px 10px'
      },
      '& button': {
        fontSize: 12
      }
    }
  },
  '@media screen and (max-width: 750px)': {
    filterButtons: {
      '& .aj-contained-button': {
        padding: 10
      },
      '& .aj-outlined-button': {
        padding: 8
      },
      '& button': {
        fontSize: 14
      }
    }
  },
  '@media screen and (max-width: 500px)': {
    filterButtons: {
      '& .aj-contained-button': {
        padding: '5px 12px'
      },
      '& .aj-outlined-button': {
        padding: '3px 10px'
      },
      '& button': {
        fontSize: 12
      }
    }
  },
  '@media screen and (max-width: 330px)': {
    filterButtons: {
      '& .aj-contained-button': {
        padding: '2px 7px'
      },
      '& .aj-outlined-button': {
        padding: '0 5px'
      }
    }
  }
};
