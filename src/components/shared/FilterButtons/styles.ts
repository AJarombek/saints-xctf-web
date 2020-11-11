/**
 * JSS styles for the FilterButtons component.
 * @author Andrew Jarombek
 * @since 11/10/2020
 */

export default {
  filterButtons: {},
  '@media screen and (max-width: 800px)': {
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
  }
}